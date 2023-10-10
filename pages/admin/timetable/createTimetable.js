import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { Dropdown } from "primereact/dropdown";
import {
  COURSE_ALLOCATION_BY_USER,
  VIEW_ALL_TIMETABLE_USERS,
} from "@/pages/api/queries/admin";
import { CREATE_TIMETABLE } from "@/pages/api/mutations/admin";

export default function createTimetable() {
  const [showTable, setShowTable] = useState(false);

  const [
    courseAllocation,
    { loading: courseLoad, error: courseError, data: courseData },
  ] = useLazyQuery(COURSE_ALLOCATION_BY_USER);

  const [
    createTimetable,
    { loading: timetableLoad, error: timetableError, data: timetableData },
  ] = useMutation(CREATE_TIMETABLE);

  const [
    viewTimetable,
    {
      loading: viewTimeTableLoad,
      error: viewTimetableError,
      data: viewTimetableData,
    },
  ] = useLazyQuery(VIEW_ALL_TIMETABLE_USERS);

  useEffect(() => {
    courseAllocation().then(() => {
      setShowTable(true);
    });
    viewTimetable();
  }, []);

  const createTimetableFunc = async (data) => {
    console.log(data, "timedataaaa");
    const timetableResponse = await createTimetable({
      variables: {
        timetable: {
          id: 0,
          startTime: data?.StartTime,
          endTime: data?.EndTime,
          isReOccuring: data?.ReOccuring,
          dayOfTheWeek: data?.DayOfWeek?.Name,
          courseAllocationId: data?.Course?.Id,
          classRequirement: data?.ClassRequirement,
          venue: data?.Venue,
          assignments: data?.Assignment,
        },
      },
    });
    console.log(timetableResponse, "responseee");
    viewTimetable();
  };

  const headers = [
    {
      field: "User",
      header: "User",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Course",
      header: "Course",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "StartTime",
      header: "Start Time",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "EndTime",
      header: "End Time",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "DayOfWeek",
      header: "Day of the Week",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "Venue",
      header: "Venue",
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

  const courseList = courseData?.courseAllocationByUser?.map((item) => {
    return {
      Name: item?.courseAssignment?.course?.name,
      Id: item?.id,
    };
  });

  //   console.log(courseData, "coursedata");

  const dayList = [
    { Name: "Sunday" },
    { Name: "Monday" },
    { Name: "Tuesday" },
    { Name: "Wednesday" },
    { Name: "Thursday" },
    { Name: "Friday" },
    { Name: "Saturday" },
  ];
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const tableRow = viewTimetableData?.viewAllTimeTableUsers?.map(
    (item, index) => {
      return {
        User: item?.user?.fullName,
        Course: item?.courseAssignment?.course?.name,
        StartTime: new Date(item?.startTime).toLocaleString(undefined, options),
        EndTime: new Date(item?.endTime).toLocaleString(undefined, options),
        DayOfWeek: item?.dayOfTheWeek,
        Venue: item?.venue,
      };
    }
  );

  //   console.log(viewTimetableData, "viewww");

  const TableObj = {
    Course: "",
    StartTime: "",
    EndTime: "",
    DayOfWeek: "",
    Id: "",
    Description: "",
    Venue: "",
    ClassDescription: "",
    ClassRequirement: "",
    ReOcurring: "",
    Assignment: "",
    User: "",
  };

  const DropDownObjects = [
    {
      Name: "Course",
      Type: "Dropdown",
      List: courseList,
      Description: "",
      Id: "",
    },

    {
      Name: "StartTime",
      Type: "Time",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "EndTime",
      Type: "Time",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "ReOcurring",
      Type: "Switch",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "DayOfWeek",
      Type: "Dropdown",
      List: dayList,
      Description: "",
      Id: "",
    },

    {
      Name: "ClassDescription",
      Type: "TextArea",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "ClassRequirement",
      Type: "TextArea",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "Venue",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {showTable ? (
            <div className="px-5 py-5">
              <Table
                saveFunc={createTimetableFunc}
                headers={headers}
                generateColumnTemplates={generateColumnTemplates}
                tableName={"Time Table"}
                allowEdit={true}
                allowApply={false}
                tableObjectBody={TableObj}
                showExport={false}
                showAddButton={true}
                variablesForQuery={{}}
                tableContent={tableRow}
                dropDownObjects={DropDownObjects}
                deleteFunc={{}}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
