"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getAccessToken,
  getAuthConfig,
  handleSignInWithEmailAndPassword,
} from "@/lib/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function SigninForm() {
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    await signIn("credentials", { callbackUrl: "/" });
    // const isSignedIn = await handleSignInWithEmailAndPassword(
    //   values.email,
    //   values.password,
    // );
    // if (!isSignedIn) return null;
    // return getAuthConfig();
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@world.com" {...field} />
              </FormControl>
              <FormDescription>Input your login email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SigninForm;
