import { fetchTransaction }           from "@/lib/fetcher";
import { getAuth, User }              from "firebase/auth";
import type { PrepareTransactionDTO } from "@/type/transaction/dto/res/PrepareTransactionDTO.type";
import { useQuery }                   from "@tanstack/react-query";
import { useAuthState }               from "react-firebase-hooks/auth";
import { firebaseApp }                from "@/lib/authService";

const auth = getAuth(firebaseApp);

async function getTransactionsByBuyer(user: User | null | undefined) {
  const { data } = await fetchTransaction.get<PrepareTransactionDTO[]>("/", {
    headers: {
      Authorization: `Bearer ${await user?.getIdToken()}`,
    }
  });

  console.log("LOGGED from Hook")
  console.table(data)

  return data;

}

export function useGetTransactionsByBuyer() {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["transaction", user],
    queryFn: () => getTransactionsByBuyer(user),
    enabled: !!user
  });
}