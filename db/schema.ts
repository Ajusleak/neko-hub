import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash"),
  passwordSalt: text("password_salt"),
  provider: text("provider").notNull().default("password"),
  createdAt: integer("created_at").notNull(),
}, (table) => [
  uniqueIndex("idx_users_username").on(table.username),
  uniqueIndex("idx_users_email").on(table.email),
]);

export const sessions = sqliteTable("sessions", {
  tokenHash: text("token_hash").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at").notNull(),
});
