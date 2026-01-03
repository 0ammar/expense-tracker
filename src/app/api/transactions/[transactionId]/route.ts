import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, props: { params: Promise<{ transactionId: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const transaction = await prisma.transaction.update({
      where: { id: params.transactionId },
      data: { ...body, date: body.date ? new Date(body.date) : undefined },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('[API] Error updating transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, props: { params: Promise<{ transactionId: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.transaction.delete({ where: { id: params.transactionId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error deleting transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}