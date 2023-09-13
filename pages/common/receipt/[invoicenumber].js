import { useRouter } from "next/router"
import Receipt from "../../../components/receipt";
export default function Page() {
    const router = useRouter();
    return <>
        <Receipt invoiceNumber={router.query.invoicenumber} />
    </>
}