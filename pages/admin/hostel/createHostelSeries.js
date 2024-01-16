import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Spinner from "@/components/spinner";
import { SAVE_HOSTEL_SERIES } from "@/pages/api/mutations/admin";
import { ALL_HOSTEL_SERIES, ALL_HOSTEL } from "@/pages/api/queries/admin";
import Table from "../../../components/table";

export default function createHostelSeries() {
  const [
    allHostelSeries,
    {
      loading: allHostelSeriesLoad,
      error: allHostelSeriesError,
      data: allHostelSeriesData,
    },
  ] = useLazyQuery(ALL_HOSTEL_SERIES);

  const [
    saveHostelSeries,
    {
      loading: saveHostelSeriesLoad,
      error: saveHostelSeriesError,
      data: saveHostelSeriesData,
    },
  ] = useMutation(SAVE_HOSTEL_SERIES);

  const [
    allHostel,
    { loading: allHostelLoad, error: allHostelError, data: allHostelData },
  ] = useLazyQuery(ALL_HOSTEL);

  const saveHostelSeriesFunc = async (data) => {
    const seriesPayload = await saveHostelSeries({
      variables: {
        name: data?.Name,
        activated: data?.Activated,
        hostelId: data?.HostelName?.Id,
      },
    });
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

  const selectHostel = allHostelData?.allHostels?.map((item) => {
    return {
      Name: item?.name,
      Id: item.id,
    };
  });

  const headers = [
    {
      field: "Name",
      header: " Series Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelName",
      header: "Hostel Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Activated",
      header: "Status",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
  ];

  const TableObj = { Name: "", HostelName: "", Activated: "", Id: "" };
  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "HostelName",
      Type: "Dropdown",
      List: selectHostel,
      Description: "",
      Id: "",
    },
    {
      Name: "Activated",
      Type: "Switch",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  const tableRow = allHostelSeriesData?.allHostelSeries?.map((item, index) => {
    return {
      Name: item?.name,
      HostelName: item?.hostel?.name,
      Id: item?.id,
    };
  });

  useEffect(() => {
    allHostel();
    allHostelSeries();
  }, []);

  if (allHostelSeriesLoad || allHostelLoad) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="card">
        <Table
          saveFunc={saveHostelSeriesFunc}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={"Hostel Series"}
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
