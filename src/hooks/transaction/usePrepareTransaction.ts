import { fetchTransaction }           from "@/lib/fetcher";
import type { PrepareTransactionDTO } from "@/type/transaction/dto/res/PrepareTransactionDTO.type";
import type { User }                  from "firebase/auth";
import { useMutation }                from "@tanstack/react-query";
import { useAuthState }               from "react-firebase-hooks/auth";
import toast                          from "react-hot-toast";
import { auth }                       from "@/hooks/cart/usePutItemToCart";

async function createTransaction(user: User | null | undefined,) {
  const { data } = await fetchTransaction.post<PrepareTransactionDTO>(
    "/prepare",
    null,
    {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      }
    });

  return data;
}

export function usePrepareTransaction() {
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: () => createTransaction(user),
    onError(error) {
      toast.error(`Something went wrong!, ${error?.message}`);
    },

    async onSuccess(data) {
      console.table(data);

    },
  });
}
