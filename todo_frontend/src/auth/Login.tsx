import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosApi from "../lib/axionApi";

const formSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axiosApi.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      const { data } = response;
      console.log(data.user)

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Resetting the form
      form.reset();

      // Navigating to the home page.
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setMessage({
        type: "error",
        text: error.response?.data.error || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative">
      <Form {...form}>
        <form
          className="flex flex-col gap-[2rem] border-red-500 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-3xl">Log In</h2>

          {/* Success / Error Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-center ${message.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500" : "bg-red-500/20 text-red-400 border border-red-500"}`}
            >
              {message.text}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full p-2 rounded-lg bg-transparent border outline-none"
                    placeholder="Enter Your Email Address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full p-2 rounded-lg bg-transparent border outline-none"
                    placeholder="Enter Your Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <article className="self-center space-y-4">
            <button
              className="text-white border-blue-500 border p-2 rounded-lg w-full hover:scale-105 transition-all duration-300"
              type="submit"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="text-sm">
              Don't have an account?{" "}
              <Link className="text-blue-400" to="/auth/signup">
                Sign Up
              </Link>
            </div>
          </article>
        </form>
      </Form>
    </section>
  );
}
