/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, CurrencyType } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Insert currencies
  const currencies = [
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      type: CurrencyType.FIAT,
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      type: CurrencyType.FIAT,
    },
    {
      name: 'Tether',
      code: 'USDT',
      symbol: '₮',
      type: CurrencyType.CRYPTO,
    },
    {
      name: 'Venezuelan Bolívar',
      code: 'VES',
      symbol: 'Bs',
      type: CurrencyType.FIAT,
    },
  ];

  console.log('Creating currencies...');
  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: currency,
      create: currency,
    });
  }

  // Sample users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
    },
  ];

  console.log('Creating users...');
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  // Favorite currencies
  const john = await prisma.user.findUnique({
    where: { email: 'john.doe@example.com' },
  });

  const jane = await prisma.user.findUnique({
    where: { email: 'jane.smith@example.com' },
  });

  const usdt = await prisma.currency.findUnique({
    where: { code: 'USDT' },
  });

  const eur = await prisma.currency.findUnique({
    where: { code: 'EUR' },
  });

  if (john && usdt) {
    await prisma.favoriteCurrency.upsert({
      where: {
        userId_currencyId: {
          userId: john.id,
          currencyId: usdt.id,
        },
      },
      update: {},
      create: {
        userId: john.id,
        currencyId: usdt.id,
      },
    });
  }

  if (jane && eur) {
    await prisma.favoriteCurrency.upsert({
      where: {
        userId_currencyId: {
          userId: jane.id,
          currencyId: eur.id,
        },
      },
      update: {},
      create: {
        userId: jane.id,
        currencyId: eur.id,
      },
    });
  }

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
