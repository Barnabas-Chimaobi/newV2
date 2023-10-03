import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { STUDENT_COURSE_REG } from "@/pages/api/queries/basicQueries"
import Spinner from './spinner';
import CourseItem from './courseformprintout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { SAVE_STUDENT_COURSE_REGISTER } from '@/pages/api/mutations/adminMutation';
import { useRouter } from "next/router";
import { Constant } from '../constant';

export default function Courseregcomponent() {
    const router = useRouter();
    const [carryOvers, setcarryOvers] = useState([]);
    const [courses, setcourses] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [sessionId, setsessionId] = useState("");
    const [semesterId, setsemesterId] = useState("")
    const [allData, setallData] = useState("");
    const [CourseRegDetails, { loading: CourseRegDetailsLoad, error: CourseRegDetailsError, data: CourseRegDetailsData }] = useLazyQuery(STUDENT_COURSE_REG);

    const [saveCourseReg, { loading: saveCourseRegLoad, error: saveCourseRegError, data: saveCourseRegData }] = useMutation(SAVE_STUDENT_COURSE_REGISTER);
    const [visible, setVisible] = useState(false);
    const [visibleForm, setvisibleForm] = useState(false);

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Register" icon="pi pi-check" onClick={() => SaveRegisterCourses()} autoFocus />
        </div>
    );
    const footerPrintContent = (
        <div>
            <Button label="Print" icon="pi pi-print" onClick={() => setVisible(false)} className="p-button-text" />

        </div>
    );

    const SaveRegisterCourses = async () => {

        const Item = selectedProducts?.map((item) => ({
            courseId: item?.courseId,
            courseName: item?.courseName,
            courseCode: item?.courseCode,
            courseUnit: item?.creditUnit,
            departmentId: allData?.departmentId,
            departmentName: allData?.departmentName,
            id: 0,
            levelId: allData?.levelId,
            levelName: allData?.levelName,
            programmeId: allData?.programmeId,
            programmeName: allData?.programmeName,
            semesterId: semesterId,
            semesterName: allData?.semesterName,
            courseType: item?.courseType,
            isRegistered: true
        }));
        const Save = await saveCourseReg({
            variables: {
                sessionid: sessionId,
                semesterid: semesterId,
                coursereg: Item
            }
        }).then((ex) => {
            console.log(ex, "ex......")
            setVisible(false)
            router.push(Constant.BASE_URL + `/common/courseregistration/` + ex?.data?.saveStudentCourseReg?.id);
        })



    }

    const SetSessionDetails = (sessionid, semesterid, levelId, levelName, programmeId, programmeName, semesterName, departmentId, departmentName) => {
        setsessionId(sessionid)
        setsemesterId(semesterid)
        setallData({
            departmentId: departmentId,
            departmentName: departmentName,
            levelId: levelId,
            levelName: levelName,
            programmeId: programmeId,
            programmeName: programmeName,
            semesterName: semesterName
        })
        setVisible(true)
    }
    const PullData = async () => {
        const regDetails = await CourseRegDetails();
        console.log(regDetails?.data, "dataaa aaaaaaaaaa")
        setcourses(regDetails?.data?.courseRegisterForAll);
        console.log(courses, "coursesss  sss")
        setisLoading(false);
    }
    useEffect(() => {
        PullData();
    }, []);

    const header = (
        <img alt="Card" src={courses?.passportUrl} />
    );
    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">ECE 101</div>

                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">1</span>
                                </span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">F</span>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const RenderInputs = () => {
        console.log(courses?.activeIndex, "active indexxxx")
        return <>
            {/* {courses?.currentLevel?.map((x, index) => {

                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-calendar mr-2"></i>
                            <span className="vertical-align-middle">Year {index + 1}</span>
                            <span className="vertical-align-middle">{x?.sessionName}</span>
                        </div>
                    }
                >
                    <Accordion activeIndex={0}>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-user mr-2"></i>
                                    <span className="vertical-align-middle">First Semester</span>
                                </div>
                            }
                        >
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </AccordionTab>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-user mr-2"></i>
                                    <span className="vertical-align-middle">Second Semester</span>
                                </div>
                            }
                        >
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </AccordionTab>

                    </Accordion>
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </AccordionTab>

            })
            } */}
            <>


                <Accordion activeIndex={courses?.activeIndex == null ? 0 : courses?.activeIndex}>
                    {courses?.courseRegDatas?.map((x, index) => (

                        console.log(index, x, "indexxx...."),
                        <AccordionTab
                            key={index}
                            header={
                                < div className="flex align-items-center" >
                                    <i className="pi pi-calendar mr-2"></i>
                                    <div className="d-flex justify-between" >
                                        <span className="vertical-align-middle mt-1">Year {index + 1}  </span>
                                        <span className="vertical-align-middle ml-3">
                                            <Tag severity={x?.isActive ? "success" : "info"} value={x?.sessionName}></Tag>
                                        </span>
                                    </div>
                                </div>
                            }
                        >
                            <Accordion activeIndex={x?.activeIndex == null ? 0 : x?.activeIndex}>
                                {x?.semesterCourseDisplayDtos?.map((y, indexy) => (
                                    <AccordionTab
                                        header={
                                            <div className="flex align-items-center">
                                                <i className="pi pi-book mr-2"></i>
                                                <span className="vertical-align-middle">{y?.semesterName}</span>
                                            </div>
                                        }
                                    >

                                        <p className="m-0">
                                            {/* First Semester content */}
                                        </p>
                                        <DataTable value={y?.results} tableStyle={{ minWidth: '50rem' }} selection={selectedProducts} onSelectionChange={(e) =>
                                            setSelectedProducts(e.value)} dataKey="courseId" emptyMessage="No course(s) available yet.">
                                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} style={x?.isActive ? null : { display: "none" }}></Column>
                                            <Column field="courseId" header="Id" style={{ display: "none" }} ></Column>
                                            <Column field="courseCode" header="Course Code" style={y?.isCarryOver ? { backgroundColor: 'orange' } : null}></Column>
                                            <Column field="courseName" header="Course Name"></Column>
                                            <Column field="creditUnit" header="Credit Unit"></Column>
                                            <Column field="courseType" header="Course Type"></Column>

                                            <Column field="grade" header="Grade" style={x?.isResultAvailable ? null : { display: "none" }}></Column>

                                        </DataTable>
                                        <div className="d-flex justify-between mt-3" >
                                            <Button label="Reprint" icon="pi pi-print" className="mr-auto p2" />
                                            <Button label="Preview" icon="pi pi-check" onClick={() =>
                                                SetSessionDetails(x?.sessionId, y?.semesterId, x?.levelId, x?.levelName, courses?.programmeId, courses?.programmeName,
                                                    y?.semesterName, courses?.departmentId, courses?.departmentName)} className="ml-auto p2"
                                                style={x?.isActive ? null : { display: "none" }} />
                                        </div>


                                    </AccordionTab>
                                ))
                                }

                            </Accordion>
                            <p className="m-0">
                                {/* Additional content */}
                            </p>
                        </AccordionTab >
                    ))

                    }
                </Accordion>
            </>
        </>

    }

    console.log(RenderInputs(), "rendered inputs ......")
    return (
        <>
            <div>
                {isLoading && courses !== null ? <Spinner /> :
                    <div className="page-wrapper">
                        <div className="content container-fluid">

                            <div className="card">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-8">


                                        {RenderInputs()}


                                    </div>
                                    <div className="col-sm-12 col-lg-3">
                                        <div className="card flex justify-content-center">
                                            <Card title={courses?.fullName} subTitle={`Current Level: ${courses?.currentLevel}`} footer={null} header={header} className="md:w-25rem">
                                                <p className="m-0">
                                                    Current Semester:  {courses?.currentSemester}                </p>
                                            </Card>
                                            {/* <Card title="Carry Over" subTitle="" className="md:w-25rem">
                                                <DataView value={carryOvers} itemTemplate={itemTemplate} />
                                            </Card> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
            <Card title="">
                <Dialog header="Course Registration Preview" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>

                    <DataTable value={selectedProducts} tableStyle={{ minWidth: '50rem' }} dataKey="courseId" emptyMessage="No course(s) available yet.">
                        <Column field="courseId" header="Id" style={{ display: "none" }} ></Column>
                        <Column field="courseCode" header="Course Code" ></Column>
                        <Column field="courseName" header="Course Name"></Column>
                        <Column field="creditUnit" header="Credit Unit"></Column>
                        <Column field="courseType" header="Course Type"></Column>



                    </DataTable>

                </Dialog>
            </Card>



        </>
    )
}
