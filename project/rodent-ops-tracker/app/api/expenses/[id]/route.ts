import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { expenseSchema } from '@/app/lib/validators';

type Params = { params: { id: string } };

export async function GET(_: NextRequest, { params }: Params) {
  const expense = await prisma.expense.findUnique({ where: { id: params.id } });

  if (!expense) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  return NextResponse.json(expense);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const payload = await req.json();
  const parsed = expenseSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const expense = await prisma.expense.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      date: new Date(parsed.data.date)
    }
  });

  return NextResponse.json(expense);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  await prisma.expense.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
