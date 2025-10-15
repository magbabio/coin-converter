import { PrismaClient, CurrencyType, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: currency,
      create: currency,
    });
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: Role.ADMIN, 
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      role: Role.USER,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  const admin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
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

  if (admin && usdt) {
    await prisma.favoriteCurrency.upsert({
      where: {
        userId_currencyId: {
          userId: admin.id,
          currencyId: usdt.id,
        },
      },
      update: {},
      create: {
        userId: admin.id,
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

}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
