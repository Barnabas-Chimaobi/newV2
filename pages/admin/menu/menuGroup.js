import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import "primeicons/primeicons.css";
import Spinner from "../../../components/spinner";
import Link from "next/link";
import { ALL_MENU_GROUP } from "@/pages/api/queries/admin";
import {
  SAVE_MENU_GROUP,
  DELETE_MENU_GROUP,
} from "@/pages/api/mutations/admin";

export default function menuGroup() {
  const [
    allmenuGroup,
    {
      loading: allMenuGroupLoad,
      error: allMenuGroupError,
      data: allMenuGroupData,
    },
  ] = useLazyQuery(ALL_MENU_GROUP);
  const [
    saveMenuGroup,
    {
      loading: saveMenuGroupLoad,
      error: saveMenuGroupError,
      data: saveMenuGroupData,
    },
  ] = useMutation(SAVE_MENU_GROUP);
  const [
    deleteMenuGroup,
    {
      loading: deleteMenuGroupLoad,
      error: deleteMenuGroupError,
      data: deleteMenuGroupData,
    },
  ] = useMutation(DELETE_MENU_GROUP);

  useEffect(() => {
    allmenuGroup();
  }, []);

  const TableObj = {
    Name: "",
    Icon: "",
    Id: "",
  };

  const iconList = [
    { Name: "Home ", Icon: "pi-home" },
    { Name: "File", Icon: "pi-file" },
    { Name: "Folder", Icon: "pi-folder" },
    { Name: "Calendar", Icon: "pi-calendar" },
    { Name: "Inbox", Icon: "pi-inbox" },
    { Name: "Down Arrow", Icon: "pi pi-arrow-down" },
    { Name: "User", Icon: "pi-user" },
    // Add more icons as needed
  ];

  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "Icon",
      Type: "Dropdown",
      List: iconList,
      Description: "",
      Id: "",
    },
  ];

  const headers = [
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Icon",
      header: "Icon",
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

  const tableRow = allMenuGroupData?.allMenuGroup?.map((item) => {
    console.log(item, "itemmmm");
    return {
      Name: item?.name,
      Icon: item?.icon,
    };
  });

  const saveMenuGroupFunc = async (data) => {
    try {
      const menuGroupData = await saveMenuGroup({
        variables: {
          name: data?.Name,
          icon: data?.Icon?.Icon,
        },
      });
      allmenuGroup();
      // console.log(menuGroupData, "menuuuuuu");
      if (menuGroupData?.data?.saveMenuGroup?.id > 0) {
        toast.success("A New Menu Group has been Sucessfully added");

        setName("");
      } else {
        toast.error("An Error Ocuured");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div class="card-body">
              <Table
                saveFunc={saveMenuGroupFunc}
                headers={headers}
                generateColumnTemplates={generateColumnTemplates}
                tableName={"Menu Group"}
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
        </div>
      </div>
    </div>
  );
}
