import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Transaction } from '@prisma/client';

export async function GET(_request: NextRequest, props: { params: Promise<{ budgetId: string }> }) {
  const params = await props.params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const budget = await prisma.budget.findFirst({
      where: { id: params.budgetId, userId: session.user.id },
      include: { transactions: true },
    });

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    const totalIncome = budget.transactions
      .filter((t: Transaction) => t.type === 'INCOME')
      .reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0);

    const totalExpense = budget.transactions
      .filter((t: Transaction) => t.type === 'EXPENSE')
      .reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0);

    return NextResponse.json({
      budget: {
        ...budget,
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
        transactionCount: budget.transactions.length,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, props: { params: Promise<{ budgetId: string }> }) {
  const params = await props.params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.budget.delete({
      where: { id: params.budgetId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error deleting budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ budgetId: string }> }) {
  const params = await props.params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (name !== undefined && typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }

    const existingBudget = await prisma.budget.findFirst({
      where: { id: params.budgetId, userId: session.user.id },
    });

    if (!existingBudget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: params.budgetId },
      data: { name: name ?? existingBudget.name },
    });

    return NextResponse.json({ budget: updatedBudget });
  } catch (error) {
    console.error('[API] Error updating budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
