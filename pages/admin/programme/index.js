import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { ALL_PROGRAMME } from "@/pages/api/queries/admin";
import {
  SAVE_PROGRAMME,
  UPDATE_PROGRAMME,
  DELETE_PROGRAMME,
} from "@/pages/api/mutations/admin";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Spinner from "../../../components/spinner";

export default function index() {
  const [isLoading, setIsLoading] = useState(false);

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

  const TableObj = { Name: "", Description: "", id: "" };
  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      //   List: [
      //     { id: 1, Name: "Fix" },
      //     { id: 2, Name: "French" }
      //   ],
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Description",
      Type: "Text",
      List: isNullableType,
      Description: "",
      id: "",
    },
  ];

  const [
    allProgramme,
    { loading: loadingProgramme, error: error, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);

  const [
    updateProgramme,
    { loading: UpdateLoading, error: UpdateError, data: UpdateData },
  ] = useMutation(UPDATE_PROGRAMME);

  const [
    delProgramme,
    {
      loading: programmeDLoading,
      error: programmeDError,
      data: programmeDData,
    },
  ] = useMutation(DELETE_PROGRAMME);

  const [
    saveProgramme,
    { loading: programmeLoading, error: programmeError, data: programmeData },
  ] = useMutation(SAVE_PROGRAMME);

  const saveProgrammeFunc = async (data) => {
    console.log(data, "progparam");

    try {
      const saveResponse = await saveProgramme({
        variables: {
          name: data?.Name,
          description: data?.Description,
        },
      });
      setIsLoading(false);
      allProgramme();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateProgFunc = async (data) => {
    console.log(data, "updateprogparam");

    try {
      const updatePayload = await updateProgramme({
        variables: {
          name: data?.Name,
          id: data?.Id,
          description: data?.Description,
        },
      });

      allProgramme();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteProgFunc = async (data) => {
    console.log(data, "delprogParam");
    try {
      const delPayload = await delProgramme({
        variables: {
          deleteProgrammeId: data?.Id,
        },
      });

      allProgramme();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tableRow = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item?.name,
      Description: item?.description,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allProgramme();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <div class="card card-table">
                  <div class="card-body">
                    <Table
                      saveFunc={saveProgrammeFunc}
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
                      editFunc={updateProgFunc}
                      deleteFunc={deleteProgFunc}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
