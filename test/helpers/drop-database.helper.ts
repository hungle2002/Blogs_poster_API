import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(
  configService: ConfigService,
): Promise<void> {
  // Create the connection to the database
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.user'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
  });
  await AppDataSource.initialize();

  // Drop the database
  await AppDataSource.dropDatabase();

  // Close the connection
  await AppDataSource.destroy();
}
