import { firebaseApp } from "@/lib/authService";
import { fetchCart } from "@/lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth, type User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const auth = getAuth(firebaseApp);

async function removeCartItem(
  user: User | null | undefined,
  pid: number | string,
) {
  const res = await fetchCart.delete<{ result: string }>(`/${pid}`, {
    headers: {
      Authorization: `Bearer ${await user?.getIdToken()}`,
    },
  });

  return res.data;
}

export function useRemoveCartItem() {
  const [user] = useAuthState(auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pid: number) => removeCartItem(user, pid),

    onMutate: () => {
      console.log("mutating...");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
