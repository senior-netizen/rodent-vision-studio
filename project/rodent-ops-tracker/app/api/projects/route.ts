import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { projectSchema } from '@/app/lib/validators';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { startDate: 'desc' },
    include: { expenses: true }
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = projectSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null
    }
  });

  return NextResponse.json(project, { status: 201 });
}
