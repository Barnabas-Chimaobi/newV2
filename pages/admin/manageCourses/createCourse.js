import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import {
  SAVE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "@/pages/api/mutations/admin";
import { ALL_COURSE } from "@/pages/api/queries/admin";

export default function createCourse() {
  const [
    addCourse,
    { loading: addCourseLoad, error: addCourseError, data: addCourseData },
  ] = useMutation(SAVE_COURSE);

  const [
    getAllCourse,
    { loading: allCourseLoad, error: allCourseError, data: allCourseData },
  ] = useLazyQuery(ALL_COURSE);

  const [
    updateCourse,
    {
      loading: updateCourseLoad,
      error: updateCourseError,
      data: updateCourseData,
    },
  ] = useMutation(UPDATE_COURSE);

  const [
    deleteCourse,
    {
      loading: deleteCourseLoad,
      error: deleteCourseError,
      data: deleteCourseData,
    },
  ] = useMutation(DELETE_COURSE);

  const addNewCourse = async (data) => {
    // console.log(data, "data=======");
    // console.log("code entered here", courseCode, courseName);
    try {
      const save = await addCourse({
        variables: {
          name: data?.CourseName,
          code: data?.CourseCode,
        },
      });
      toast.success("Course added successfully");
      getAllCourse();
    } catch (error) {
      console.log(error, "errorss===");
      toast.error(error.message);
    }
  };

  const updateCourseFunc = async (data) => {
    try {
      const updateCoursePayload = await updateCourse({
        variables: {
          updateCourseId: data?.Id,
          name: data?.CourseName,
          code: data?.CourseCode,
        },
      });
      getAllCourse();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteCourseFunc = async (data) => {
    console.log(data, "coursedata");
    try {
      const deletePayLoad = await deleteCourse({
        variables: {
          deleteCourseId: data?.Id,
        },
      });
      getAllCourse();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const headers = [
    {
      field: "CourseName",
      header: " Course Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "CourseCode",
      header: " Course Code",
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

  const TableObj = { CourseName: "", CourseCode: "", Id: "" };
  const DropDownObjects = [
    {
      Name: "CourseName",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "CourseCode",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  const tableRow = allCourseData?.allCourse?.map((item, index) => {
    return {
      CourseName: item?.name,
      CourseCode: item?.code,
      Id: item?.id,
    };
  });

  // console.log(allCourseData, "coursedataaa");

  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <Table
          saveFunc={addNewCourse}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={"Create Courses"}
          allowEdit={true}
          allowApply={false}
          tableObjectBody={TableObj}
          showExport={true}
          showAddButton={true}
          variablesForQuery={{}}
          tableContent={tableRow}
          dropDownObjects={DropDownObjects}
          editFunc={updateCourseFunc}
          deleteFunc={deleteCourseFunc}
        />
      </div>
    </div>
  );
}
