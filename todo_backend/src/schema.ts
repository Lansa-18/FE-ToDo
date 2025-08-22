import {
  pgTable,
  serial,
  varchar,
  integer,
  date,
  boolean,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("name", { length: 100 }).notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
});

export const todos = pgTable("todos", {
  todoId: serial("todo_id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  isCompleted: boolean("is_completed").default(false),
  title: varchar("title", { length: 300 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Todo = typeof todos.$inferSelect;

export const insertTodoSchema = createInsertSchema(todos).pick({ title: true });
