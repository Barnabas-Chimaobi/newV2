import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { SAVE_HOSTEL_TYPE } from "@/pages/api/mutations/admin";
import { ALL_HOSTEL_TYPES } from "@/pages/api/queries/admin";

export default function hostelType() {
  const [
    saveHostelType,
    {
      loading: saveHostelTypeLoad,
      error: saveHostelTypeError,
      data: saveHostelTypeData,
    },
  ] = useMutation(SAVE_HOSTEL_TYPE);

  const [
    allHostelTypes,
    {
      loading: allHostelTypeLoad,
      error: allHostelTypeError,
      data: allHostelTypeData,
    },
  ] = useLazyQuery(ALL_HOSTEL_TYPES);

  const saveHostelTypeFunc = async (data) => {
    try {
      const saveTypePayload = await saveHostelType({
        variables: {
          hostelTypeName: data?.HostelType,
          hostelTypeDescription: data?.HostelDescription,
        },
      });
      allHostelTypes();
    } catch (err) {
      toast.error(err.message);
    }
  };
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

  const headers = [
    {
      field: "HostelType",
      header: "Hostel Type",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelDescription",
      header: "Hostel Description",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
  ];

  const TableObj = { HostelType: "", HostelDescription: "", Id: "" };
  const DropDownObjects = [
    {
      Name: "HostelType",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "HostelDescription",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  const tableRow = allHostelTypeData?.allHostelTypes?.map((item, index) => {
    return {
      HostelType: item?.hostel_Type_Name,
      HostelDescription: item?.hostel_Type_Description,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allHostelTypes();
  }, []);

  return (
    <div className="card">
      <Table
        saveFunc={saveHostelTypeFunc}
        headers={headers}
        generateColumnTemplates={generateColumnTemplates}
        tableName={" Hostel Type"}
        allowEdit={true}
        allowApply={false}
        tableObjectBody={TableObj}
        showExport={true}
        showAddButton={true}
        variablesForQuery={{}}
        tableContent={tableRow}
        dropDownObjects={DropDownObjects}
        editFunc={{}}
        deleteFunc={{}}
      />
    </div>
  );
}
