import { auth }                        from "@/hooks/cart/usePutItemToCart";
import { fetchTransaction }            from "@/lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User }                   from "firebase/auth";
import { useAuthState }                from "react-firebase-hooks/auth";
import { useRouter }                   from "next/navigation";

async function finishTranscation(user: User | null | undefined, tid: number) {
  const { data } = await fetchTransaction.patch<{ result: string }>(
    `/${tid}/finish`,
    null,
    {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
    },
  );
  return data;
}

function useFinishTranscation() {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);
  const r = useRouter();

  return useMutation({
    mutationFn: ({ tid }: { tid: number }) => finishTranscation(user, tid),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["cart", 'transaction'] });

      r.push(`/history`);
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default useFinishTranscation;
