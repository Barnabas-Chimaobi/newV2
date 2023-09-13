import React from 'react'
import { useRouter } from "next/router";
import AdmissionSlip from '../../../components/admissionSlip';
export default function Applicationform() {
    const router = useRouter();
    return (
        <>
            <AdmissionSlip applicationForm={router.query.applicationform} />
        </>
    )
}
