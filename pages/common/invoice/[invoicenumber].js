import { useRouter } from "next/router"
import Invoice from "@/app/components/invoice";
export default function Page() {
    const router = useRouter();
    return <>
        <Invoice invoiceNumber={router.query.invoicenumber} />
    </>
}