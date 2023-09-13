import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
// import Table from "../../../src/app/components/table";
// import { GET_ALL_SESSION } from "../../../api/queries/admin";
// import {
//   SAVE_SESSION,
//   UPDATE_SESSION,
//   DELETE_SESSION,
// } from "../../../api/mutations/admin";
import Table from "../../../components/table";
import { GET_ALL_SESSION } from "@/pages/api/queries/admin";
import {
  SAVE_SESSION,
  UPDATE_SESSION,
  DELETE_SESSION,
} from "@/pages/api/mutations/admin";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";

export default function index() {
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

  const TableObj = { Name: "", Startdate: "", Enddate: "", id: "" };
  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Startdate",
      Type: "Date",
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Enddate",
      Type: "Date",
      List: isNullableType,
      Description: "",
      id: "",
    },
  ];

  const [
    getSession,
    { loading: sessionLoading, error: error, data: sessionData },
  ] = useLazyQuery(GET_ALL_SESSION);

  const [
    sessionAdd,
    { loading: sessionLoad, error: sessionError, data: saveSessionData },
  ] = useMutation(SAVE_SESSION);

  const [
    updateSession,
    { loading: sessioLoading, error: sessioError, data: sessioData },
  ] = useMutation(UPDATE_SESSION);
  const [
    delSession,
    { loading: sessinLoading, error: sessinError, data: sessinData },
  ] = useMutation(DELETE_SESSION);

  const saveSessionFunc = async (data) => {
    console.log(data, "dataaaa");
    try {
      const savePayload = await sessionAdd({
        variables: {
          name: data?.Name,
          startDate: data.Startdate.substring(0, 10),
          endDate: data?.Enddate.substring(0, 10),
        },
      });
      getSession();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateSessionFunc = async (data) => {
    console.log(data, "updateparamm");
    try {
      const updatePayload = await updateSession({
        variables: {
          updateSessionId: data?.Id,
          name: data?.Name,
          startDate: data.Startdate.substring(0, 10),
          endDate: data?.Enddate.substring(0, 10),
        },
      });
      getSession();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteSessionFunc = async (data) => {
    console.log(data, "deleparam");
    try {
      const delPayload = await delSession({
        variables: {
          deleteSessionId: data?.Id,
        },
      });
      getSession();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tableRow = sessionData?.allSession?.map((item) => {
    return {
      Name: item?.name,
      Description: item?.description,
      Id: item?.id,
    };
  });

  useEffect(() => {
    getSession();
  }, []);
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card card-table">
                <div class="card-body">
                  <Table
                    saveFunc={saveSessionFunc}
                    headers={headers}
                    generateColumnTemplates={generateColumnTemplates}
                    tableName={"Session"}
                    allowEdit={true}
                    allowApply={false}
                    tableObjectBody={TableObj}
                    showExport={true}
                    showAddButton={true}
                    variablesForQuery={{}}
                    tableContent={tableRow}
                    dropDownObjects={DropDownObjects}
                    editFunc={updateSessionFunc}
                    deleteFunc={deleteSessionFunc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
