import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { GET_ALL_FACULTY } from "../../../pages/api/queries/admin";
import { ALL_DEPARTMENT } from "../../../pages/api/queries/admin";
import {
  UPDATE_DEPARTMENT,
  SAVE_DEPARTMENT,
  DELETE_DEPARTMENT,
} from "../../../pages/api/mutations/admin";
import Spinner from "../../../components/spinner";

export default function createDepartment() {
  const [getfacultyList, setGetFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true

  const headers = [
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "DeptCode",
      header: "Dept Code",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "Faculty",
      header: "Faculty",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    // Add more headers as needed
  ];

  const [
    getFaculty,
    { loading: loadingFaculty, error: facError, data: facultyList },
  ] = useLazyQuery(GET_ALL_FACULTY);

  const [
    updateDepart,
    { loading: UpdateLoading, error: UpdateError, data: UpdateData },
  ] = useMutation(UPDATE_DEPARTMENT);

  const [saveDept, { loading: deptLoading, error: deptError, data: deptData }] =
    useMutation(SAVE_DEPARTMENT);

  const [
    delDepartment,
    { loading: depatmentLoading, error: depatmentError, data: depatmentData },
  ] = useMutation(DELETE_DEPARTMENT);

  // console.log(facultyList?.allFaculty, "faculty");

  const FacultyListItem = facultyList?.allFaculty?.map((item) => ({
    Id: item?.id,
    Name: item?.name,
  }));

  const [
    allDepartment,
    { loading: departmentLoading, error: error, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  // console.log(departmentData, "deptdata");

  const saveDeptFunc = async (data) => {
    try {
      console.log(data, "saveParaammmm");
      const saveResponse = await saveDept({
        variables: {
          name: data?.Name,
          facultyid: data?.FacultyId?.Id,
          deptCode: data?.DeptCode,
        },
      });
      //console.log(saveResponse, "saveresponse");
      allDepartment();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editDept = async (data) => {
    console.log(data, "editdataaa");
    try {
      const editResponse = await updateDepart({
        variables: {
          updateDepartmentId: data?.Id,
          name: data?.Name,
          facultyId: data?.FacultyId,
        },
      });
      console.log(editResponse, "responseedit");
      allDepartment();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteDept = async (data) => {
    // console.log(data, "kjhgdfghjkljhgfhjk====");
    try {
      const remove = await delDepartment({
        variables: {
          deleteDepartmentId: data?.Id,
        },
      });
      allDepartment();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    // Fetch the faculty data here
    getFaculty()
      .then((data) => {
        setGetFaculty(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        // console.error("Error fetching faculty data:", error);
        setIsLoading(false); // Set loading to false in case of an error
        toast.error("Error occured");
      });
    allDepartment();
  }, []);

  // console.log(FacultyListItem, "falcuty drip dhdjdkl");
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

  const TableObj = {
    Name: "",
    DeptCode: "",
    Faculty: "",
    FacultyId: "",
    Id: "",
  };

  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "DeptCode",
      Type: "Text",
      List: null,
      Description: "",
      Id: "",
    },
    {
      Name: "Faculty",
      Type: "Dropdown",
      List: FacultyListItem,
      Description: "",
      Id: "",
    },
  ];

  const tableRow = departmentData?.allDepartment?.map((item) => {
    return {
      Name: item?.name,
      DeptCode: item?.code,
      Faculty: item?.faculty?.name,
      Id: item?.id,
      FacultyId: item?.faculty?.id,
    };
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <div className="">
            <div class="row">
              <div class="col-sm-12">
                <div class="card card-table">
                  <div class="card-body">
                    <Table
                      saveFunc={saveDeptFunc}
                      headers={headers}
                      generateColumnTemplates={generateColumnTemplates}
                      tableName={"Department"}
                      allowEdit={true}
                      allowApply={false}
                      tableObjectBody={TableObj}
                      showExport={true}
                      showAddButton={true}
                      variablesForQuery={{}}
                      tableContent={tableRow}
                      dropDownObjects={DropDownObjects}
                      editFunc={editDept}
                      deleteFunc={deleteDept}
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
