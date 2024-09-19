import { auth }                        from "@/hooks/cart/usePutItemToCart";
import { fetchTransaction }            from "@/lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User }                   from "firebase/auth";
import { useAuthState }                from "react-firebase-hooks/auth";

async function payTransaction(user: User | null | undefined, tid: number) {
  const { data } = await fetchTransaction.patch<{ result: string }>(
    `/${tid}/pay`,
    null,
    {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
    },
  );
  return data;
}

function usePayTransaction() {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: ({ tid }: { tid: number }) => payTransaction(user, tid),
    async onSuccess() {

      await queryClient.invalidateQueries({ queryKey: ["cart", 'transaction'] });
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default usePayTransaction;
