import { fetchTransaction }           from "@/lib/fetcher";
import type { PrepareTransactionDTO } from "@/type/transaction/dto/res/PrepareTransactionDTO.type";
import { useQuery }                   from "@tanstack/react-query";
import { useAuthState }               from "react-firebase-hooks/auth";
import { firebaseApp }                from "@/lib/authService";
import { getAuth, type User }         from "firebase/auth";

const auth = getAuth(firebaseApp);

async function getTransactionByTid(
  user: User | null | undefined,
  tid: string
) {
  const { data } = await fetchTransaction.get<PrepareTransactionDTO>(
    `/${tid}`,
    {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      }
    });

  return data;
}


function useGetTransactionByTid({ tid }: { tid: string }) {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["transaction", user?.uid, tid],
    queryFn : () => getTransactionByTid(user, tid),
  });

}

export default useGetTransactionByTid;