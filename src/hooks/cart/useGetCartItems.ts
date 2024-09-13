import { firebaseApp }        from "@/lib/authService";
import { fetchCart }          from "@/lib/fetcher";
import { useQuery }           from "@tanstack/react-query";
import { getAuth, type User } from "firebase/auth";
import { useAuthState }       from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

export type GetCartItemDTO = {
  pid: number;
  name: string;
  imageUrl: string;
  price: number;
  cartQuantity: number;
  stock: number;
};

async function getCartItems(user: User | null | undefined) {
  const res = await fetchCart.get<GetCartItemDTO[]>("", {
    headers: {
      Authorization: `Bearer ${await user?.getIdToken()}`,
    },
  });
  return res.data;
}

export default function useGetCartItems() {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["cart", user?.uid],
    queryFn : () => getCartItems(user),
  });
}
