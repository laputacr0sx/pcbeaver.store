"user client";

import { firebaseApp } from "@/lib/authService";
import { getAuth, signOut } from "firebase/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Skeleton } from "../ui/skeleton";

const auth = getAuth(firebaseApp);

function AuthenticationButton() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (user) {
    const emailName =
      user.email?.split("@")[0]?.substring(0, 2).toUpperCase() ?? "GG";

    return (
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Link
          onClick={() => signOut(auth)}
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
            <span className="font-medium leading-none text-white">
              {emailName}
            </span>
          </span>
        </Link>
        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <Link
        onClick={() => signIn()}
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
          <span className="font-medium leading-none text-white">😀</span>
        </span>
      </Link>
      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
    </div>
  );
}

export default AuthenticationButton;
