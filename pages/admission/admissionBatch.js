import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { SAVE_ADMISSION_BATCH } from "../api/mutations/adminMutation";
import { ALL_ADMISSION_BATCH } from "../api/queries/admin";
import Table from "../../components/table";

export default function admissionBatch() {
  const [
    saveAdmissionBatch,
    {
      loading: saveAdmissionBatchLoading,
      error: saveAdmissionBatchError,
      data: saveAdmissionBatchData,
    },
  ] = useMutation(SAVE_ADMISSION_BATCH);

  const [
    getbatches,
    {
      loading: allAdmissionBatchLoading,
      error: allAdmissionBatchError,
      data: allAdmissionBatchData,
    },
  ] = useLazyQuery(ALL_ADMISSION_BATCH);

  const submitAdmissionBatch = async (data) => {
    try {
      const batch = await saveAdmissionBatch({
        variables: {
          name: data?.Name,
          description: data?.Description,
        },
      });
      getbatches();

      //   if (batch?.data?.saveAdmissionBatch?.id > 0) {
      //     setShowAddModal(false);
      //     getbatches();
      //     toast.success("Batch Added Succesfully");
      //   }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getbatches();
  }, []);

  const TableObj = {
    Name: "",
    Description: "",
    Id: "",
  };

  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "Description",
      Type: "Text",
      List: isNullableType,
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
    {
      field: "Description",
      header: "Description",
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

  const tableRow = allAdmissionBatchData?.allAdmissionBatch?.map(
    (item, index) => {
      return {
        Name: item?.name,
      };
    }
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="">
            <Table
              saveFunc={submitAdmissionBatch}
              headers={headers}
              generateColumnTemplates={generateColumnTemplates}
              tableName={"Manage Admission Batch"}
              allowEdit={true}
              allowApply={false}
              tableObjectBody={TableObj}
              showExport={false}
              showAddButton={true}
              variablesForQuery={{}}
              tableContent={tableRow}
              dropDownObjects={DropDownObjects}
              deleteFunc={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
