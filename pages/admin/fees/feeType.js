import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { ALL_FEE_TYPE } from "@/pages/api/queries/admin";
import {
  SAVE_FEE_TYPE,
  UPDATE_FEETYPE,
  DELETE_FEETYPE,
} from "@/pages/api/mutations/admin";

export default function feeType() {
  const [
    createFeeType,
    { loading: feeTypeLoad, error: feeTypeError, data: feeTypeData },
  ] = useMutation(SAVE_FEE_TYPE);

  const [
    updateFeeType,
    { loading: updateLoad, error: updateError, data: updateData },
  ] = useMutation(UPDATE_FEETYPE);

  const [
    deleteFeeType,
    { loading: deleteLoad, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_FEETYPE);

  const [allFeeType, { loading: typeLoad, error: typeError, data: typeData }] =
    useLazyQuery(ALL_FEE_TYPE);

  const saveFeeType = async (data) => {
    console.log(data, "dataaaa");
    try {
      const fee = await createFeeType({
        variables: {
          name: data?.Name,
          description: data?.Description,
        },
      });
      allFeeType();
      if (fee?.data?.saveFeeType?.id > 0) {
        toast.success("New Fee Type Added");
        allFeeType();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateFeeTypeFunc = async (data) => {
    try {
      const updateFee = await updateFeeType({
        variables: {
          updateFeeTypeId: data?.Id,
          name: data?.Name,
        },
      });
      allFeeType();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteFeeTypeFunc = async (data) => {
    try {
      const deleteRes = await deleteFeeType({
        variables: {
          deleteFeeTypeId: data?.Id,
        },
      });
      allFeeType();
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  const TableObj = { Name: "", Description: "", Id: "" };
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

  const tableRow = typeData?.allFeeType?.map((item, index) => {
    return {
      Name: item?.name,
      Description: item?.description,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allFeeType();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <Table
          saveFunc={saveFeeType}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={"Fee Type"}
          allowEdit={true}
          allowApply={false}
          tableObjectBody={TableObj}
          showExport={true}
          showAddButton={true}
          variablesForQuery={{}}
          tableContent={tableRow}
          dropDownObjects={DropDownObjects}
          editFunc={updateFeeTypeFunc}
          deleteFunc={deleteFeeTypeFunc}
        />
      </div>
    </div>
  );
}
