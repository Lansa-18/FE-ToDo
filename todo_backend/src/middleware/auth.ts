import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "No token provided" }, 401);
    }

    const token = authHeader.substring(7);
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Adding user info to context
    c.set("userId", decoded?.userId);
    c.set("userEmail", decoded.email);

    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
