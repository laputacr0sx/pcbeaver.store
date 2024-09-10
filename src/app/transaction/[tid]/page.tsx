"use client"

import { useParams } from "next/navigation";

function TransactionPage() {

  const { tid } = useParams<{ tid: string }>();

  return <>{tid}</>

}


export default TransactionPage