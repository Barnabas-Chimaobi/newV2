import React from "react";
import Admittedstudent from "@/components/admittedstudent";
import { useSelector } from "react-redux";

export default function AdmissionStep() {
	const statusState = useSelector((state) => state.invoice.statuses);
	const statusvalue = statusState.status;
	return (
		<div>
			<Admittedstudent />
		</div>
	);
}
