import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { SAVE_HOSTEL } from "@/pages/api/mutations/admin";
import { ALL_HOSTEL, ALL_HOSTEL_TYPES } from "@/pages/api/queries/admin";
import Spinner from "@/components/spinner";

export default function createHostel() {
  const [showTable, setShowTable] = useState(false);

  const [
    allHostel,
    { loading: allHostelLoad, error: allHostelError, data: allHostelData },
  ] = useLazyQuery(ALL_HOSTEL);
  const [
    saveHostel,
    { loading: saveHostelLoad, error: saveHostelError, data: saveHostelData },
  ] = useMutation(SAVE_HOSTEL);
  const [
    allHostelTypes,
    {
      loading: allHostelTypeLoad,
      error: allHostelTypeError,
      data: allHostelTypeData,
    },
  ] = useLazyQuery(ALL_HOSTEL_TYPES);

  const saveHostelFunc = async (data) => {
    try {
      const saveHostelPayload = await saveHostel({
        variables: {
          name: data?.HostelName,
          description: data?.HostelDescription,
          capacity: data?.HostelCapacity,
          hostelTypeId: data?.HostelType?.Id,
          activated: data?.HostelStatus,
        },
      });
      toast.success("New Hostel added");
      allHostel();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const headers = [
    {
      field: "HostelName",
      header: " Hostel Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelType",
      header: "Hostel Type",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelCapacity",
      header: "Hostel Capacity",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelDescription",
      header: "Hostel Description",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "HostelStatus",
      header: "Hostel Status",
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
    HostelName: "",
    HostelType: "",
    HostelCapacity: "",
    HostelDescription: "",
    HostelStatus: "",
    Id: "",
  };

  const selectHostelType = allHostelTypeData?.allHostelTypes?.map((item) => {
    return {
      Name: item.hostel_Type_Name,
      Id: item.id,
    };
  });

  const DropDownObjects = [
    {
      Name: "HostelName",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "HostelType",
      Type: "Dropdown",
      List: selectHostelType,
      Description: "",
      Id: "",
    },
    {
      Name: "HostelCapacity",
      Type: "Number",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "HostelDescription",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "HostelStatus",
      Type: "Switch",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];
  const tableRow = allHostelData?.allHostels?.map((item, index) => {
    return {
      HostelName: item?.name,
      HostelType: item?.hostelType?.hostel_Type_Name,
      HostelCapacity: item?.capacity,
      HostelDescription: item?.description,
      Id: item?.id,
      HostelStatus: item?.activated,
    };
  });

  useEffect(() => {
    allHostel();
    allHostelTypes();
  }, []);

  if (allHostelTypeLoad || allHostelLoad) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <Table
          saveFunc={saveHostelFunc}
          headers={headers}
          generateColumnTemplates={generateColumnTemplates}
          tableName={"Create Hostel"}
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
