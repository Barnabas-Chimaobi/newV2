import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { VIEWALLTIMETABLESTUDENTS } from "@/pages/api/queries/admin";

export default function index() {
  const [
    viewTimetable,
    { loading: timetableLoad, error: timetableError, data: timetableData },
  ] = useLazyQuery(VIEWALLTIMETABLESTUDENTS);

  useEffect(() => {
    viewTimetable();
  }, []);
  const headers = [
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

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const tableRow = timetableData?.viewAllTimeTableStudents?.map(
    (item, index) => {
      return {
        Course: item?.courseAssignment?.course?.name,
        StartTime: new Date(item?.startTime).toLocaleString(undefined, options),
        EndTime: new Date(item?.endTime).toLocaleString(undefined, options),
        DayOfWeek: item?.dayOfTheWeek,
        Venue: item?.venue,
      };
    }
  );
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="px-5 py-5">
            <Table
              saveFunc={{}}
              headers={headers}
              generateColumnTemplates={generateColumnTemplates}
              tableName={"Time Table"}
              allowEdit={false}
              allowApply={false}
              tableObjectBody={TableObj}
              showExport={false}
              showAddButton={false}
              variablesForQuery={{}}
              tableContent={tableRow}
              dropDownObjects={[]}
              editFunc={{}}
              deleteFunc={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
