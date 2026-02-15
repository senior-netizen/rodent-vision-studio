'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

type ExpenseCategoryDatum = { name: string; value: number };
type RevenueExpenseDatum = { name: string; revenue: number; expenses: number };

export function DashboardCharts({
  byCategory,
  revenueExpense
}: {
  byCategory: ExpenseCategoryDatum[];
  revenueExpense: RevenueExpenseDatum[];
}) {
  return (
    <div className="grid cols-2" style={{ marginTop: '1rem' }}>
      <section className="card" style={{ height: 320 }}>
        <h2>Expense by Category</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={100} fill="#0ea5e9" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="card" style={{ height: 320 }}>
        <h2>Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={revenueExpense}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" />
            <Bar dataKey="expenses" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
