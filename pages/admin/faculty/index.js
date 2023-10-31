import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { GET_ALL_FACULTY } from "../../../pages/api/queries/admin";
import {
  SAVE_FACULTY,
  UPDATE_FACULTY,
  DELETE_FACULTY,
} from "../../../pages/api/mutations/admin";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";

export default function index() {
  const [tableData, setTableData] = useState([]);

  const [
    faculty,
    { loading: loadingFaculty, error: error, data: facultyList },
  ] = useLazyQuery(GET_ALL_FACULTY);
  // console.log(facultyList, "facultydata");

  const [
    saveeFaculty,
    { loading: facultyLoading, error: facultyError, data: facultyData },
  ] = useMutation(SAVE_FACULTY);

  const [
    updateFaculty,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_FACULTY);

  const [deleteFaculty, { loading: delLoad, error: delError, data: delData }] =
    useMutation(DELETE_FACULTY);

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

  const tableRow = facultyList?.allFaculty?.map((item) => {
    return {
      Name: item?.name,
      Description: item?.description,
      Id: item?.id,
    };
  });

  useEffect(() => {
    faculty();
  }, []);

  const saveFaculty = async (data) => {
    // console.log(data, "dataaaa");
    try {
      const response = await saveeFaculty({
        variables: {
          name: data?.Name,
          description: data?.Description,
        },
      });
      faculty();
      // console.log(response, "facResponse");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editFaculty = async (data) => {
    // console.log(data, "kjhgdfghjkljhgfhjk====");
    try {
      const editResponse = await updateFaculty({
        variables: {
          updateFacultyId: data?.Id,
          name: data?.Name,
          description: data?.Description,
        },
      });
      // console.log(editResponse, "edittt");
      faculty();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteFacultyFunc = async (data) => {
    // console.log(data, "deleteeeeplssss");
    try {
      const del = await deleteFaculty({
        variables: {
          deleteFacultyId: data?.Id,
        },
      });
      // console.log(del, "del");
      faculty();
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
                    saveFunc={saveFaculty}
                    headers={headers}
                    generateColumnTemplates={generateColumnTemplates}
                    tableName={"Faculty"}
                    allowEdit={true}
                    allowApply={false}
                    tableObjectBody={TableObj}
                    showExport={true}
                    showAddButton={true}
                    variablesForQuery={{}}
                    tableContent={tableRow}
                    dropDownObjects={DropDownObjects}
                    editFunc={editFaculty}
                    deleteFunc={deleteFacultyFunc}
                    showCheckBox={false}
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
