import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form"

export default function FillForm() {
    const router = useRouter();
    return (
        <>
            <Form />
        </>
    )
}
