import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { ALL_FEE } from "@/pages/api/queries/admin";
import { SAVE_FEE, UPDATE_FEE, DELETE_FEE } from "@/pages/api/mutations/admin";

export default function fee() {
  const [
    createFee,
    { loading: createFeeLoad, error: createFeeError, data: createFeeData },
  ] = useMutation(SAVE_FEE);

  const [
    updateFee,
    { loading: updateFeeLoad, error: updateFeeError, data: updateFeeData },
  ] = useMutation(UPDATE_FEE);
  const [
    deleteFee,
    { loading: deleteFeeLoad, error: deleteFeeError, data: deleteFeeData },
  ] = useMutation(DELETE_FEE);

  const [allFee, { loading: feeLoad, error: feeError, data: feeData }] =
    useLazyQuery(ALL_FEE);

  console.log(feeData, "feedataaa");

  const saveFee = async (data) => {
    try {
      const fee = await createFee({
        variables: {
          name: data?.Name,
          amount: data?.Amount,
          description: item?.Description,
        },
      });
      allFee();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateFeeFunc = async (data) => {
    try {
      const updateResponse = await updateFee({
        variables: {
          updateFeeId: data?.Id,
          name: data?.Name,
          amount: data?.Amount,
        },
      });
      allFee();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteFeeFunc = async (data) => {
    try {
      const delResponse = await deleteFee({
        variables: {
          deleteFeeId: id,
        },
      });
      allFee();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const headers = [
    {
      field: "Setup Name",
      header: "Setup Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Amount",
      header: "Amount",
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

  const TableObj = { Name: "", Amount: "", Description: "", Id: "" };

  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "Amount",
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

  const tableRow = feeData?.allFee?.map((item, index) => {
    return {
      Name: item?.name,
      Amount: item?.amount,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allFee();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <Table
          saveFunc={saveFee}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={"Fee"}
          allowEdit={true}
          allowApply={false}
          tableObjectBody={TableObj}
          showExport={true}
          showAddButton={true}
          variablesForQuery={{}}
          tableContent={tableRow}
          dropDownObjects={DropDownObjects}
          editFunc={updateFeeFunc}
          deleteFunc={deleteFeeFunc}
        />
      </div>
    </div>
  );
}
