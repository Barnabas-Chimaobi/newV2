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
  ALL_COURSE,
} from "@/pages/api/queries/admin";
import { SAVE_COURSESASSIGNMENT_BULK } from "@/pages/api/mutations/admin";
import { Dropdown } from "primereact/dropdown";
import { COURSE_TYPE } from "@/pages/api/queries/admin";
import InputTable from "../../../components/inputTable";
import Spinner from "@/components/spinner";
import { selectedProducts } from "../../../components/inputTable";
import { useSelector } from "react-redux";

export default function assignCourses() {
  const [programme, setProgramme] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [semester, setSemester] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [courseAllocationArr, setCourseAllocationArr] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  var bulkArr = useSelector((state) => state.schoolSetup.courseArr);
  console.log(bulkArr, "bulkkkaRR");

  const handleCheckItems = (e) => {
    console.log(e, "recieving");
    setCheckedItems(e);
  };
  const [
    allProgramme,
    { loading: loadingProgramme, error: error, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);

  const [allLevel, { loading: levelLoad, error: levelError, data: levelData }] =
    useLazyQuery(ALL_LEVEL);

  const [
    courseType,
    { loading: courseTypeLoad, error: courseTypeError, data: courseTypeData },
  ] = useLazyQuery(COURSE_TYPE);

  const [
    getDepartment,
    { loading: departmentLoading, error: depterror, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const [
    allSemester,
    { loading: semesterLoad, error: semesterError, data: semesterData },
  ] = useLazyQuery(ALL_SEMESTER);

  const [
    courseAssignment,
    { loading: bulkLoad, error: bulkError, data: bulkData },
  ] = useMutation(SAVE_COURSESASSIGNMENT_BULK);

  const courseAssignmentBulk = async (data) => {
    try {
      const bulkResponse = await courseAssignment({
        variables: {
          departmentid: department?.Id,
          programmeid: programme?.Id,
          levelid: level?.Id,
          semesterid: semester?.Id,
          createbulkcoursesassignment: data,
        },
      });
      toast.success("Course Allocation Successful");
      initTableData();

      // console.log(bulkResponse, "responseee");
      // setSaveResponse(bulkResponse?.data?.saveCourseAssignmentBulk);
      //   if (bulkResponse?.data?.saveCourseAssignmentBulk?.failedCount == 0) {
      //     toast.success("All Selected Courses have been assigned");
      //   }
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  const selectSemester = semesterData?.allSemeter?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const selectCourseType = courseTypeData?.allCoursetype?.map((item) => {
    return {
      Name: item?.courseTypeName,
      Id: item?.id,
    };
  });
  // const  [
  //   loading: allCourseLoad,
  //   error: allCourseError,
  //   data: allCourseData,
  // } = useQuery(ALL_COURSE);
  const [
    initTableData,
    { loading: tableDataLoad, error: tableDataError, data: allCourseData },
  ] = useLazyQuery(ALL_COURSE);
  // console.log(allCourseData, ">>>>>>>>>>>>>>>");
  const tableRow = allCourseData?.allCourse?.map((item, index) => {
    return {
      CourseName: item.name,
      Id: item.id,
      CourseUnit: "",
      CourseType: "",
    };
  });
  // console.log(tableRow, ">>>>>>>>>@@@@@@@@@@@@@@@>>>>>>");

  useEffect(() => {
    initTableData();
    allSemester();
    allProgramme();
    getDepartment();
    allLevel();
    courseType();
  }, []);

  const headers = [
    {
      field: "CourseName",
      header: " Course Name",
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

  const TableObj = {
    CourseName: "",
    Id: "",
  };

  const courseTypes = [
    {
      Name: "COMPULSORY",
      Id: 1,
    },
    {
      Name: "ELECTIVE",
      Id: 2,
    },
    {
      Name: "REQUIRED",
      Id: 3,
    },
    {
      Name: "GENERAL STUDIES",
      Id: 4,
    },
    {
      Name: "CORE",
      Id: 5,
    },
    {
      Name: "RESTRICTIVE",
      Id: 6,
    },
    {
      Name: "PRINCIPAL",
      Id: 7,
    },
  ];

  const GetId = (id) => {
    const index = courseTypes.indexOf(id);
    return index?.Id;
  };

  const retrieveCourseAllocationItems = (data) => {
    console.log(data, "courseArrrrrr");
    setCourseAllocationArr(data);
    setOpenDialog(false);
    courseAssignmentBulk(data); //mutation function call
  };
  const triggerPop = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <div>
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
          </div>

          {tableDataLoad ? (
            <Spinner />
          ) : (
            <div className="px-5">
              <InputTable
                Data={tableRow}
                triggerFunc={retrieveCourseAllocationItems}
                showDialog={openDialog}
                dialogToggleFunc={triggerPop}
              />
              {/* <InputTable Data={[{ CourseName: "MIRACLE" }]} /> */}
            </div>
          )}
          <div className=" text-right">
            <div className="local-forms form-group">
              <button className="btn btn-primary" onClick={() => triggerPop()}>
                Save Assigned courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
