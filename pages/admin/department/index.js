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
} from "../../../pages/api/mutations/admin";
import Spinner from "../../../components/spinner";
export default function index() {
  const [getfacultyList, setGetFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    // Fetch the faculty data here
    getFaculty()
      .then((data) => {
        setGetFaculty(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching faculty data:", error);
        setIsLoading(false); // Set loading to false in case of an error
        toast.error("Error occured");
      });
    allDepartment();
  }, []);

  const headers = [
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "deptCode",
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

  console.log(facultyList?.allFaculty, "faculty");

  const FacultyListItem = facultyList?.allFaculty?.map((item) => ({
    id: item?.id,
    Name: item?.name,
  }));

  const [
    allDepartment,
    { loading: departmentLoading, error: error, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const saveDeptFunc = async (data) => {
    try {
      console.log(data, "saveParaammmm");
      const saveResponse = await saveDept({
        variables: {
          name: data?.Name,
          facultyid: data?.Faculty?.id,
          deptCode: data?.deptCode,
        },
      });
      //console.log(saveResponse, "saveresponse");
      await allDepartment();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editDept = async (data) => {
    try {
      console.log(data, "editdataaa");
      const editResponse = await updateDepart({
        variables: {
          updateDepartmentId: data?.Id,
          name: data?.Name,
          facultyId: data?.Faculty?.id,
        },
      });
      //console.log(editResponse, "responseedit");
      await allDepartment();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteDept = async (data) => {
    console.log(data, "kjhgdfghjkljhgfhjk====");
  };

  console.log(FacultyListItem, "falcuty drip dhdjdkl");
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
    deptCode: "",
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
      id: "",
    },
    {
      Name: "deptCode",
      Type: "Text",
      List: null,
      Description: "",
      id: "",
    },
    {
      Name: "Faculty",
      Type: "Dropdown",
      List: FacultyListItem,
      Description: "",
      id: "",
    },
  ];


  const tableRow = departmentData?.allDepartment?.map((item) => {
    return {
      Name: item?.name,
      deptCode: item?.code,
      Faculty: item?.faculty?.name,
      Id: item?.id,
    };
  });

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
