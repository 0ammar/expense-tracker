import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, props: { params: Promise<{ budgetId: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { isArchived } = body;

    const budget = await prisma.budget.update({
      where: { id: params.budgetId, userId: session.user.id },
      data: { isArchived },
    });

    return NextResponse.json({ budget });
  } catch (error) {
    console.error('[API] Error archiving budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}