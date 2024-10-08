import { auth }                        from "@/hooks/cart/usePutItemToCart";
import { fetchTransaction }            from "@/lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User }                   from "firebase/auth";
import { useAuthState }                from "react-firebase-hooks/auth";
import useFinishTransaction            from "@/hooks/transaction/useFinishTransaction";

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
  const { mutate: finishTransaction } = useFinishTransaction();

  return useMutation({
    mutationFn: ({ tid }: { tid: number }) => payTransaction(user, tid),
    async onSuccess(_, { tid }) {
      await queryClient.invalidateQueries({ queryKey: ["cart", 'transaction'] });
      finishTransaction({ tid });
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default usePayTransaction;
