import React from 'react'
import AcknowledgementSlipComponent from '@/components/acknowledgementSlip'
import { useRouter } from "next/router"
export default function AcknowledgementSlip() {

    const router = useRouter();


    return (
        <>
            <AcknowledgementSlipComponent data={router.query.id} />
        </>
    )
}
