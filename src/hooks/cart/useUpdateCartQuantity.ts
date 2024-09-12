import { fetchCart } from "@/lib/fetcher";
import { useMutation } from "@tanstack/react-query";
import { type User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { type GetCartItemDTO } from "./useGetCartItems";
import { auth } from "./useRemoveCartItem";

async function updateCartQuantity(
  user: User | null | undefined,
  pid: number | string,
  quantity: number,
) {
  const res = await fetchCart.patch<GetCartItemDTO>(
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

function useUpdateCartQuantity() {
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: ({
      pid,
      quantity,
    }: {
      pid: number | string;
      quantity: number;
    }) => updateCartQuantity(user, pid, quantity),
  });
}

export default useUpdateCartQuantity;
