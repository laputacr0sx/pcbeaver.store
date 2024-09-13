import { env }           from "@/env";
import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export type UserData = {
  id: string;
  email: string;
};

const firebaseConfig = {
  apiKey           : env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain       : "fsse2406-ecommerce-project.firebaseapp.com",
  projectId        : env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket    : "fsse2406-ecommerce-project.appspot.com",
  messagingSenderId: "745537381443",
  appId            : "1:745537381443:web:830b4947a14e59e51f60f6",
  measurementId    : "G-EXV67P2D9T",
};

export const firebaseApp = initializeApp(firebaseConfig);

type UserAuthCredentials = {
  email: string;
  password: string;
};

export const handleSignUpWithCredentials = async ({
                                                    email,
                                                    password,
                                                  }: UserAuthCredentials) => {
  const auth = getAuth();
  const firebaseUserCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return firebaseUserCredentials;
};

export const handleSignInWithCredentials = async ({
                                                    email,
                                                    password,
                                                  }: UserAuthCredentials) => {
  try {
    const auth = getAuth();

    const firebaseUserCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return firebaseUserCredentials;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// https://firebase.google.com/docs/auth/web/google-signin#before_you_begin
export const handleSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const firebaseUserCredentials = await signInWithPopup(auth, provider);
    // Signed in
    return firebaseUserCredentials;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
export const handleOnAuthStateChanged = (
  callback: (user: UserData | null) => void,
) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    let loginUser: UserData | null;
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      loginUser = {
        id   : user.uid,
        email: user.email ?? "Login User",
      };
    } else {
      // User is signed out
      loginUser = null;
    }
    callback(loginUser);
  });
};

export const getAccessToken = () => {
  const currentUser = getAuth().currentUser;
  if (!currentUser) {
    return null;
  }
  return currentUser.getIdToken(false);
};

export const getAuthConfig = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const handleSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
