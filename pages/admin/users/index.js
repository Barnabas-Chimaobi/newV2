import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
// import Table from "../../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { SAVE_USER } from "@/pages/api/mutations/admin";
import { ALL_ROLE, ALL_USER } from "@/pages/api/queries/admin";

export default function index() {
  const [showTable, setShowTable] = useState(false);

  const [
    saveUser,
    { loading: saveUserLoad, error: saveUserError, data: saveUserData },
  ] = useMutation(SAVE_USER);

  const [
    allUser,
    { loading: allUserLoad, error: allUserError, data: allUserData },
  ] = useLazyQuery(ALL_USER);

  const [
    allRole,
    { loading: allRoleLoad, error: allRoleError, data: allRoleData },
  ] = useLazyQuery(ALL_ROLE);

  const roleList = allRoleData?.allRole?.map((item) => {
    return {
      Id: item?.roleId,
      Name: item?.roleName,
    };
  });

  const saveUserFunc = async (data) => {
    const saveResponse = await saveUser({
      variables: {
        newUserDto: {
          userid: null,
          username: data?.Username,
          email: data?.Email,
          fullname: data?.Fullname,
          password: data?.Password,
          roleid: data?.Role?.Id,
        },
      },
    });
    allUser();
  };

  const TableObj = {
    Fullname: "",
    Email: "",
    Username: "",

    Role: "",
    UserId: "",

    Password: "",
    Id: "",
  };

  const DropDownObjects = [
    {
      Name: "Fullname",
      Type: "Text",
      List: isNullableType,
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
    {
      Name: "Email",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "Username",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
    {
      Name: "Password",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  const headers = [
    {
      field: "Username",
      header: "Username",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },

    {
      field: "Fullname",
      header: "Fullname",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Email",
      header: "Email",
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

  const tableRow = allUserData?.allUser?.map((item) => {
    console.log(item, "itemmmm");
    return {
      Username: item?.userName,
      Fullname: item?.fullName,
      Email: item?.email,
    };
  });

  useEffect(() => {
    allRole().then(() => {
      setShowTable(true);
    });
    allUser();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card card-table">
                <div class="card-body">
                  {showTable ? (
                    <div className="px-5">
                      <Table
                        saveFunc={saveUserFunc}
                        headers={headers}
                        generateColumnTemplates={generateColumnTemplates}
                        tableName={"Users"}
                        allowEdit={true}
                        allowApply={false}
                        tableObjectBody={TableObj}
                        showExport={false}
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
      </div>
    </div>
  );
}
