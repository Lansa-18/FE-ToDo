import { Hono } from "hono";
import { cors } from "hono/cors";
import authRouter from "./lib/auth";
import todoRouter from "./lib/todos";
import { ContextVariables } from "./types";
import { authMiddleware } from "./middleware/auth";

const app = new Hono<{ Variables: ContextVariables }>();

// VERY IMPORTANT TO HAVE
app.use(
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST"],
    credentials: true,
  })
);

// Auth Routes
app.route("/api/auth", authRouter);

// Todo Routes
app.route("api/todos", todoRouter);

export default { fetch: app.fetch, port: 3000 };
console.log("Backend running at http:localhost:3000");
