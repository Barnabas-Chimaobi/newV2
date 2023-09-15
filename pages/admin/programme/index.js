import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { ALL_PROGRAMME } from "../../../pages/api/queries/admin";
import {
    SAVE_PROGRAMME,
    UPDATE_PROGRAMME,
    DELETE_PROGRAMME
} from "../../../pages/api/mutations/admin";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";


export default function Programme() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [
        programme,
        { loading: programmeloading, error: programmeerror, data: programmeList },
    ] = useLazyQuery(ALL_PROGRAMME);
    console.log(programmeList, "programmedata");

    const [
        saveprogrammeItem,
        { loading: saveprogrammeItemLoading, error: saveprogrammeItemError, data: saveprogrammeItemData },
    ] = useMutation(SAVE_PROGRAMME);

    const [
        updateprogramme,
        { loading: updateLoading, error: updateError, data: updateData },
    ] = useMutation(UPDATE_PROGRAMME);

    const [deleteprogramme, { loading: delLoad, error: delError, data: delData }] =
        useMutation(DELETE_PROGRAMME);
    const headers = [
        {
            field: "Name",
            header: "Name",
            sortable: true,
            style: { minWidth: "12rem", backgroundColor: "white" },
        },
        {
            field: "Description",
            header: "Description",
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

    const TableObj = { Name: "", Description: "", Id: "" };
    const DropDownObjects = [
        {
            Name: "Name",
            Type: "Text",
            List: null,
            Description: "",
            id: "",
        },
        {
            Name: "Description",
            Type: "Text",
            List: null,
            Description: "",
            id: "",
        },
    ];
    const tableRow = programmeList?.allProgramme?.map((item) => {
        return {
            Name: item?.name,
            Description: item?.description,
            Id: item?.id,
        };
    });
    console.log(tableRow, "Tablerow")
    useEffect(() => {
        programme().then((data) => {

            setisLoading(false); // Set loading to false after data is fetched
        })
            .catch((error) => {
                console.error("Error fetching programme data:", error);
                setisLoading(false);
            });
    }, []);
    const saveprogramme = async (data) => {
        console.log(data, "dataaaa");
        try {
            const response = await saveeprogramme({
                variables: {
                    name: data?.Name,
                    description: data?.Description,
                },
            });
            programme();
            console.log(response, "facResponse");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const editprogramme = async (data) => {
        console.log(data, "kjhgdfghjkljhgfhjk====");
        try {
            const editResponse = await saveprogrammeItem({
                variables: {
                    updateprogrammeId: data?.Id,
                    name: data?.Name,
                    description: data?.Description,
                },
            });
            console.log(editResponse, "edittt");
            programme();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const deleteprogrammeFunc = async (data) => {
        console.log(data, "deleteeeeplssss");
        try {
            const del = await deleteprogramme({
                variables: {
                    id: data?.Id,
                },
            });
            console.log(del, "del");
            programme();
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card card-table">
                                <div class="card-body">
                                  
                                    <Table
                                        saveFunc={saveprogramme}
                                        headers={headers}
                                        generateColumnTemplates={generateColumnTemplates}
                                        tableName={"Programme"}
                                        allowEdit={true}
                                        allowApply={false}
                                        tableObjectBody={TableObj}
                                        showExport={true}
                                        showAddButton={true}
                                        variablesForQuery={{}}
                                        tableContent={tableRow}
                                        dropDownObjects={DropDownObjects}
                                        editFunc={editprogramme}
                                        deleteFunc={deleteprogrammeFunc}
                                        showCheckBox={false}
                                        showManageButton={true}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
