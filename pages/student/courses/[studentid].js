import React from 'react'
import { useRouter } from "next/router";
import CourseRegcomponent from '@/components/courseregcomponent';

export default function CourseReg() {
    const router = useRouter();
    return (
        <div>
            <CourseRegcomponent />
        </div>
    )
}
