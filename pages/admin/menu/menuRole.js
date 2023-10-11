import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
// import Table from "../../../src/app/components/table";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import "primeicons/primeicons.css";
import Spinner from "../../../components/spinner";
import Link from "next/link";
// import { SAVE_MENU_IN_ROLE } from "../../../api/mutations/admin";
// import {
//   MENUROLE_BY_ROLEID,
//   ALL_MENU,
//   ALL_ROLE,
// } from "../../../api/queries/admin";
import { SAVE_MENU_IN_ROLE } from "@/pages/api/mutations/admin";
import {
  ALL_MENU,
  ALL_ROLE,
  MENUROLE_BY_ROLEID,
} from "@/pages/api/queries/admin";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function menuRole() {
  const [role, setRole] = useState("");
  const [showTable, setShowTable] = useState(false);

  const {
    loading: allRoleLoad,
    error: allRoleError,
    data: allRoleData,
  } = useQuery(ALL_ROLE);

  const [
    saveMenuRole,
    {
      loading: saveMenuRoleLoad,
      error: saveMenuRoleError,
      data: saveMenuRoleData,
    },
  ] = useMutation(SAVE_MENU_IN_ROLE);

  const {
    loading: allMenuLoad,
    error: allMenuError,
    data: allMenuData,
  } = useQuery(ALL_MENU);

  const [
    menuRoleByRoleIdQ,
    {
      loading: menuRoleByRoleIdLoad,
      error: menuRoleByRoleIdError,
      data: menuRoleByRoleIdData,
    },
  ] = useLazyQuery(MENUROLE_BY_ROLEID);

  console.log(menuRoleByRoleIdData, "menuDataaaaaaa");

  const menuList = allMenuData?.allMenu?.map((item) => {
    return {
      Id: item?.id,
      Name: item?.name,
    };
  });

  const roleList = allRoleData?.allRole?.map((item) => {
    return {
      Id: item?.roleId,
      Name: item?.roleName,
    };
  });

  const roleArr = [{ Name: "admin" }, { Name: "Student" }];

  const TableObj = {
    Menu: "",
    Role: "",
    Id: "",
  };

  const DropDownObjects = [
    {
      Name: "Menu",
      Type: "Dropdown",
      List: menuList,
      Description: "",
      Id: "",
    },
    {
      Name: "Role",
      Type: "Dropdown",
      List: roleList,
      Description: "",
      Id: "",
    },
  ];

  const headers = [
    {
      field: "Menu",
      header: "Menu",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Role",
      header: "Role",
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

  const tableRow = menuRoleByRoleIdData?.menuRolebyRoleId?.map((item) => {
    console.log(item, "itemmmm");
    return {
      Menu: item?.menu?.name,
      Role: item?.role?.roleName,
    };
  });

  const saveMenuRoleFunc = async (data) => {
    try {
      const menuRolePayload = await saveMenuRole({
        variables: {
          menuid: data?.Menu?.Id,
          roleid: data?.Role?.Id,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const menuRoleByRoleIdFunc = async () => {
    try {
      const funcResponse = await menuRoleByRoleIdQ({
        variables: {
          roleid: role?.Id,
        },
      });
      console.log(role, "roleeee");
      setShowTable(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="card">
              <div className="p-5">
                <Link href="./">
                  <Button
                    label="Back"
                    // icon="pi-arrow-left"
                    className="btn btn-outline-primary "
                  />
                </Link>
              </div>
            </div>
            <div className="card card-table">
              <div className="flex p-3">
                <div>
                  <label>Select Role</label>
                  <Dropdown
                    value={role}
                    options={roleList}
                    placeholder="select Role"
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
                <div className="mt-5 ml-3">
                  <button
                    className="btn btn-success"
                    onClick={() => menuRoleByRoleIdFunc()}
                  >
                    View
                  </button>
                </div>
              </div>
              {showTable ? (
                <div class="card-body">
                  <Table
                    saveFunc={saveMenuRoleFunc}
                    headers={headers}
                    generateColumnTemplates={generateColumnTemplates}
                    tableName={"Menu Role"}
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
        </div>
      </div>
    </div>
  );
}
