import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../../components/table";
import {
  ALL_PROGRAMME_DEPARTMENT,
  ALL_PROGRAMME_SESSION,
  PROGRAMME_NAME,
  GET_ALL_SESSION,
  ALL_DEPARTMENT,
} from "../../../../pages/api/queries/admin";
import {
  CREATE_PROGRAMME_SESSION,
  UPDATE_PROGRAMME_SESSION_NEW,
  DELETE_PROGRAMME_SESSION,
  SAVE_PROGRAMME_DEPARTMENT_NEW,
  DELETE_PROGRAMME_DEPARTMENT_NEW,
} from "../../../../pages/api/mutations/admin";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";
import { TabView, TabPanel } from "primereact/tabview";
import { toast, ToastContainer } from "react-toastify";

export default function ManageProgramme() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [programmesdepts, setprogrammesdepts] = useState([]);
  const [programmesSessions, setprogrammesSessions] = useState([]);
  const [programme, setprogramme] = useState({});
  const [sessions, setsessions] = useState([]);
  const [departments, setdepartments] = useState([]);

  const sessionsListItem = sessions?.map((item) => ({
    id: item?.id,
    Name: item?.name,
  }));
  const departmentsListItem = departments?.map((item) => ({
    id: item?.id,
    Name: item?.name,
  }));

  const [
    createprogrammesession,
    {
      loading: createprogrammesessionLoading,
      error: createprogrammesessionError,
      data: createprogrammesessionData,
    },
  ] = useMutation(CREATE_PROGRAMME_SESSION);
  const [
    updateprogrammesession,
    {
      loading: updateprogrammesessionLoading,
      error: updateprogrammesessionError,
      data: updateprogrammesessionData,
    },
  ] = useMutation(UPDATE_PROGRAMME_SESSION_NEW);
  const [
    deleteprogrammesessionnew,
    {
      loading: deleteprogrammesessionnewLoading,
      error: deleteprogrammesessionnewError,
      data: deleteprogrammesessionnewData,
    },
  ] = useMutation(DELETE_PROGRAMME_SESSION);

  const [
    saveprogrammedepartmentnew,
    {
      loading: saveprogrammedepartmentnewLoading,
      error: saveprogrammedepartmentnewError,
      data: saveprogrammedepartmentnewData,
    },
  ] = useMutation(SAVE_PROGRAMME_DEPARTMENT_NEW);
  const [
    deleteprogrammedepartmentnew,
    {
      loading: deleteprogrammedepartmentnewLoading,
      error: deleteprogrammedepartmentnewError,
      data: deleteprogrammedepartmentnewData,
    },
  ] = useMutation(DELETE_PROGRAMME_DEPARTMENT_NEW);

  const [
    programmedepartment,
    {
      loading: programmedepartmentloading,
      error: programmedepartmenterror,
      data: programmedepartmentList,
    },
  ] = useLazyQuery(ALL_PROGRAMME_DEPARTMENT);
  const [
    programmesession,
    {
      loading: programmesessionloading,
      error: programmesessionerror,
      data: programmesessionList,
    },
  ] = useLazyQuery(ALL_PROGRAMME_SESSION);
  const [
    programmeValue,
    { loading: programmeloading, error: programmeerror, data: programmeList },
  ] = useLazyQuery(PROGRAMME_NAME);
  const [
    allsession,
    {
      loading: allsessionloading,
      error: allsessionerror,
      data: allsessionList,
    },
  ] = useLazyQuery(GET_ALL_SESSION);
  const [
    alldepartments,
    {
      loading: alldepartmentsloading,
      error: alldepartmentserror,
      data: alldepartmentsList,
    },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const programmeDeptheaders = [
    {
      field: "Department",
      header: "Department",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "TotalSessions",
      header: "Total Sessions",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },

    // Add more headers as needed
  ];

  const generateColumnTemplatesProgrammeDept = (programmeDeptheaders) => {
    return programmeDeptheaders.map((header) => (
      <Column
        key={header.field}
        field={header.field}
        header={header.header}
        sortable={header.sortable}
        style={header.style}
      ></Column>
    ));
  };

  const TableObj = { Department: "", Id: "", TotalSessions: "" };

  const DropDownObjects = [
    {
      Name: "Department",
      Type: "Dropdown",
      List: departmentsListItem,
      Description: "",
      id: "",
    },
    {
      Name: "TotalSessions",
      Type: "Text",
      List: null,
      Description: "",
      id: "",
    },
  ];
  const tableProgrammeDepartmentRow = programmesdepts?.map((item) => {
    return {
      Department: item?.department?.name,
      Id: item?.id,
      TotalSessions: item?.totalSessions,
    };
  });

  const tableProgrammeSessionRow = programmesSessions?.map((item) => {
    return {
      Session: item?.session?.name,
      Id: item?.id,
      Activated: item?.activated,
      ActiveForApplication: item?.activeForApplication,
      ActiveForAllocation: item?.activeForAllocation,
      ActiveForResult: item?.activeForResult,
    };
  });
  const TableObjprosession = {
    Session: "",
    Id: "",
    Activated: false,
    ActiveForApplication: false,
    ActiveForAllocation: false,
    ActiveForResult: false,
  };
  const headers = [
    {
      field: "Session",
      header: "Session",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Activated",
      header: "Activated",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "ActiveForApplication",
      header: "Active For Application",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "ActiveForAllocation",
      header: "Active For Allocation",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "ActiveForResult",
      header: "Active For Result",
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

  const DropDownObjectsprosession = [
    {
      Name: "Session",
      Type: "Dropdown",
      List: sessionsListItem,
      Description: "",
      id: "",
    },
    {
      Name: "Activated",
      Type: "Switch",
      List: null,
      Description: "",
      id: "",
    },
    {
      Name: "ActiveForApplication",
      Type: "Switch",
      List: null,
      Description: "",
      id: "",
    },
    {
      Name: "ActiveForAllocation",
      Type: "Switch",
      List: null,
      Description: "",
      id: "",
    },
    {
      Name: "ActiveForResult",
      Type: "Switch",
      List: null,
      Description: "",
      id: "",
    },
  ];

  const getDatapd = async (programmeId) => {
    const depts = await alldepartments();
    setdepartments(depts?.data?.allDepartment);
    const sessionsListDropDown = await allsession();
    setsessions(sessionsListDropDown?.data?.allSession);

    const pd = await programmedepartment({
      variables: {
        programmeid: parseInt(programmeId),
      },
    });
    setprogrammesdepts(pd?.data?.allProgrammeDepartment);
    const ps = await programmesession({
      variables: {
        programmeid: parseInt(programmeId),
      },
    });
    setprogrammesSessions(ps?.data?.allProgrammeSessionByProgramme);
    const p = await programmeValue({
      variables: {
        programmeid: parseInt(programmeId),
      },
    });
    setprogramme(p?.data?.programme?.id);
    console.log(p?.data?.programme, "Programme  sjksdkkc");
    console.log(
      programmesdepts,
      programmesSessions,
      "department and programme department "
    );
    setisLoading(false);
  };
  const repullPd = async () => {
    // setisLoading(true);
    const pd = await programmedepartment({
      variables: {
        programmeid: programme?.id,
      },
    });
    setprogrammesdepts(pd?.data?.allProgrammeDepartment);
    // setisLoading(false);
  };
  const repullPs = async () => {
    //  setisLoading(true);
    const ps = await programmesession({
      variables: {
        programmeid: programme?.id,
      },
    });
    setprogrammesSessions(ps?.data?.allProgrammeSessionByProgramme);
    //   setisLoading(false);
  };

  useEffect(() => {
    const programmeId = router.query.programmeid;
    getDatapd(programmeId);
  }, [router.query.programmeid]);

  const saveprogrammesession = async (data) => {
    console.log(data, "save programme sesssion");
    try {
      const response = await createprogrammesession({
        variables: {
          sessionId: data?.Session?.id,
          programmeid: programme,
          activeforhostel: false,
          activated: data?.Activated,
          activeforfees: false,
          activeforallocation: data?.ActiveForAllocation,
          activeforapplication: data?.ActiveForApplication,
          activeforresult: data?.ActiveForResult,
        },
      });
      repullPs();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editprogrammesession = async (data) => {
    try {
      const response = await updateprogrammesession({
        variables: {
          updateAllProgrammeSessionId: data?.Id,
          activeforhostel: false,
          activated: data?.Activated,
          activeforfees: false,
          activeforallocation: data?.ActiveForAllocation,
          activeforapplication: data?.ActiveForApplication,
          activeforresult: data?.ActiveForResult,
        },
      });
      repullPs();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteprogrammesession = async (data) => {
    console.log(data, "deleteeeeplssss");
    try {
      const response = await deleteprogrammesessionnew({
        variables: {
          deleteProgrammeSessionId: data?.Id,
        },
      });
      repullPs();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveprogrammedepartment = async (data) => {
    console.log(programme, "prohrammmmmmmmm");
    try {
      const response = await saveprogrammedepartmentnew({
        variables: {
          programmeid: programme?.id,
          departmentid: data?.Department?.id,
          sessionduration: parseInt(data?.TotalSessions),
        },
      });
      repullPd();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteprogrammedepartment = async (data) => {
    console.log(data, "deleteeeeplssss");
    try {
      const response = await deleteprogrammedepartmentnew({
        variables: {
          programmedepartmentid: data?.Id,
        },
      });
      repullPd();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            {isLoading ? (
              <Spinner />
            ) : (
              <div class="col-sm-12">
                <div class="card card-table">
                  <div class="card-body">
                    <h4>Manage {programme?.name}(s) Setup</h4>
                  </div>
                </div>
                <div class="card card-table">
                  <div class="card-body">
                    <TabView>
                      <TabPanel header="Programme Sessions">
                        <Table
                          saveFunc={saveprogrammesession}
                          headers={headers}
                          generateColumnTemplates={generateColumnTemplates}
                          tableName={programme?.name + " Session(s)"}
                          allowEdit={true}
                          allowApply={false}
                          tableObjectBody={TableObjprosession}
                          showExport={true}
                          showAddButton={true}
                          variablesForQuery={{}}
                          tableContent={tableProgrammeSessionRow}
                          dropDownObjects={DropDownObjectsprosession}
                          editFunc={editprogrammesession}
                          deleteFunc={deleteprogrammesession}
                          showCheckBox={false}
                          showManageButton={false}
                          showOnlyDeleteButton={false}
                        />
                      </TabPanel>
                      <TabPanel header="Programme Departments">
                        <Table
                          saveFunc={saveprogrammedepartment}
                          headers={programmeDeptheaders}
                          generateColumnTemplates={
                            generateColumnTemplatesProgrammeDept
                          }
                          tableName={programme?.name + " Department(s)"}
                          allowEdit={true}
                          allowApply={false}
                          tableObjectBody={TableObj}
                          showExport={true}
                          showAddButton={true}
                          variablesForQuery={{}}
                          tableContent={tableProgrammeDepartmentRow}
                          dropDownObjects={DropDownObjects}
                          //  editFunc={editprogramme}
                          deleteFunc={deleteprogrammedepartment}
                          showOnlyDeleteButton={true}
                          showCheckBox={false}
                          showManageButton={false}
                        />
                      </TabPanel>
                      <TabPanel header="Programme Departments Options"></TabPanel>
                    </TabView>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
