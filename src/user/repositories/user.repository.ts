import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../entities/user.entity';
import { eq } from 'drizzle-orm';
import { PG_CONNECTION } from 'src/infrastructure/db/constant';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}
  async create(body) {
    return this.conn.insert(schema.users).values(body).returning({
      id: schema.users.id,
      username: schema.users.username,
      email: schema.users.email,
    });
  }

  async findById(id: number) {
    return this.conn.select().from(schema.users).where(eq(schema.users.id, id));
  }

  async findByEmail(email: string) {
    return this.conn
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }
}
