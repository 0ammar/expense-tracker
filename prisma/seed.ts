import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create sample budget
  const budget = await prisma.budget.create({
    data: {
      userId: user.id,
      name: 'January 2026',
      year: 2026,
      month: 1,
      isArchived: false,
    },
  });

  console.log('✅ Created sample budget:', budget.name);

  // Create sample transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      {
        budgetId: budget.id,
        name: 'Monthly Salary',
        amount: 1500.000,
        description: 'January salary payment',
        date: new Date('2026-01-01'),
        category: 'Salary',
        type: 'INCOME',
      },
      {
        budgetId: budget.id,
        name: 'Grocery Shopping',
        amount: 120.500,
        description: 'Weekly groceries',
        date: new Date('2026-01-02'),
        category: 'Food & Dining',
        type: 'EXPENSE',
      },
      {
        budgetId: budget.id,
        name: 'Rent Payment',
        amount: 450.000,
        description: 'Monthly rent',
        date: new Date('2026-01-01'),
        category: 'Housing',
        type: 'EXPENSE',
      },
    ],
  });

  console.log('✅ Created sample transactions:', transactions.count);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });