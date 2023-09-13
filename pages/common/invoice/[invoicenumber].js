import { useRouter } from "next/router"
import Invoice from "../../../components/invoice";
export default function Page() {
    const router = useRouter();
    return <>
        <Invoice invoiceNumber={router.query.invoicenumber} />
    </>
}