// module
import { logger } from '@common/logger';
import { config } from '@config/index';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// func
async function seedModel(model: string, data: any[]) {
  const prismaModel = (prisma as any)[model];
  if (!prismaModel) {
    throw new Error(`Model ${model} does not exist on PrismaClient`);
  }

  for (const item of data) {
    await prismaModel.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
}

// main
try {
  await prisma.$connect();
  logger.info('Connected to database');

  // seeder user
  const hashPassword = await Bun.password.hash(config.PASSWORD_ADMIN, {
    algorithm: 'bcrypt',
  });

  await seedModel('user', [
    {
      id: 'cm5yx0jsa01010ci94i3g5rwh',
      name: 'admin',
      username: 'admin@2025',
      email: 'admin@rinaru.com',
      password: hashPassword,
    },
  ]);

  // info
  logger.info('Successfully seeded database!');
} catch (err) {
  logger.error('Error seeding data:', err);
} finally {
  await prisma.$disconnect();
  logger.info('Disconnected from database');
  process.exit(0);
}
