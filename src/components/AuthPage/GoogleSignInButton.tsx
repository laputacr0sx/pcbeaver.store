"user client";

import { GoogleLoginButton } from "react-social-login-buttons";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { type Auth } from "firebase/auth";

function GoogleSignInButton({ auth }: { auth: Auth }) {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return <GoogleLoginButton onClick={() => signInWithGoogle()} />;
}

export default GoogleSignInButton;
