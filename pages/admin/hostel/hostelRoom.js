import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import Spinner from "@/components/spinner";
import {
  ALL_HOSTEL_ROOMS,
  ALL_HOSTEL_SERIES,
  ALL_HOSTEL,
} from "@/pages/api/queries/admin";
import { SAVE_HOSTEL_ROOMS } from "@/pages/api/mutations/admin";

export default function hostelRoom() {
  const [
    allHostelRooms,
    {
      loading: allHostelRoomsLoad,
      error: allHostelRoomsError,
      data: allHostelRoomsData,
    },
  ] = useLazyQuery(ALL_HOSTEL_ROOMS);
  const [
    allHostelSeries,
    {
      loading: allHostelSeriesLoad,
      error: allHostelSeriesError,
      data: allHostelSeriesData,
    },
  ] = useLazyQuery(ALL_HOSTEL_SERIES);

  const [
    saveHostelRoooms,
    {
      loading: saveHostelRooomsLoad,
      error: saveHostelRooomsError,
      data: saveHostelRooomsData,
    },
  ] = useMutation(SAVE_HOSTEL_ROOMS);

  const saveHostelRooomsFunc = async (data) => {
    const saveHostelPayload = await saveHostelRoooms({
      variables: {
        editAll: data,
        cornerId: data,
        hostelId: data,
        levelId: data,
        roomId: data,
        seriesId: data,
        programmeId: data,
        // departmentId:
      },
    });
  };

  const [
    allHostel,
    { loading: allHostelLoad, error: allHostelError, data: allHostelData },
  ] = useLazyQuery(ALL_HOSTEL);

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

  const headers = [
    {
      field: "RoomNumber",
      header: "Room Number",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Series",
      header: "Hostel Description",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Hostel",
      header: "Hostel",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
  ];

  const selectSeries = allHostelSeriesData?.allHostelSeries?.map((item) => {
    return {
      Name: item?.name,
      Id: item.id,
    };
  });

  const selectHostel = allHostelData?.allHostels?.map((item) => {
    return {
      Name: item?.name,
      Id: item.id,
    };
  });

  const TableObj = { HostelType: "", HostelDescription: "", Id: "" };
  const DropDownObjects = [
    {
      Name: "RoomNumber",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "Series",
      Type: "Dropdown",
      List: selectSeries,
      Description: "",
      Id: "",
    },
    {
      Name: "Hostel",
      Type: "Dropdown",
      List: selectHostel,
      Description: "",
      Id: "",
    },
  ];

  const tableRow = allHostelRoomsData?.allHostelRooms?.map((item, index) => {
    return {
      RoomNumber: item?.number,
      Series: item?.series?.name,
      Hostel: item?.hostel?.name,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allHostelRooms();
  }, []);

  if (allHostelSeriesLoad || allHostelLoad || allHostelRoomsLoad) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="card">
        <Table
          saveFunc={null}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={" Hostel Rooms"}
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
    </div>
  );
}
