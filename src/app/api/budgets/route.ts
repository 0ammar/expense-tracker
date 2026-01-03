import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Budget, Transaction } from '@prisma/client';

type BudgetWithTransactions = Budget & { transactions: Transaction[] };

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const archived = searchParams.get('archived') === 'true';

    console.log('[API] GET /api/budgets - Fetching budgets, archived:', archived);

    const budgets = await prisma.budget.findMany({
      where: { userId: session.user.id, isArchived: archived },
      include: { transactions: true },
      orderBy: { createdAt: 'desc' },
    });

    const budgetsWithStats = budgets.map((budget: BudgetWithTransactions) => {
      const totalIncome = budget.transactions
        .filter((t: Transaction) => t.type === 'INCOME')
        .reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0);
      const totalExpense = budget.transactions
        .filter((t: Transaction) => t.type === 'EXPENSE')
        .reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0);

      return {
        ...budget,
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
        transactionCount: budget.transactions.length,
      };
    });

    console.log('[API] Returning', budgetsWithStats.length, 'budgets');
    return NextResponse.json({ budgets: budgetsWithStats });
  } catch (error) {
    console.error('[API] Error fetching budgets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, year, month } = body;

    console.log('[API] POST /api/budgets - Creating budget:', name);

    if (!name || !year || !month) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingBudget = await prisma.budget.findUnique({
      where: { userId_year_month: { userId: session.user.id, year, month } },
    });

    if (existingBudget) {
      return NextResponse.json({ error: 'Budget for this month already exists' }, { status: 409 });
    }

    const budget = await prisma.budget.create({
      data: { userId: session.user.id, name, year, month },
    });

    console.log('[API] Budget created:', budget.id);
    return NextResponse.json({ budget }, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}