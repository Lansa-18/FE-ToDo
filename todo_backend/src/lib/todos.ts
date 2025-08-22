import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { ContextVariables } from "../types";
import { db } from "./db";
import { insertTodoSchema, todos, users } from "../schema";
import { eq } from "drizzle-orm";
import { ZodError } from "zod/v4";

const todoRouter = new Hono<{ Variables: ContextVariables }>();

todoRouter.get("/", authMiddleware, async (c) => {
  const userId = Number(c.get("userId"));

  if (!userId) return c.json({ error: "User is not logged in." }, 401);

  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId));
  console.log(userTodos);

  return c.json({
    userTodos,
  });
});

todoRouter.post("/", authMiddleware, async (c) => {
  try {
    const userId = Number(c.get("userId"));

    if (!userId) return c.json({ error: "You are not logged in." }, 401);

    const body = await c.req.json();
    const payload = insertTodoSchema.parse(body);

    const todo = await db
      .insert(todos)
      .values({ userId, title: payload.title })
      .returning();

    return c.json({ todo }, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error?.issues[0]?.message || "Validation error";
      return c.json(
        {
          error: message,
        },
        400
      );
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default todoRouter;
