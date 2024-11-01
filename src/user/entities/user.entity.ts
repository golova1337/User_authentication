import { pgEnum, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../../infrastructure/db/timestamps';
import { Roles } from '../../auth/enum/roles.enum';

export const rolesEnum = pgEnum(
  'roles',
  Object.values(Roles) as [string, ...string[]],
);

export const users = pgTable('users', {
  id: serial().primaryKey(),
  username: text(),
  email: text().unique().notNull(),
  password: varchar({ length: 100 }).notNull(),
  role: rolesEnum().default(Roles.USER).notNull(),
  ...timestamps,
});
