'use client';

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, TransactionType, CategoryData } from '@/types/transaction.types';
import { Card } from '@/components/shared/Card/Card';
import { getCategoryIcon } from '@/lib/constants';
import './CategoryChart.scss';

interface CategoryChartProps {
  transactions: Transaction[];
  type: TransactionType;
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export const CategoryChart: React.FC<CategoryChartProps> = ({ transactions, type }) => {
  console.log('[CategoryChart] Rendering chart for type:', type);

  const categoryData: CategoryData[] = useMemo(() => {
    const filtered = transactions.filter((t) => t.type === type);
    
    const grouped = filtered.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = {
          category,
          amount: 0,
          count: 0,
          percentage: 0,
        };
      }
      acc[category].amount += Number(transaction.amount);
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, CategoryData>);

    const total = Object.values(grouped).reduce((sum, cat) => sum + cat.amount, 0);
    
    const data = Object.values(grouped).map((cat) => ({
      ...cat,
      percentage: total > 0 ? (cat.amount / total) * 100 : 0,
    }));

    data.sort((a, b) => b.amount - a.amount);

    console.log('[CategoryChart] Processed categories:', data.length);
    return data;
  }, [transactions, type]);

  if (categoryData.length === 0) {
    return (
      <Card className="category-chart">
        <h3 className="category-chart__title">
          {type === TransactionType.INCOME ? 'Income by Category' : 'Expenses by Category'}
        </h3>
        <p className="category-chart__empty">No data available</p>
      </Card>
    );
  }

  const chartData = categoryData.map((cat) => ({
    name: cat.category,
    value: cat.amount,
  }));

  return (
    <Card className="category-chart">
      <h3 className="category-chart__title">
        {type === TransactionType.INCOME ? 'Income by Category' : 'Expenses by Category'}
      </h3>

      <div className="category-chart__container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toFixed(3)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="category-chart__legend">
        {categoryData.map((cat, index) => (
          <div key={cat.category} className="category-chart__legend-item">
            <span
              className="category-chart__legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="category-chart__legend-icon">{getCategoryIcon(cat.category)}</span>
            <span className="category-chart__legend-name">{cat.category}</span>
            <span className="category-chart__legend-value">
              {cat.amount.toFixed(3)} JOD ({cat.percentage.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};