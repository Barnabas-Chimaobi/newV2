import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Dropdown } from "primereact/dropdown";
import Table from "../../../components/table";
import { isNullableType } from "graphql";
import { Column } from "primereact/column";
import {
  ALL_PROGRAMME,
  ALL_DEPARTMENT,
  ALL_LEVEL,
  VIEW_ALL_NOTIFICATIONS,
} from "@/pages/api/queries/admin";
import {
  CREATE_NOTIFICATIONS,
  DISABLE_NOTIFICATION,
} from "@/pages/api/mutations/admin";

export default function index() {
  const [showTable, setShowTable] = useState(false);

  const headers = [
    {
      field: "User",
      header: "User",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Title",
      header: "Title",
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
      field: "Description",
      header: "Description",
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

  const [
    createNotifications,
    {
      loading: notificationLoad,
      error: notificatioError,
      data: notificatioData,
    },
  ] = useMutation(CREATE_NOTIFICATIONS);

  const [
    disableNotification,
    { loading: disableLoad, error: disableError, data: disableData },
  ] = useMutation(DISABLE_NOTIFICATION);

  const [
    viewAllNotifications,
    {
      loading: viewAllNotificationLoad,
      error: viewAllNotificationError,
      data: viewAllNotificationData,
    },
  ] = useLazyQuery(VIEW_ALL_NOTIFICATIONS);

  console.log(viewAllNotificationData, "viewnotiiiiiii");

  const [
    allProgramme,
    { loading: loadingProgramme, error: error, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);

  const runFunction = async () => {
    await allProgramme();
    await allDepartment();
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const createNotificationsFunc = async (data) => {
    try {
      console.log(data, "dataaaaaa");
      const payloadNotifications = await createNotifications({
        variables: {
          notification: {
            title: data?.Title,
            description: data?.Description,
            isReOccuring: data?.ReOcurring,
            startTime: data?.StartTime,
            endTime: data?.EndTime,
            all: data?.ApplyForAllStudents,
            programmeId: data?.Programme?.Id,
            departmentId: data?.Department?.Id,
            levelId: 0,
          },
        },
      });
      console.log(payloadNotifications, "ResponseFromSave");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const disableNotificationFunc = async (data) => {
    const disableresponse = await disableNotification({
      variables: {
        disableNotificationId: data?.Id,
      },
    });
  };

  const [
    allDepartment,
    { loading: departmentLoading, error: eRror, data: departmentData },
  ] = useLazyQuery(ALL_DEPARTMENT);

  const {
    loading: levelLoad,
    error: levelError,
    data: levelData,
  } = useQuery(ALL_LEVEL);

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const departmentList = departmentData?.allDepartment?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const levelList = levelData?.allLevel?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  useEffect(() => {
    viewAllNotifications();
    runFunction().then(() => {
      setShowTable(true);
    });
  }, []);

  const tableRow = viewAllNotificationData?.viewAllNotifications?.map(
    (item, index) => {
      return {
        User: item?.user?.full,
        Title: item?.title,
        Description: item?.description,
        StartTime: new Date(item?.startTime).toLocaleString(undefined, options),
        EndTime: new Date(item?.endTime).toLocaleString(undefined, options),
      };
    }
  );

  const TableObj = {
    Title: "",
    Description: "",
    StartTime: "",
    EndTime: "",
    ReOcurring: "",
    Programme: "",
    Department: "",
    Level: "",
    User: "",
    Id: "",
    ApplyForAllStudents: "",
  };

  const DropDownObjects = [
    {
      Name: "Title",
      Type: "Text",
      List: isNullableType,
      Description: "",
      Id: "",
    },

    {
      Name: "Description",
      Type: "TextArea",
      List: isNullableType,
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
      Name: "Programme",
      Type: "Dropdown",
      List: selectProgramme,
      Description: "",
      Id: "",
    },
    {
      Name: "Department",
      Type: "Dropdown",
      List: departmentList,
      Description: "",
      Id: "",
    },
    {
      Name: "ApplyForAllStudents",
      Type: "Switch",
      List: isNullableType,
      Description: "",
      Id: "",
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            {showTable ? (
              <div className="px-5">
                <Table
                  saveFunc={createNotificationsFunc}
                  headers={headers}
                  generateColumnTemplates={generateColumnTemplates}
                  tableName={"Notifications"}
                  allowEdit={true}
                  allowApply={false}
                  tableObjectBody={TableObj}
                  showExport={true}
                  showAddButton={true}
                  variablesForQuery={{}}
                  tableContent={tableRow}
                  dropDownObjects={DropDownObjects}
                  editFunc={{}}
                  deleteFunc={disableNotificationFunc}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
