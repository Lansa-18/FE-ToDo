import { Hono } from "hono";
import { db } from "./db";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from "../utils/auth";
import { authMiddleware } from "../middleware/auth";
import { ContextVariables } from "../types";

const authRouter = new Hono<{ Variables: ContextVariables }>();

// Signing Up a new user
authRouter.post("/signup", async (c) => {
  try {
    const { fullName, email, password } = await c.req.json();

    // Validating the credentials
    if (!email || !password)
      return c.json({ error: "Email and password are required" }, 400);

    if (password.length < 6)
      return c.json({ error: "Password must be at least 6 characters" }, 400);

    // Checking if the user exists in the db.
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0)
      return c.json({ error: "User already exists with this email" }, 409);

    // Hashing the password and creating a new user
    const passwordHash = await hashPassword(password);
    const newUser = await db
      .insert(users)
      .values({
        fullName,
        email,
        hashedPassword: passwordHash,
      })
      .returning();

    const token = generateToken(newUser[0].id);

    return c.json(
      {
        message: "User created successfully",
        user: {
          id: newUser[0].id,
          fullName: newUser[0].fullName,
          email: newUser[0].email,
          created_at: newUser[0].createdAt,
        },
        token,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Failed to register user" }, 500);
  }
});

// Logging in the user
authRouter.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    console.log("This is the password:", password);

    // Finding the user by email
    const user = await db.select().from(users).where(eq(users.email, email));
    console.log("This is the user:", user);
    console.log("This is the user's password:", user[0].hashedPassword);

    if (user.length === 0) return c.json({ error: "Invalid credentials" }, 401);

    // Comparing the password
    const isValidPassword = await comparePassword(
      password,
      user[0].hashedPassword
    );
    console.log(isValidPassword);
    if (!isValidPassword) return c.json({ error: "Invalid credentials" }, 401);

    // Generating the JWT Token
    const token = generateToken(user[0].id);

    return c.json({
      message: "Login Successful",
      user: {
        id: user[0].id,
        email: user[0].email,
        fullName: user[0].fullName,
      },
      token,
    });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

authRouter.get("/me", authMiddleware, async (c) => {
  const userId = +c.get("userId");
  if (!userId) return c.json({ error: "Unauthenticated" }, 401);

  const usersResult = await db.select().from(users).where(eq(users.id, userId));
  if (usersResult.length === 0) return c.json({ error: "User not found" }, 404);

  return c.json({ data: usersResult[0] });
});
export default authRouter;
