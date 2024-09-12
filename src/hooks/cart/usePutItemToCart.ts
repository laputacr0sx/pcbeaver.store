import { firebaseApp } from "@/lib/authService";
import { fetchCart } from "@/lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth, type User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

export const auth = getAuth(firebaseApp);

async function putItemToCart(
  user: User | null | undefined,
  pid: number | string,
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

export function usePutItemToCart() {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: ({
      pid,
      quantity,
    }: {
      pid: number | string;
      quantity: number;
    }) => putItemToCart(user, pid, quantity),
    onError(error) {
      toast.error(`Something went wrong!, ${error?.message}`);
    },

    async onSuccess(data, variables) {
      console.table(data);

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(`Added ${variables.quantity} to your cart!`);
    },
  });
}
