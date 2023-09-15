import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../../components/table";
import { ALL_PROGRAMME_DEPARTMENT, ALL_PROGRAMME_SESSION, PROGRAMME_NAME, GET_ALL_SESSION, ALL_DEPARTMENT } from "../../../../pages/api/queries/admin";
import {
    SAVE_PROGRAMME,
    UPDATE_PROGRAMME,
    DELETE_PROGRAMME
} from "../../../../pages/api/mutations/admin";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";

export default function ManageProgramme() {
    const router = useRouter();
    const [programmesdepts, setprogrammesdepts] = useState([]);
    const [programmesSessions, setprogrammesSessions] = useState([]);
    const [programme, setprogramme] = useState({});
    const [
        programmedepartment,
        { loading: programmedepartmentloading, error: programmedepartmenterror, data: programmedepartmentList },
    ] = useLazyQuery(ALL_PROGRAMME_DEPARTMENT);
    const [
        programmesession,
        { loading: programmesessionloading, error: programmesessionerror, data: programmesessionList },
    ] = useLazyQuery(ALL_PROGRAMME_SESSION);
    const [
        programmeValue,
        { loading: programmeloading, error: programmeerror, data: programmeList },
    ] = useLazyQuery(PROGRAMME_NAME);

    const programmeDeptheaders = [
        {
            field: "Department",
            header: "Department",
            sortable: true,
            style: { minWidth: "12rem", backgroundColor: "white" },
        }

        // Add more headers as needed
    ];

    const generateColumnTemplatesProgrammeDept = (programmeDeptheaders) => {
        return programmeDeptheaders.map((header) => (
            <Column
                key={header.field}
                field={header.field}
                header={header.header}
                sortable={header.sortable}
                style={header.style}
            ></Column>
        ));
    };

    const TableObj = { Department: "", Id: "" };

    const DropDownObjects = [
        {
            Name: "Department",
            Type: "Text",
            List: null,
            Description: "",
            id: "",
        }
    ];
    const tableProgrammeDepartmentRow = programmesdepts?.map((item) => {
        return {
            Department: item?.department?.name,
            Id: item?.id,
        };
    });


    const tableProgrammeSessionRow = programmesSessions?.map((item) => {
        return {
            Session: item?.session?.name,
            Id: item?.id,
            Activated: item?.activated,
            ActiveForApplication: item?.activeForApplication,
            ActiveForAllocation: item?.activeForAllocation,
            ActiveForResult: item?.activeForResult
        };
    });
    const TableObjprosession = { Session: "", Id: "", Activated: false, ActiveForApplication: false, ActiveForAllocation: false, ActiveForResult: false };
    const headers = [
        {
            field: "Session",
            header: "Session",
            sortable: true,
            style: { minWidth: "12rem", backgroundColor: "white" },
        },
        {
            field: "Activated",
            header: "Activated",
            sortable: true,
            style: { minWidth: "16rem", backgroundColor: "white" },
        },
        {
            field: "ActiveForApplication",
            header: "Active For Application",
            sortable: true,
            style: { minWidth: "16rem", backgroundColor: "white" },
        },
        {
            field: "ActiveForAllocation",
            header: "Active For Allocation",
            sortable: true,
            style: { minWidth: "16rem", backgroundColor: "white" },
        },
        {
            field: "ActiveForResult",
            header: "Active For Result",
            sortable: true,
            style: { minWidth: "16rem", backgroundColor: "white" },
        },


        // Add more headers as needed
    ];

    const generateColumnTemplates = (headers) => {
        return headers.map((header) => (
            <Column
                key={header.field}
                field={header.field}
                header={header.header}
                sortable={header.sortable}
                style={header.style}
            ></Column>
        ));
    };


    const DropDownObjectsprosession = [
        {
            Name: "Session",
            Type: "Text",
            List: null,
            Description: "",
            id: "",
        },
        {
            Name: "Activated",
            Type: "Switch",
            List: null,
            Description: "",
            id: "",
        },
        {
            Name: "ActiveForApplication",
            Type: "Switch",
            List: null,
            Description: "",
            id: "",
        },
        {
            Name: "ActiveForAllocation",
            Type: "Switch",
            List: null,
            Description: "",
            id: "",
        },
        {
            Name: "ActiveForResult",
            Type: "Switch",
            List: null,
            Description: "",
            id: "",
        }
    ];

    const getDatapd = async (programmeId) => {
        const pd = await programmedepartment(
            {
                variables: {
                    programmeid: parseInt(programmeId)
                }
            }
        );
        setprogrammesdepts(pd?.data?.allProgrammeDepartment);
        const ps = await programmesession(
            {
                variables: {
                    programmeid: parseInt(programmeId)
                }
            }
        );
        setprogrammesSessions(ps?.data?.allProgrammeSessionByProgramme)
        const p = await programmeValue(
            {
                variables: {
                    programmeid: parseInt(programmeId)
                }
            }
        )
        setprogramme(p?.data?.programme);
        console.log(programme, "Programme  sjksdkkc")
        console.log(programmesdepts, programmesSessions, "department and programme department ");
    }
    // const getDataps = async (programmeIds) => {

    // }
    useEffect(() => {
        const programmeId = router.query.programmeid;
        getDatapd(programmeId);

    }, [router.query.programmeid]);

    return (
        <div>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card card-table">
                                <div class="card-body">
                                    <h4>{programme?.name}</h4>
                                </div>
                            </div>
                            <div class="card card-table">
                                <div class="card-body">


                                    <Table
                                        // saveFunc={null}
                                        headers={headers}
                                        generateColumnTemplates={generateColumnTemplates}
                                        tableName={programme?.name + " Session(s)"}
                                        allowEdit={true}
                                        allowApply={false}
                                        tableObjectBody={TableObjprosession}
                                        showExport={true}
                                        showAddButton={true}
                                        variablesForQuery={{}}
                                        tableContent={tableProgrammeSessionRow}
                                        dropDownObjects={DropDownObjectsprosession}
                                        //  editFunc={editprogramme}
                                        //  deleteFunc={deleteprogrammeFunc}
                                        showCheckBox={false}
                                        showManageButton={false}
                                        showOnlyDeleteButton={false}
                                    />
                                </div>
                            </div>
                            <div class="card card-table">
                                <div class="card-body">


                                    <Table
                                        // saveFunc={saveprogramme}
                                        headers={programmeDeptheaders}
                                        generateColumnTemplates={generateColumnTemplatesProgrammeDept}
                                        tableName={programme?.name + " Department(s)"}
                                        allowEdit={true}
                                        allowApply={false}
                                        tableObjectBody={TableObj}
                                        showExport={true}
                                        showAddButton={true}
                                        variablesForQuery={{}}
                                        tableContent={tableProgrammeDepartmentRow}
                                        dropDownObjects={DropDownObjects}
                                        //  editFunc={editprogramme}
                                        //deleteFunc={deleteprogrammeFunc}
                                        showOnlyDeleteButton={true}
                                        showCheckBox={false}
                                        showManageButton={false}
                                    />
                                </div>
                            </div>
                            <div class="card card-table">
                                <div class="card-body">


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
