import React from 'react'
import { useRouter } from "next/router";
import CourseFormPrintOut from "@/components/courseformprintout"


export default function CourseFormPrint() {
  const router = useRouter();
  return (
    <>
      <CourseFormPrintOut courseForm={router.query.courseformprintout} />
    </>
  );
}
