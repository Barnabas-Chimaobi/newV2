import React, { useState, useEffect } from "react";
import { ALL_ROLE } from "../../../pages/api/queries/admin";
import { SAVE_ROLE, UPDATE_ROLE, DELETE_ROLE } from "@/pages/api/mutations/admin";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table"
import { Column } from "primereact/column";

export default function Role() {

    const [
        role,
        { loading: roleloading, error: roleerror, data: roledata },
    ] = useLazyQuery(ALL_ROLE);

    const [
        saveRole, {loading: saveRoleload, error: saveerror, data: savedata },
    ] = useMutation(SAVE_ROLE)

    const [
        updateRole, {loading: updateRoleload, error: updateerror, data: updatedata },
    ] = useMutation(UPDATE_ROLE)

    const [
        deleteRole, {loading: deleteRoleload, error: deleteerror, data: deletedata },
    ] = useMutation(DELETE_ROLE)

    const saveRoleFunction =  async (data) => {
        // console.log(data, "savadata")
        const saveRolePayload = await saveRole({
            variables: {
                name: data?.Name
            }
        })
    }

    const updateRoleFunction = async (data) => {
        console.log(data, "updatedata")
        const updateRoleResponse = await updateRole({
            variables: {
                updateRoleId: data?.Id, 
                name: data?.Name
            }
        })
        console.log(updateRoleResponse, "updateRoleResponse")
        role()
    }

    const deleteRoleFunction = async (data) => {
        console.log(data, "deletedata")
        const deleteRoleResponse = await deleteRole({
            variables: {
                deleteRoleId: data?.Id
            }
        })
        console.log(deleteRoleResponse, "deleteRoleResponse")
    }
    
    console.log(roledata, "role");
    
    useEffect(() => {
        role()
    }, [])
    
    const DropDownObjects = [
        {
          Name: "Name",
          Type: "Text",
          List: null,
          Description: "",
          Id: "",
        },
        
      ];
      const headers = [
        {
          field: "Name",
          header: "Name",
          sortable: true,
          style: { minWidth: "12rem", backgroundColor: "white" },
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

    const TableObj = { Name: "", Id: "" };

    const tableRow = roledata?.allRole?.map((item) => {
        return {
            Name: item?.roleName, 
            Id: item?.roleId
        }
    })

    

  return (
    <div>
        <div className="page-wrapper">
            <div className="content container-fluid">
            <div className="card">

<Table
    saveFunc={saveRoleFunction}
    headers={headers}
    generateColumnTemplates={generateColumnTemplates}
    tableName={"Role"}
    allowEdit={true}
    allowApply={false}
    tableObjectBody={TableObj}
    showExport={false}
    showAddButton={true}
    variablesForQuery={{}}
    tableContent={tableRow}
    dropDownObjects={DropDownObjects}
    editFunc={updateRoleFunction}
    deleteFunc={deleteRoleFunction}
    showCheckBox={false}
    showManageButton={false}
/>

    </div>
            </div>
        </div>
    </div>
  )
}
