import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
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
  apiKey: "AIzaSyCz-mtYQDF7vulzAM2jIvK1VLg6fm_XAfw",
  authDomain: "fsse2406-ecommerce-project.firebaseapp.com",
  projectId: "fsse2406-ecommerce-project",
  storageBucket: "fsse2406-ecommerce-project.appspot.com",
  messagingSenderId: "745537381443",
  appId: "1:745537381443:web:830b4947a14e59e51f60f6",
  measurementId: "G-EXV67P2D9T",
};

export const serviceInit = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Initialize Firebase
  initializeApp(firebaseConfig);
};

// https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
export const handleSignInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// https://firebase.google.com/docs/auth/web/google-signin#before_you_begin
export const handleSignInWithGoogle = async (): Promise<boolean> => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider);
    // Signed in
    return true;
  } catch (error) {
    console.log(error);
    return false;
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
        id: user.uid,
        email: user.email ?? "Login User",
      };
    } else {
      // User is signed out
      loginUser = null;
    }
    callback(loginUser);
  });
};

export const getAccessToken = (): Promise<string> | null => {
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
