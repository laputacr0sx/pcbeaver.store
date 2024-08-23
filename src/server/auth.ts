import { handleSignInWithEmailAndPassword } from "@/lib/authService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      return true;
    },
    redirect: ({ url, baseUrl }) => {
      return baseUrl;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: ({ token, user, account, profile, isNewUser }) => {
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      id: "email_login",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "hello@world.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Add logic here to look up the user from the credentials supplied
        const isAuthed = await handleSignInWithEmailAndPassword(
          credentials.email,
          credentials.password,
        );
        console.log(isAuthed);

        const auth = getAuth();

        let authUser: User | null;

        onAuthStateChanged(auth, (user) => {
          if (!user) return null;

          authUser = {
            id: user.uid,
            email: user.email,
          };
        });

        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
