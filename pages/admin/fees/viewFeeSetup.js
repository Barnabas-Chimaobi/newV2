import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Table from "../../../components/table";
import {
  ALL_FEE_DETAILS_SETUP_DETAILS_BY_SESSION_AND_FEE_TYPE,
  ALL_FEE_TYPE,
  GET_ALL_SESSION,
} from "@/pages/api/queries/admin";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

export default function viewFeeSetup() {
  const [showTable, setShowTable] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const [feeType, setFeeType] = useState("");
  const [session, setSession] = useState("");

  const [
    feeDetailsSetup,
    {
      loading: feeDetailsSetupLoading,
      error: feeDetailsSetupError,
      data: feeDetailsSetupData,
    },
  ] = useLazyQuery(ALL_FEE_DETAILS_SETUP_DETAILS_BY_SESSION_AND_FEE_TYPE);

  const {
    loading: sessionLoading,
    error: Error,
    data: sessionData,
  } = useQuery(GET_ALL_SESSION);

  const {
    loading: typeLoad,
    error: typeError,
    data: typeData,
  } = useQuery(ALL_FEE_TYPE);
  console.log(feeType, "feetype");
  const feeSetupBySessionFeeType = async () => {
    try {
      if (feeType == "" || session == "") {
        toast.error("Please select fee type and session");
      } else {
        const setupDetails = await feeDetailsSetup({
          variables: {
            feetypeId: feeType?.Id,
            sessionId: session?.Id,
          },
        });
        setShowTable(true);
        setFeesData(
          setupDetails.data?.allFeeDetailsSetupDetailsBySessionAndFeeType
        );
        console.log(
          setupDetails.data?.allFeeDetailsSetupDetailsBySessionAndFeeType,
          "seeeeeeeeeeeeeeeeeee$$"
        );
        if (
          setupDetails.data?.allFeeDetailsSetupDetailsBySessionAndFeeType
            ?.length == 0
        ) {
          toast.error("No fee has been set up for this session");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const feeTypeList = typeData?.allFeeType?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  useEffect(() => {}, []);

  const headers = [
    {
      field: "SetUpName",
      header: "Fee Setup",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Amount",
      header: "Amount",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },

    // Add more headers as needed
  ];

  const TableObj = { SetUpName: "", Amount: "", Id: "" };

  const tableRow =
    feeDetailsSetupData?.allFeeDetailsSetupDetailsBySessionAndFeeType?.map(
      (item) => {
        return {
          SetUpName: item?.name,
          Amount: item?.amount,
          Id: item?.id,
        };
      }
    );

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
      <div>
        <div>
          <div class="row">
            <div class="col-sm-12">
              <div className="card">
                <div className="card-body">
                  {/* <form> */}
                  <div className="row">
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
                          Fee Type <span className="login-danger">*</span>
                        </label>
                        <Dropdown
                          value={feeType}
                          options={feeTypeList}
                          placeholder="select Programme"
                          onChange={(e) => setFeeType(e.target.value)}
                          className="w-full md:w-21.5rem"
                          optionLabel="Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => feeSetupBySessionFeeType()}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                {/* </form> */}
              </div>
              <div class="card card-table">
                {showTable ? (
                  <div class="card-body">
                    <Table
                      saveFunc={null}
                      headers={headers}
                      generateColumnTemplates={generateColumnTemplates}
                      tableName={"Fee Set Up"}
                      allowEdit={true}
                      allowApply={false}
                      tableObjectBody={TableObj}
                      showExport={false}
                      showAddButton={false}
                      variablesForQuery={{}}
                      tableContent={tableRow}
                      dropDownObjects={null}
                      editFunc={null}
                      deleteFunc={null}
                      showCheckBox={false}
                      showManageButton={false}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
