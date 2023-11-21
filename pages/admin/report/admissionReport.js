import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { Dropdown } from "primereact/dropdown";
import {
  GET_ALL_SESSION,
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
  ADMITTED_APPLICANTS,
  UNADMITTED_APPLICANTS,
} from "@/pages/api/queries/admin";

export default function () {
  const [programme, setProgramme] = useState("");
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [showTable, setShowTable] = useState(false);

  const headers = [
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Application Number",
      header: " ApplicationNumber",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },

    {
      field: "Session",
      header: " Session",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Programme",
      header: " Programme",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Department",
      header: " Department",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
  ];

  const TableObj = {
    Name: "",
    Id: "",
    Department: "",
    Session: "",
    Programme: "",
    ApplicationNumber: "",
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

  const [
    unadmittedStudents,
    {
      loading: unadmittedLoading,
      error: unadmittedError,
      data: unadmittedData,
    },
  ] = useLazyQuery(UNADMITTED_APPLICANTS);

  const [
    admittedApplicants,
    { loading: admittedLoad, error: admittedError, data: admittedData },
  ] = useLazyQuery(ADMITTED_APPLICANTS);

  const {
    loading: loadingProgramme,
    error: error,
    data: programmeList,
  } = useQuery(ALL_PROGRAMME);

  const {
    loading: sessionLoading,
    error: Error,
    data: sessionData,
  } = useQuery(GET_ALL_SESSION);

  const {
    loading: departmentLoading,
    error: eRror,
    data: departmentData,
  } = useQuery(ALL_DEPARTMENT);

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const tableRow = admittedData?.admittedApplicants?.map((item, index) => {
    return {
      Name: item?.personName,
      ApplicationNumber: item?.applicantionFormNumber,
      Session: item?.session?.name,
      Programme: item?.programmeName,
      Department: item?.departmentName,
      Id: item?.id,
    };
  });
  console.log(admittedData);

  const admittedStudents = async () => {
    if (programme != "" || department != "" || session != "") {
      try {
        const admitted = await admittedApplicants({
          variables: {
            programmeid: programme?.Id,
            departmentid: department?.Id,
            sessionid: session?.Id,
          },
        });
        setShowTable(true);
        // console.log(admitted, 'ADMITTEDDDD')
        // setAdmissionList(admitted);
        // setShowAdmitted(true);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("All the fields are required");
    }
  };

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const departmentList = departmentData?.allDepartment?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card p-5">
            <h3>Admission Report</h3>
          </div>
          <div className="card">
            <div className="row p-5">
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Session <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={session}
                    options={sessionList}
                    placeholder="select Session"
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Programme <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={programme}
                    options={selectProgramme}
                    placeholder="select Programme"
                    onChange={(e) => setProgramme(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>

              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Department <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={department}
                    options={departmentList}
                    placeholder="select Department"
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>

              <div className=" col-lg-4 col-sm-12">
                <div className="local-forms form-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => admittedStudents()}
                  >
                    Admitted List
                  </button>
                </div>
              </div>
            </div>
            {showTable ? (
              <div className="px-5">
                <Table
                  saveFunc={{}}
                  headers={headers}
                  generateColumnTemplates={generateColumnTemplates}
                  tableName={"Admission Report"}
                  allowEdit={true}
                  allowApply={false}
                  tableObjectBody={TableObj}
                  showExport={true}
                  showAddButton={false}
                  variablesForQuery={{}}
                  tableContent={tableRow}
                  dropDownObjects={[]}
                  editFunc={{}}
                  deleteFunc={{}}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
