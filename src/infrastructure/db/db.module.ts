import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from './constant';
import { Pool } from 'pg';
import * as schema from '../../user/entities/user.entity';

@Global()
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('POSTGRES_USER');
        const database = configService.get<string>('POSTGRES_DB');
        const password = configService.get<string>('POSTGRES_PASSWORD');
        const port = parseInt(configService.get<string>('POSTGRES_PORT'), 10);
        const host = configService.get<string>('POSTGRES_HOST');

        const pool = new Pool({ user, database, password, port, host });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
