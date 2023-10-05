import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Constant } from "../constant";
export default function logout() {
    const router = useRouter();
    const Logout = () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            router.push(Constant.BASE_URL + `/index`);
        }

    }
    useEffect(() => {
        Logout()
    }, []);

    return (
        <div>logout</div>
    )
}
