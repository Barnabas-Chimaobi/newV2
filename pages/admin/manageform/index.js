import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import {
  SAVE_DYNAMIC_FORM_SETUP,
  SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
} from "../../../pages/api/mutations/adminMutation";
import {
  ALL_PROGRAMME,
  GET_ALL_SESSION,
  GET_ALL_PAGES,
  GET_ALL_SET_UP_DONE,
  PREVIEW,
} from "../../../pages/api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Table from "../../../components/table";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";
import {
  ACTIVATE_FORM,
  DELETE_FORM,
  COPY_FORM,
} from "../../../pages/api/mutations/adminMutation";

export default function ManageForm() {
  const [
    activateForm,
    { loading: formLoading, error: errors, data: formData },
  ] = useMutation(ACTIVATE_FORM);
  const [
    deleteForm,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_FORM);

  const [
    copyForm,
    { loading: copyFormLoad, error: copyFormError, data: copyFormData },
  ] = useMutation(COPY_FORM);
  const [programme, setprogramme] = useState("");
  const [availableForms, setavailableForms] = useState("");
  const [isLoading, setisLoading] = useState(true);
  let [fieldname, setfieldname] = useState("");
  let [field_type, setfieldtype] = useState("");
  let [field_label, setfieldlabel] = useState("");
  let [section, setSection] = useState("");
  let [sessions, setSession] = useState("");
  let [programmes, setProgramme] = useState("");
  let [programmeId, setProgrammeId] = useState(0);
  let [sessionId, setSessionId] = useState(0);
  let [formList, setFormList] = useState([]);
  let [completeFormList, setCompleteFormList] = useState({});
  let [error, setError] = useState("");
  let [errorModal, setErrorModal] = useState(false);
  let [showSucess, setShowSuccess] = useState(false);
  let [formLists, setFormLists] = useState([]);

  const [
    setupForm,
    { loading: setupLoading, error: setupError, data: setupData },
  ] = useMutation(SAVE_DYNAMIC_PROGRAMME_AND_SESSION);
  const [tabArr, setTabArr] = useState([]);
  let [tabName, setTabName] = useState("");
  const [stepone, setStepone] = useState(false);
  const [steptwo, setSteptwo] = useState(false);
  const [load, setload] = useState(false);
  const [showInfo, setShowInfo] = useState();
  const stepsView = () => setStepone((prev) => !prev);

  const [
    session,
    { loading: sessionLoading, error: sessionError, data: sessionList },
  ] = useLazyQuery(GET_ALL_SESSION);

  const [
    programmeL,
    { loading: programmeLoading, error: programmeError, data: programmeList },
  ] = useLazyQuery(ALL_PROGRAMME);
  console.log(programmeList, "programmeList");

  const [
    allSetupDone,
    {
      loading: allSetupDoneLoading,
      error: allSetupDoneError,
      data: allSetupDoneList,
    },
  ] = useLazyQuery(GET_ALL_SET_UP_DONE);

  const [
    lazyLoadPreview,
    { loading: previewLoad, error: previewError, data: previewData },
  ] = useLazyQuery(PREVIEW);

  //   console.log(allSetupDoneList, "all setup done ");

  const TableObjprosession = {
    programmeName: "",
    programmeId: "",
    sessionId: "",
    sessionName: "",
    stepOne: "",
    stepThree: "",
    stepTwo: "",
    active: "",
    Id: "",
  };
  const headers = [
    {
      field: "programmeName",
      header: "Programme",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "programmeId",
      header: "programmeId",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "sessionId",
      header: "sessionId",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "sessionName",
      header: "Session",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "stepOne",
      header: "Step One",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "stepTwo",
      header: "Step Two",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "stepThree",
      header: "Step Three",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "active",
      header: "Active",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white" },
    },
    {
      field: "Id",
      header: "Id",
      sortable: true,
      style: { minWidth: "16rem", backgroundColor: "white", display: "none" },
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

  const selectSession = sessionList?.allSession?.map((item) => {
    return {
      Id: item,
      Name: item.name,
    };
  });

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Id: item,
      Name: item.name,
    };
  });

  const DropDownObjectsprosession = [
    {
      Name: "sessionName",
      Type: "Dropdown",
      List: selectSession,
      Description: "",
      id: "",
    },
    {
      Name: "programmeName",
      Type: "Dropdown",
      List: selectProgramme,
      Description: "",
      id: "",
    },
    // {
    //   Name: "active",
    //   Type: "Switch",
    //   List: null,
    //   Description: "",
    //   id: "",
    // },
  ];

  const LoadData = async () => {
    setisLoading(true);
    const data = await allSetupDone();

    const tableRow = data?.data?.allSetUpDone?.map((item) => {
      return {
        programmeName: item?.programmeName,
        programmeId: item?.programmeId,
        sessionId: item?.sessionId,
        sessionName: item?.sessionName,
        stepOne: item?.stepOne,
        stepThree: item?.stepThree,
        stepTwo: item?.stepTwo,
        active: item?.active,
        Id: item?.id,
      };
    });
    setavailableForms(tableRow);
    // console.log(data?.data?.allSetUpDone, "data from useeffect");
    const sessionDataFromB = await session();
    setSession(
      sessionDataFromB?.data?.allSession?.map((item) => {
        return { Id: item?.id, Name: item?.name };
      })
    );
    const programmeD = await programmeL();
    setprogramme(
      programmeD?.data?.allProgramme?.map((item) => {
        return { Id: item?.id, Name: item?.name };
      })
    );
    // console.log(sessionDataFromB, programmeD, "Drop down Values");
    setisLoading(false);
  };

  const saveApplyForm = async (data, data2) => {
    console.log(
      {
        sessionid: data?.sessionName?.Id?.id,
        programmeid: data?.programmeId?.Id?.id,
        programmesessionid: data2?.Id,
      },
      "dataapply"
    );
    const applyPayload = await copyForm({
      variables: {
        sessionid: data?.sessionName?.Id?.id,
        programmeid: data?.programmeName?.Id?.id,
        programmesessionid: data2?.Id,
      },
    });
  };

  const activeForm = async (x) => {
    console.log(
      {
        id: parseInt(x.Id),
        programmeid: parseInt(x.programmeId),
        toggle: x.active == true ? false : true,
      },
      "console===sss===="
    );
    try {
      const active = await activateForm({
        variables: {
          id: parseInt(x.Id),
          programmeid: parseInt(x.programmeId),
          toggle: x.active == true ? false : true,
        },
      });
      console.log(active, "errr======");
      window.location.reload();
    } catch (err) {
      console.log(err, "errr======");
      // toast.error(err.message);
    }
  };

  const deleteEachForm = async (id) => {
    try {
      console.log(id.Id, "idddd====");
      const deletes = await deleteForm({ variables: { formid: id.Id } });
      window.location.reload();
      // handlePreview()
    } catch (err) {
      // toast.error(err.message);
    }
  };

  const applyFormFunc = useEffect(() => {
    LoadData();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card card-table">
                <div class="card-body">
                  <h4>Setup Forms</h4>

                  {/* <div className="form-group mb-0 mt-3  row">
										<div className="col-md-10">
											<div className="input-group">
												<Dropdown
													placeholder="select Programme"
													className="w-full md:w-10.5rem lg:w-16rem"
													optionLabel="Name"
												/>
												<button className="btn btn-primary" type="button">
													View Forms
												</button>
											</div>
										</div>
									</div> */}
                </div>
              </div>
              <div class="card card-table">
                <div class="card-body">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Table
                      allowPreview={true}
                      saveFunc={saveApplyForm}
                      headers={headers}
                      generateColumnTemplates={generateColumnTemplates}
                      tableName={"All Setup Done"}
                      allowEdit={true}
                      allowApply={false}
                      tableObjectBody={TableObjprosession}
                      showExport={true}
                      showAddButton={false}
                      variablesForQuery={{}}
                      tableContent={availableForms}
                      dropDownObjects={DropDownObjectsprosession}
                      editFunc={activeForm}
                      deleteFunc={deleteEachForm}
                      showCheckBox={false}
                      showManageButton={false}
                      showOnlyDeleteButton={false}
                      showAddPages={true}
                      applyForm={{}}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
