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
import { useState } from "react";
import axiosApi from "../lib/axionApi";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "You need to enter your fullname")
      .regex(/^[a-zA-Z\s]+$/, "Please enter only letters and spaces."),
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
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password don't match",
    path: ["confirmPassword "],
  });

type FormValues = z.infer<typeof formSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axiosApi.post("/auth/signup", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      const { data } = response;

      // Success
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({
        type: "success",
        text: "Account created successfully! Redirecting...",
      });

      // Resetting the form
      form.reset();

      // Redirecting the user after 2s
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error("Signup error:", error);

      // Handling different types of errors
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        // if server responds with a status error
        errorMessage = error.response.data.error || "Server error occured.";
      } else if (error.request) {
        // If there is a network error
        errorMessage = "Network error. Please check your connection.";
      } else if (error.code === "ECONNABORTED") {
        // Timeout Error
        errorMessage = "Request timeout. Please try again";
      }

      setMessage({
        type: "error",
        text: errorMessage,
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
          <h2 className="font-bold text-3xl">Sign Up</h2>

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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full p-2 rounded-lg bg-transparent border outline-none"
                    placeholder="Enter Your Full Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full p-2 rounded-lg bg-transparent border outline-none"
                    placeholder="Repeat password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <article className="space-y-4 self-center">
            <button
              className="text-white border-blue-500 border p-2 rounded-lg w-full self-center"
              type="submit"
            >
              {isLoading ? "Creating Account..." : "Create your account"}
            </button>
            <div className="text-sm">
              Already have an account?{" "}
              <Link className="text-blue-500" to="/auth/login">
                login
              </Link>
            </div>
          </article>
        </form>
      </Form>
    </section>
  );
}
