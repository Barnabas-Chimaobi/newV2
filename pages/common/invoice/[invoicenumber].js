import { useRouter } from "next/router";
import Invoice from "../../../components/invoice";
export default function Page() {
	const router = useRouter();
	console.log(router.query.invoicenumber, "jhgfdfghjkl==========");
	return (
		<>
			<Invoice invoiceNumber={router.query.invoicenumber} />
		</>
	);
}
