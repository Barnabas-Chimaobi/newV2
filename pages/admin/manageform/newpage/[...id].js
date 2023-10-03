import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Chip } from 'primereact/chip';

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import Form from "@/components/form"
import { Card } from "primereact/card";
import {
    SAVE_DYNAMIC_FORM_SETUP,
    SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
} from "../../../api/mutations/adminMutation";
import {
    ALL_PROGRAMME,
    GET_ALL_SESSION,
    GET_ALL_PAGES,
    GET_ALL_SET_UP_DONE
} from "../../../api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";

import { Toast } from "primereact/toast";

export default function CreateNewForm() {
    const router = useRouter()
    const toast = useRef(null);
    const [pages, setpages] = useState([]);
    const [page, setpage] = useState("");
    const [programme, setprogramme] = useState('');
    const [availableForms, setavailableForms] = useState('');
    const [isLoading, setisLoading] = useState(true);
    let [fieldname, setfieldname] = useState("");
    let [field_type, setfieldtype] = useState("");
    let [field_label, setfieldlabel] = useState("");
    let [section, setSection] = useState("");
    let [sessionVal, setSessionVal] = useState("");
    let [sessions, setSessions] = useState("");
    let [programmes, setProgrammes] = useState("");
    let [programmeId, setProgrammeId] = useState(0);
    let [sessionId, setSessionId] = useState(0);
    let [formList, setFormList] = useState([]);
    let [completeFormList, setCompleteFormList] = useState({});
    let [error, setError] = useState("");
    let [errorModal, setErrorModal] = useState(false);
    let [isSaving, setisSaving] = useState(false);
    let [formLists, setFormLists] = useState([]);
    const [
        setupForm,
        { loading: setupLoading, error: setupError, data: setupData },
    ] = useMutation(SAVE_DYNAMIC_PROGRAMME_AND_SESSION);
    console.log(router.query.id, "Query  paramsss")
    let [formDesign, setformDesign] = useState({

        "applicantForm": {
            "mainPages": [


            ],
            "submitOlevelResult": [],
            "personId": 33,
            "personUrl": null
        }

    });

    var data = {

        "applicantForm": {
            "mainPages": [

            ],
            "submitOlevelResult": [],
            "personId": 33,
            "personUrl": null
        }

    };
    const AddPage = () => {
        const newItem = page; // Replace with your item
        let items = pages;
        items.push(newItem);
        setpages(items)
        setpage('');

        //console.log(data, newItem, pages, newArray, "save student data aaak.......")
        setformDesign(data);
        pageCreation();
    }
    const RemovePage = (p) => {
        const newArray = [...pages];
        const items = pages;
        items.splice(p, 1); // Remove the item at the specified index
        setpages(items);

        setformDesign(data);
        console.log(data, p, "page remove button")
        pageCreation();
    }
    const [session, {
        loading: sessionLoading,
        error: sessionError,
        data: sessionList,
    }] = useLazyQuery(GET_ALL_SESSION);

    const [programmeL, {
        loading: programmeLoading,
        error: programmeError,
        data: programmeList,
    }] = useLazyQuery(ALL_PROGRAMME);
    console.log(programmeList, "programmeList");
    data.applicantForm.mainPages = [];

    const pageCreation = () => {

        const createdPages = pages?.map((ex) => (
            data.applicantForm.mainPages.push({
                "pageId": 1,
                "pageName": ex,
                "programmeId": 1,
                "programmeName": "",
                "sessionId": 1,
                "sessionName": "",
                "sections": []
            })

        ));
        console.log(createdPages, "data line dta advcjnmc,");
        setformDesign(data);
        return true;
    }


    const LoadData = async () => {
        setisLoading(true);


        const sessionDataFromB = await session();
        setSessions(sessionDataFromB?.data?.allSession?.map((item) => { return { Id: item?.id, Name: item?.name } }));
        const programmeD = await programmeL();
        setProgrammes(programmeD?.data?.allProgramme?.map((item) => { return { Id: item?.id, Name: item?.name } }))
        console.log(sessionDataFromB, programmeD, "Drop down Values")
        setisLoading(false)
    }

    useEffect(() => {
        LoadData()

    }, []);

    const SaveForPages = async () => {
        setisSaving(true)
        const response = await setupForm({
            variables: {
                model: {
                    programmeId: JSON.parse(programme?.Id),
                    sessionId: JSON.parse(sessionVal?.Id),
                    pageName: pages,
                },
            },
        });
        if (response?.data?.saveDynamicProgrammeAndPageSetup?.success === true) {
            toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: response?.data?.saveDynamicProgrammeAndPageSetup?.message,
                life: 3000,
            });
        } else if (response?.data?.saveDynamicProgrammeAndPageSetup?.success === false) {
            toast.current.show({
                severity: 'error', summary: 'Error',
                detail: response?.data?.saveDynamicProgrammeAndPageSetup?.message,
                life: 3000,
            });
        }
        setisSaving(false)
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="card card-table">
                                <div class="card-body">
                                    <h4>Setup Forms</h4>

                                    <div className="row p-5 ms-auto ">

                                        <div
                                            style={{
                                                width: "65%",
                                                float: "left",


                                            }}
                                        >
                                            <div className="row ">

                                                <div className="col-lg-4 col-sm-12">
                                                    <div className="local-forms form-group">
                                                        <label>
                                                            Programme
                                                            <span className="login-danger">*</span>
                                                        </label>
                                                        <Dropdown
                                                            value={programme}
                                                            options={programmes}
                                                            placeholder="select Programme"
                                                            onChange={(e) => setprogramme(e.target.value)}
                                                            className="w-full md:w-21.5rem"
                                                            optionLabel="Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-12">
                                                    <div className="local-forms form-group">
                                                        <label>
                                                            Session
                                                            <span className="login-danger">*</span>
                                                        </label>
                                                        <Dropdown
                                                            value={sessionVal}
                                                            options={sessions}
                                                            placeholder="select Session"
                                                            onChange={(e) => setSessionVal(e.target.value)}
                                                            className="w-full md:w-21.5rem"
                                                            optionLabel="Name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-sm-12">
                                                    <div>


                                                    </div>
                                                </div>

                                                <div className="col-lg-7 col-sm-12">
                                                    <div className="local-forms form-group">
                                                        <label >
                                                            Page Name
                                                            <span className="login-danger">*</span>
                                                        </label>
                                                        <InputText
                                                            id="PageName"
                                                            className="w-full md:w-21.5rem"
                                                            value={page}
                                                            onChange={(e) => setpage(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-5 col-sm-12 ">
                                                    <div className="local-forms form-group">
                                                        <Button
                                                            label="Add"
                                                            className="btn btn-outline-primary me-2"
                                                            onClick={AddPage}
                                                        />
                                                    </div>
                                                </div>


                                                <div style={{ display: "flex", flexWrap: "wrap", overflowX: "auto" }}>

                                                    {pages?.map((item, index) => {
                                                        return (
                                                            <>
                                                                {/* <div className="col-lg-2 col-sm-2"> */}

                                                                <Button
                                                                    label={item}
                                                                    icon="pi pi-times"
                                                                    rounded
                                                                    outlined
                                                                    severity="primary"
                                                                    className="ml-2"
                                                                    onClick={() => RemovePage(index)}
                                                                />

                                                                {/* </div> */}
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </div>



                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                width: "35%",
                                                float: "right",

                                            }}
                                        >

                                            <div>
                                                <Card title=" Instructions">

                                                    <p className="m-0">
                                                        1. To create an O-Level Page, the page name should include "O-Level" in brackets, like Page3 (O-Level).

                                                    </p>
                                                    <p className="m-0">
                                                        2. To create a Passport Page, the page name should include "Passport" in brackets, like Page3 (Passport).

                                                    </p>
                                                    <p className="m-0">
                                                        3. Check The Preview Below
                                                    </p>
                                                    <p className="m-0">
                                                        4. Save
                                                    </p>
                                                </Card>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="card card-table">
                                <div class="card-body">
                                    <h4>Preview</h4>

                                    <Form data={formDesign} isPreview={true} />
                                    <div className='col-auto text-end float-end ms-auto download-grp'>


                                        {isSaving == false ?
                                            <Button
                                                label="Save Form"
                                                icon="pi pi-save"
                                                rounded

                                                severity="primary"
                                                className=""
                                                onClick={() => SaveForPages()}
                                            />
                                            :
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                Saving.....
                                            </button>
                                        }
                                    </div>
                                </div></div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
