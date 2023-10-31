import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import {
  ALL_DEPARTMENT,
  COURSE_ALLOCATION_BY_PROGRAMME_AND_DEPARTMENT,
  GET_ALL_SESSION,
  ALL_PROGRAMME,
  ALL_LEVEL,
  ALL_USER,
  ALL_SEMESTER,
  COURSE_ASSIGNMENT_BY_PROGRAMME_AND_DEPARTMENT,
} from "@/pages/api/queries/admin";
import { SAVE_COURSE_ALLOCATION } from "@/pages/api/mutations/admin";
import { Dropdown } from "primereact/dropdown";

export default function courseAllocation() {
  const [programme, setProgramme] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [semester, setSemester] = useState("");
  const [courseAssignObj, setCourseAssignObj] = useState({});

  const [
    saveCourseAllocation,
    {
      loading: saveCourseAllocationLoad,
      error: saveCourseAllocationError,
      data: saveCourseAllocationData,
    },
  ] = useMutation(SAVE_COURSE_ALLOCATION);

  const [
    courseAllocationByProgDept,
    {
      loading: courseAllocationLoad,
      error: courseAllocationError,
      data: courseAllocationData,
    },
  ] = useLazyQuery(COURSE_ALLOCATION_BY_PROGRAMME_AND_DEPARTMENT);

  // console.log(courseAllocationData, "allocationnn");

  const [
    getDepartment,
    { loading: departmentLoading, error: depterror, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const {
    loading: sessionLoading,
    error: Error,
    data: sessionData,
  } = useQuery(GET_ALL_SESSION);

  const [
    allProgramme,
    { loading: loadingProgramme, error: error, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);

  // console.log(programmeList, "progdata");

  const [allLevel, { loading: levelLoad, error: levelError, data: levelData }] =
    useLazyQuery(ALL_LEVEL);

  const {
    loading: userLoad,
    error: userError,
    data: userData,
  } = useQuery(ALL_USER);
  // console.log(userData, "USERDATA");

  const [
    courseAssignByParams,
    { loading: courseLoad, error: courseError, data: courseData },
  ] = useLazyQuery(COURSE_ASSIGNMENT_BY_PROGRAMME_AND_DEPARTMENT);

  const [
    allSemester,
    { loading: semesterLoad, error: semesterError, data: semesterData },
  ] = useLazyQuery(ALL_SEMESTER);

  // console.log(courseData, "coursedataa");

  useEffect(() => {
    allProgramme();
    getDepartment();
    allLevel();
    allSemester();
  }, []);

  const saveCourseAllocationFunc = async (data) => {
    // console.log(data, "dataaaa");
    const saveResponse = await saveCourseAllocation({
      variables: {
        courseassignmentid: data?.CourseName?.Id,
        assigneeId: data?.User?.Id,
        sessionid: data?.Session?.Id,
      },
    });
    // console.log(saveResponse, "responseeee!!");
    if (saveResponse?.data?.saveCourseAllocation?.id > 0) {
      toast.success("Course Successfully Allocated");
    }
  };

  const courseAssignFunc = async () => {
    const courseAssignResponse = await courseAssignByParams({
      variables: {
        departmentid: department?.Id,
        programmeid: programme?.Id,
        levelid: level?.Id,
        semesterid: semester?.Id,
      },
    });
    // console.log(department, "dept");
    // console.log(
    //   courseAssignResponse?.data?.courseAssignmentByProgrammeAndDepartment,
    //   "plssss==="
    // );
  };

  const courseAllocationQuery = async () => {
    const queryResponse = await courseAllocationByProgDept({
      variables: {
        departmentid: department?.Id,
        programmeid: programme?.Id,
        levelid: level?.Id,
      },
    });
    courseAssignFunc().then(() => {
      setShowTable(true);
    });
    // console.log(queryResponse, "queryResponse===");
  };

  const headers = [
    {
      field: "Session",
      header: "Session",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "User",
      header: "User",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "CourseName",
      header: " Course Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "AllocatedBy",
      header: "Allocated By",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "DateAllocated",
      header: " Date Allocated",
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

  const tableRow =
    courseAllocationData?.courseAllocationByProgrammeAndDepartment?.map(
      (item, index) => {
        return {
          User: item?.user?.fullName,
          CourseName: item?.courseAssignment?.course?.name,
          AllocatedBy: item?.assignedBy?.fullName,
          DateAllocated: item?.dateAssigned.substring(0, 10),
          Session: item?.session?.name,
        };
      }
    );

  const levelList = levelData?.allLevel?.map((item) => {
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

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const courseList = courseData?.courseAssignmentByProgrammeAndDepartment?.map(
    (item) => {
      // console.log(item, "courseItem");
      return {
        Name: item?.course?.name,
        Id: item.id,
      };
    }
  );

  const userList = userData?.allUser?.map((item) => {
    return {
      Name: item.fullName,
      Id: item.userId,
    };
  });
  console.log(userList, "userlist");
  const selectSemester = semesterData?.allSemeter?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const TableObj = {
    AllocatedBy: "",
    CourseName: "",
    User: "",
    Id: "",
    DateAssigned: "",
    Session: "",
  };

  const DropDownObjects = [
    {
      Name: "CourseName",
      Type: "Dropdown",
      List: courseList,
      Description: "",
      Id: "",
    },

    {
      Name: "User",
      Type: "Dropdown",
      List: userList,
      Description: "",
      Id: "",
    },
    {
      Name: "Session",
      Type: "Dropdown",
      List: sessionList,
      Description: "",
      Id: "",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <div className="row p-5">
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
          <div className="col-lg-4 col-sm-12">
            <div className="local-forms form-group">
              <label>
                Level
                <span className="login-danger">*</span>
              </label>
              <Dropdown
                value={level}
                options={levelList}
                placeholder="select Level"
                onChange={(e) => setLevel(e.target.value)}
                className="w-full md:w-21.5rem"
                optionLabel="Name"
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="local-forms form-group">
              <label>
                Semester
                <span className="login-danger">*</span>
              </label>
              <Dropdown
                value={semester}
                options={selectSemester}
                placeholder="select Semester"
                onChange={(e) => setSemester(e.target.value)}
                className="w-full md:w-21.5rem"
                optionLabel="Name"
              />
            </div>
          </div>
          <div className=" text-right">
            <div className="local-forms form-group">
              <button
                className="btn btn-primary"
                onClick={() => courseAllocationQuery()}
              >
                View
              </button>
            </div>
          </div>
        </div>
        {showTable ? (
          <div className="px-5">
            <Table
              saveFunc={saveCourseAllocationFunc}
              headers={headers}
              generateColumnTemplates={generateColumnTemplates}
              tableName={"Course Allocation"}
              allowEdit={true}
              allowApply={false}
              tableObjectBody={TableObj}
              showExport={true}
              showAddButton={true}
              variablesForQuery={{}}
              tableContent={tableRow}
              dropDownObjects={DropDownObjects}
              editFunc={{}}
              deleteFunc={{}}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
