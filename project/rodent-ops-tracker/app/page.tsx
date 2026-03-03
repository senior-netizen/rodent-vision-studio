import { prisma } from '@/app/lib/prisma';
import { DashboardCharts } from '@/app/components/dashboard-charts';

export default async function DashboardPage() {
  const [projects, expenses] = await Promise.all([
    prisma.project.findMany({
      orderBy: { startDate: 'desc' },
      include: { expenses: true }
    }),
    prisma.expense.findMany({ orderBy: { date: 'desc' }, take: 8 })
  ]);

  const byCategoryMap = projects
    .flatMap((project: any) => project.expenses)
    .reduce((acc: Record<string, number>, item: { category: string; amount: number }) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

  const byCategory = Object.entries(byCategoryMap).map(([name, value]) => ({
    name,
    value: Number(value)
  }));

  const revenueExpense = projects.map((project: any) => ({
    name: project.name,
    revenue: project.revenue,
    expenses: project.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0)
  }));

  return (
    <main>
      <h1 className="display-hero">Africa-first infrastructure studio</h1>
      <p>Track rodent-lab project income, status, and operational expenses.</p>

      <div className="grid cols-2" style={{ marginTop: '1rem' }}>
        <section className="card">
          <h2>Projects</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.status}</td>
                  <td>${project.revenue.toFixed(2)}</td>
                  <td>
                    {project.startDate.toISOString().slice(0, 10)} -{' '}
                    {project.endDate?.toISOString().slice(0, 10) ?? 'Ongoing'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2>Recent Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense: any) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{expense.date.toISOString().slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <DashboardCharts byCategory={byCategory} revenueExpense={revenueExpense} />
    </main>
  );
}
