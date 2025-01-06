import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const PostgresProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  name: 'PostgresConnectionProvider',
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('db.host'),
      port: configService.get('db.port'),
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.name'),
      autoLoadEntities: true,
      synchronize: configService.get('db.synchronize'),
      entities: [],
      logging: true,
    } as TypeOrmModuleAsyncOptions;
  },
});

export const databaseProviders = [PostgresProvider];
