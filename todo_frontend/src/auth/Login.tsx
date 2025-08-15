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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    form.reset();
  };

  return (
    <section className="min-h-screen relative">
      <Form {...form}>
        <form
          className="flex flex-col gap-[2rem] border-red-500 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-3xl">Log In</h2>

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

          <button
            className="text-white border-blue-500 border p-2 rounded-lg w-[40%] self-center"
            type="submit"
          >
            Login
          </button>
        </form>
      </Form>
    </section>
  );
}
