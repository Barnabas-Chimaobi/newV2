import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import {
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
  ALL_LEVEL,
  ALL_SEMESTER,
  COURSE_ASSIGNMENT_BY_PROGRAMME_AND_DEPARTMENT,
  ALL_COURSE,
  GET_ALL_SESSION,
} from "@/pages/api/queries/admin";
import { SAVE_COURSESASSIGNMENT } from "@/pages/api/mutations/admin";
import { Dropdown } from "primereact/dropdown";

export default function courseAssignment() {
  const [programme, setProgramme] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [semester, setSemester] = useState("");

  const [
    getDepartment,
    { loading: departmentLoading, error: depterror, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const [
    courseAssignByParams,
    { loading: courseLoad, error: courseError, data: courseData },
  ] = useLazyQuery(COURSE_ASSIGNMENT_BY_PROGRAMME_AND_DEPARTMENT);

  const [
    saveCourseAssignment,
    {
      loading: saveCourseAssignmentLoad,
      error: saveCourseAssignmentError,
      data: saveCourseAssignmentData,
    },
  ] = useMutation(SAVE_COURSESASSIGNMENT);

  const [
    allProgramme,
    { loading: loadingProgramme, error: error, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);

  const [
    allSemester,
    { loading: semesterLoad, error: semesterError, data: semesterData },
  ] = useLazyQuery(ALL_SEMESTER);

  const {
    loading: allCourseLoad,
    error: allCourseError,
    data: allCourseData,
  } = useQuery(ALL_COURSE);

  //   console.log(programmeList, "progdata");

  const [allLevel, { loading: levelLoad, error: levelError, data: levelData }] =
    useLazyQuery(ALL_LEVEL);

  const [
    getSession,
    { loading: sessionLoading, error: errorSession, data: sessionData },
  ] = useLazyQuery(GET_ALL_SESSION);

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

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const courseList = allCourseData?.allCourse?.map((item) => {
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

  const selectSemester = semesterData?.allSemeter?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const courseAssignFunc = async () => {
    try {
      const courseAssignResponse = await courseAssignByParams({
        variables: {
          departmentid: department?.Id,
          programmeid: programme?.Id,
          levelid: level?.Id,
          semesterid: semester?.Id,
        },
      });
      setShowTable(true);
      // console.log(courseAssignResponse, "responseee");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    allSemester();
    allProgramme();
    getDepartment();
    allLevel();
    getSession();
  }, []);

  const headers = [
    {
      field: "CourseName",
      header: " Course Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "CourseUnit",
      header: " Course Unit",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Department",
      header: "Department",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Programme",
      header: "Programme",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
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

  const tableRow = courseData?.courseAssignmentByProgrammeAndDepartment?.map(
    (item, index) => {
      return {
        CourseName: item.course.name,
        CourseUnit: item.courseUnit,
        Department: item.department.name,
        Programme: item.programme.name,
      };
    }
  );

  const TableObj = {
    CourseName: "",
    CourseUnit: "",
    Department: "",
    Id: "",
    Programme: "",
  };
  const DropDownObjects = [
    {
      Name: "CourseName",
      Type: "Text",
      List: courseList,
      Description: "",
      Id: "",
    },

    {
      Name: "Programme",
      Type: "Dropdown",
      List: selectProgramme,
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
    {
      Name: "Level",
      Type: "Dropdown",
      List: levelList,
      Description: "",
      Id: "",
    },
    {
      Name: "Semester",
      Type: "Dropdown",
      List: selectSemester,
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
                onClick={() => courseAssignFunc()}
              >
                View Assigned courses
              </button>
            </div>
          </div>
        </div>
        {showTable ? (
          <div className="px-5">
            <Table
              saveFunc={false}
              headers={headers}
              generateColumnTemplates={generateColumnTemplates}
              tableName={"Course Assignment"}
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
