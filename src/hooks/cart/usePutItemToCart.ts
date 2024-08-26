import { firebaseApp } from "@/lib/authService";
import { fetchCart } from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuth, type User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

async function putItemToCart(
  user: User | null | undefined,
  pid: number,
  quantity: number,
) {
  const res = await fetchCart.put<{ result: string }>(
    `/${pid}/${quantity}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
    },
  );
  return res.data;
}

export function usePutItemToCart(pid: number, quantity: number) {
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: () => putItemToCart(user, pid, quantity),

    onMutate: () => {
      console.log("mutating...");
    },
  });
}
