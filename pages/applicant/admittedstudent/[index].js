import React from "react";
import AdmittedstudentComponent from "../../../components/admittedstudent"
import { useRouter } from "next/router";
export default function Admittedstudent() {
    const router = useRouter();
    return (
        <>
            <AdmittedstudentComponent formnumber={router.query.index} />
        </>
    );
}