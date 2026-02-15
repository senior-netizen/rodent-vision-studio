import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { expenseSchema } from '@/app/lib/validators';

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: 'desc' },
    include: { project: true }
  });

  return NextResponse.json(expenses);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = expenseSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const expense = await prisma.expense.create({
    data: {
      ...parsed.data,
      date: new Date(parsed.data.date)
    }
  });

  return NextResponse.json(expense, { status: 201 });
}
