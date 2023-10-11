import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { Dropdown } from "primereact/dropdown";
import {
  GET_ALL_SESSION,
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
  ALL_FEE_TYPE,
  ALL_PAYMENT_MODE,
  ALL_PAID_INVOICE_REPORT_FILTER,
} from "@/pages/api/queries/admin";

export default function paymentReport() {
  const [programme, setProgramme] = useState("");
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [semester, setSemester] = useState("");
  const [courseAssignObj, setCourseAssignObj] = useState({});
  const [feeType, setFeeType] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const [
    paidInvoiceFilter,
    {
      loading: paidInvoiceLoad,
      error: paidInvoiceError,
      data: paidInvoiceData,
    },
  ] = useLazyQuery(ALL_PAID_INVOICE_REPORT_FILTER);

  const {
    loading: loadingProgramme,
    error: error,
    data: programmeList,
  } = useQuery(ALL_PROGRAMME);

  const {
    loading: sessionLoading,
    error: Error,
    data: sessionData,
  } = useQuery(GET_ALL_SESSION);

  const {
    loading: departmentLoading,
    error: eRror,
    data: departmentData,
  } = useQuery(ALL_DEPARTMENT);

  const {
    loading: typeLoad,
    error: typeError,
    data: typeData,
  } = useQuery(ALL_FEE_TYPE);

  const {
    loading: paymentModeLoad,
    error: paymentModeError,
    data: paymentModeData,
  } = useQuery(ALL_PAYMENT_MODE);

  const headers = [
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "FeeType",
      header: "Fee Type",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Session",
      header: " Session",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "InvoiceNumber",
      header: "Invoice Number",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "ConfirmationOrderNo",
      header: " Confirmation Order No",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Amount",
      header: " Amount",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
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

  const tableRow = paidInvoiceData?.allPaidInvoiceReportFilter?.map(
    (item, index) => {
      return {
        Name: item?.fullName,
        FeeType: item?.feeDetail?.feeType?.name,
        Session: item?.session?.name,
        InvoiceNumber: item?.invoiceNumber,
        ConfirmationOrderNo: item?.invoiceNumber,
        Amount: item?.total,
      };
    }
  );

  const TableObj = {
    Name: "",
    Id: "",
    FeeType: "",
    Session: "",
    InvoiceNumber: "",
    ConfirmationOrderNo: "",
    Amount: "",
  };

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

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

  const feeTypeList = typeData?.allFeeType?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const paymentModeList = paymentModeData?.allPaymentMode?.map((item) => {
    return {
      Name: item.payment_Mode_Name,
      Id: item.id,
    };
  });

  const paidInvoiceFunc = async () => {
    const history = await paidInvoiceFilter({
      variables: {
        sessionid: session?.Id,
        feetypeid: feeType?.Id,
        paymentmode: paymentMode?.Id,
        programmeid: programme?.Id,
        departmentid: department?.Id,
      },
    });
    console.log(history, "history");
    if (history?.data?.allPaidInvoiceReportFilter?.length > 0) {
      setShowTable(true);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card p-5">
            <h3>Payment Report</h3>
          </div>
          <div className="card">
            <div className="row p-5">
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Session <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={session}
                    options={sessionList}
                    placeholder="select Session"
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Programme <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={programme}
                    options={selectProgramme}
                    placeholder="select Programme"
                    onChange={(e) => setProgramme(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Fee Type <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={feeType}
                    options={feeTypeList}
                    placeholder="select Fee Type"
                    onChange={(e) => setFeeType(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group local-forms">
                  <label>
                    Department <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={department}
                    options={departmentList}
                    placeholder="select Department"
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="local-forms form-group">
                  <label>
                    Payment Mode
                    <span className="login-danger">*</span>
                  </label>
                  <Dropdown
                    value={paymentMode}
                    options={paymentModeList}
                    placeholder="select Payment Mode"
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full md:w-21.5rem"
                    optionLabel="Name"
                  />
                </div>
              </div>

              <div className=" col-lg-4 col-sm-12">
                <div className="local-forms form-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => paidInvoiceFunc()}
                  >
                    View Report
                  </button>
                </div>
              </div>
            </div>
            {showTable ? (
              <div className="px-5">
                <Table
                  saveFunc={{}}
                  headers={headers}
                  generateColumnTemplates={generateColumnTemplates}
                  tableName={"Payment Report"}
                  allowEdit={true}
                  allowApply={false}
                  tableObjectBody={TableObj}
                  showExport={true}
                  showAddButton={false}
                  variablesForQuery={{}}
                  tableContent={tableRow}
                  dropDownObjects={[]}
                  editFunc={{}}
                  deleteFunc={{}}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
