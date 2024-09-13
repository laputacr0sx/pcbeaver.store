"use client";

import { Button }                                                          from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input }                                                           from "@/components/ui/input";
import { firebaseApp }                                                     from "@/lib/authService";
import { zodResolver }                                                     from "@hookform/resolvers/zod";
import { getAuth }                                                         from "firebase/auth";
import { useRouter }                                                       from "next/navigation";
import { useSignInWithEmailAndPassword }                                   from "react-firebase-hooks/auth";
import { useForm }                                                         from "react-hook-form";
import { z }                                                               from "zod";
import { Divider }                                                         from "../tailwindui/divider";
import GoogleSignInButton                                                  from "./GoogleSignInButton";

export const auth = getAuth(firebaseApp);

const signInFormSchema = z.object({
  email   : z.string()
    .email(),
  password: z.string()
    .min(8),
});

function SigninForm() {
  const r = useRouter();
  const [signInWithEmailAndPassword, _, loading] =
          useSignInWithEmailAndPassword(auth);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver     : zodResolver(signInFormSchema),
    defaultValues: {
      email   : "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    // const firebaseUser = await handleSignInWithCredentials({ ...values });
    await signInWithEmailAndPassword(values.email, values.password);
    signInForm.reset();
    r.back();
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@world.com" {...field} />
              </FormControl>
              <FormMessage/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
        <Divider className="py-4"/>
        <GoogleSignInButton auth={auth}/>
      </form>
    </Form>
  );
}

export default SigninForm;