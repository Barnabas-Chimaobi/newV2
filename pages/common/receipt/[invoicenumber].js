import { useRouter } from "next/router"
import Receipt from "@/app/components/receipt";
export default function Page() {
    const router = useRouter();
    return <>
        <Receipt invoiceNumber={router.query.invoicenumber} />
    </>
}