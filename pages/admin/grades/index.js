import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { ALL_GRADES } from "@/pages/api/queries/admin";

export default function index() {
  const [session, setSession] = useState();

  const [
    allGrades,
    { loading: allGradesLoad, error: allGradesError, data: allGradesData },
  ] = useLazyQuery(ALL_GRADES);

  const headers = [
    {
      field: "GradeValue",
      header: "Grade Value",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "GradeWeight",
      header: "Grade Weight",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "LowestNo",
      header: "Lowest No",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "HighestNo",
      header: "Highest No",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "GradeDescription",
      header: "Grade Description",
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

  const DropDownObjects = [
    {
      Name: "GradeValue",
      Type: "Text",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "GradeWeight",
      Type: "Number",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "LowestNo",
      Type: "Number",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "HighestNo",
      Type: "Number",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "GradeDescription",
      Type: "Text",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "Session",
      Type: "Dropdown",
      List: null,
      Description: "",
      Id: "",
    },
  ];

  const TableObj = {
    GradeValue: "",
    GradeWeight: "",
    LowestNo: "",
    HighestNo: "",
    GradeDescription: "",
    Session: "",
    Id: "",
  };

  const tableRow = allGradesData?.allGrades?.map((item) => {
    return {
      GradeValue: item?.gradeValue,
      GradeWeight: item?.gradeWeight,
      LowestNo: item?.lowestNo,
      HighestNo: item?.highestNo,
      GradeDescription: item?.gradeDescription,
      Session: item?.sessionId,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allGrades();
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
                    saveFunc={null}
                    headers={headers}
                    generateColumnTemplates={generateColumnTemplates}
                    tableName={"Grades"}
                    allowEdit={true}
                    allowApply={false}
                    tableObjectBody={TableObj}
                    showExport={false}
                    showAddButton={true}
                    variablesForQuery={{}}
                    tableContent={tableRow}
                    dropDownObjects={DropDownObjects}
                    editFunc={null}
                    deleteFunc={null}
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
