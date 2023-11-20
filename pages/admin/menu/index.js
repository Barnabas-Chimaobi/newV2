import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery, from } from "@apollo/client";
import { ALL_MENU, ALL_MENU_GROUP } from "@/pages/api/queries/admin";
import {
  SAVE_MENU,
  UPDATE_MENU,
  DELETE_MENU,
} from "@/pages/api/mutations/admin";

import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import "primeicons/primeicons.css";
import Spinner from "@/components/spinner";
import Link from "next/link";

export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [
    allMenu,
    { loading: allMenuLoad, error: allMenuError, data: allMenuData },
  ] = useLazyQuery(ALL_MENU);

  // console.log(allMenuData, "menuuuuu");

  const [
    saveMenu,
    { loading: saveMenuLoad, error: saveMenuError, data: saveMenuData },
  ] = useMutation(SAVE_MENU);

  const [
    updateMenu,
    { loading: updateMenuLoad, error: updateMenuError, data: updateMenuData },
  ] = useMutation(UPDATE_MENU);

  const [deleteMenu, { loading: delMenu, error: menuErr, data: menuDel }] =
    useMutation(DELETE_MENU);

  const [
    menuGroup,
    {
      loading: allMenuGroupLoad,
      error: allMenuGroupError,
      data: allMenuGroupData,
    },
  ] = useLazyQuery(ALL_MENU_GROUP);

  const getMenu = async () => {
    setIsLoading(true);
    const menu = await menuGroup();
    // console.log(menu, "data=======");
    setIsLoading(false);
  };

  // console.log(allMenuGroupData, "menuGrouopp");

  useEffect(() => {
    getMenu();
    allMenu();
  }, []);

  const saveMenuFunc = async (data) => {
    try {
      const saveMenuResponse = await saveMenu({
        variables: {
          name: data?.Name,
          action: data?.Action,
          controller: data?.Controller,
          menugroupid: data?.Menugroup?.Id,
          icon: data?.Icon?.Icon,
        },
      });
      allMenu();
      // console.log(saveMenuResponse, "savemenuresponse");
      setShowAddModal(false);
      if (saveMenuResponse?.data?.saveMenu?.id > 0) {
        toast.success("A New Menu has been created");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateMenuFunc = async (data) => {
    console.log(data, "data========updatee");
    try {
      const updateMenuResponse = await updateMenu({
        variables: {
          updateMenuId: data?.Id,
          name: data?.Name,
          action: data?.Action,
          controller: data?.Controller,
          menugroupid: data?.Menugroup?.Id,
          icon: data?.Icon?.Icon,
        },
      });
      allMenu();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteMenuFunc = async (data) => {
    const delResponse = await deleteMenu({
      variables: {
        deleteMenuId: data?.Id,
      },
    });
    allMenu();
  };

  const menuGroupList = allMenuGroupData?.allMenuGroup?.map((item) => {
    return {
      Id: item?.id,
      Name: item?.name,
      Icon: item?.icon,
    };
  });

  // console.log(menuGroupList, "console=======");
  let pathToUseOutside = [];

  const splitPath = (path) => {
    const components = path.split("/");
    const controller = components[1];
    const action = components[2];
    return { action, controller };
  };

  const tableRow = allMenuData?.allMenu?.map((item) => {
    const path = item?.path;
    pathToUseOutside = [...pathToUseOutside, path];
    const { action, controller } = splitPath(path);
    pathToUseOutside = path;
    return {
      Name: item?.name,
      Path: item?.path,
      Icon: item?.icon,
      Id: item?.id,
    };
  });

  console.log(pathToUseOutside, "pathhhhhhh");

  const paths = tableData.map((item) => item?.Path);

  const pathComponents = paths.map((path) => splitPath(path));

  const iconList = [
    { Name: "Home ", Icon: "pi-home" },
    { Name: "File", Icon: "pi-file" },
    { Name: "Folder", Icon: "pi-folder" },
    { Name: "Calendar", Icon: "pi-calendar" },
    { Name: "Inbox", Icon: "pi-inbox" },
    { Name: "Down Arrow", Icon: "pi pi-arrow-down" },
    // Add more icons as needed
  ];

  const TableObj = {
    Name: "",
    Controller: "",
    Action: "",
    Menugroup: "",
    Icon: "",
    Id: "",
  };

  const DropDownObjects = [
    {
      Name: "Name",
      Type: "Text",
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Controller",
      Type: "Text",
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Action",
      Type: "Text",
      List: isNullableType,
      Description: "",
      id: "",
    },
    {
      Name: "Menugroup",
      Type: "Dropdown",
      List: menuGroupList,
      Description: "",
      id: "",
    },
    {
      Name: "Icon",
      Type: "Dropdown",
      List: iconList,
      Description: "",
      id: "",
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
      field: "Path",
      header: "Path",
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

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className=" row">
              <div className="text-right mb-3">
                <Link href="./menu/menuGroup">
                  <button className="btn btn-success">Menu-Group</button>
                </Link>
                <Link href="./menu/menuRole">
                  <button className="btn btn-white border-success text-success ml-3">
                    Menu-Role
                  </button>
                </Link>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card card-table">
                  <div class="card-body">
                    <Table
                      saveFunc={saveMenuFunc}
                      headers={headers}
                      generateColumnTemplates={generateColumnTemplates}
                      tableName={"Menu"}
                      allowEdit={true}
                      allowApply={false}
                      tableObjectBody={TableObj}
                      showExport={true}
                      showAddButton={true}
                      variablesForQuery={{}}
                      tableContent={tableRow}
                      dropDownObjects={DropDownObjects}
                      editFunc={updateMenuFunc}
                      deleteFunc={deleteMenuFunc}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
