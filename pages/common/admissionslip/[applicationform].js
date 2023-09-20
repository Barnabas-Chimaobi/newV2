'use client'
import React from 'react'
import { useRouter } from "next/router";
//import AdmissionSlip from '../../../components/admissionSlip';
import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('../../../components/admissionSlip'), { ssr: false })
export default function Applicationform() {
    const router = useRouter();
    return (
        <>
            <div>
                <NoSSR applicationForm={router.query.applicationform} />
            </div>
        </>
    )
}
