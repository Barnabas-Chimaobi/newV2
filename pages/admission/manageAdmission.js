import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Dropdown } from "primereact/dropdown";
import Table from "../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { FileUpload } from "primereact/fileupload";
import {
  ADMISSION_LIST_DTO_NAMES,
  ADMITTED_APPLICANT,
} from "../api/mutations/admin";
import * as XLSX from "xlsx";
import {
  GET_ALL_SESSION,
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
  ALL_ADMISSION_BATCH,
  UNADMITTED_APPLICANTS,
} from "../api/queries/admin";

export default function manageAdmission() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setFiles] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [sessionName, setSession] = useState("");
  const [programmeName, setProgramme] = useState("");
  const [departmentName, setDepartment] = useState("");
  const [admissionBatch, setAdmissionBatch] = useState("");
  const [admissionListArr, setAdmissionListArr] = useState([]);
  const [showTable, setShowTable] = useState(false);
  var [posttArr, setPostArr] = useState([]);
  const [revokeAdmission, setRevokeAdmission] = useState("");
  const [admitAlert, setAdmitAlert] = useState(false);
  const [admittedList, setAdmissionList] = useState({});
  const [unadmittedList, setUnadmittedList] = useState({});
  const [showAdmitted, setShowAdmitted] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showcheckbox, setshowcheckbox] = useState(false);
  const [verifyingbutton, setverifyingbutton] = useState(false);
  const [formnumber, setformnumber] = useState("");
  const [tempList, setTempList] = useState(null);
  const [tableRow, setTableRow] = useState([]);

  const headers = [
    {
      field: "Id",
      header: "Id",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white", display: "none" },
    },
    {
      field: "Name",
      header: "Name",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "FormNumber",
      header: "Form Number",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Programme",
      header: "Programme",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Department",
      header: "Department",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    // Add more headers as needed
  ];

  const TableObj = {
    Name: "",
    FormNumber: "",
    Programme: "",
    Department: "",
    Id: "",
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

  const [
    admissionListDto,
    {
      loading: admissionListLoading,
      error: admissionListError,
      data: admissionListData,
    },
  ] = useMutation(ADMISSION_LIST_DTO_NAMES);

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
    loading: allAdmissionBatchLoading,
    error: allAdmissionBatchError,
    data: allAdmissionBatchData,
  } = useQuery(ALL_ADMISSION_BATCH);

  const [
    admittedApplicant,
    {
      loading: admittedApplicantloading,
      error: admittedApplicantError,
      data: admittedApplicantData,
    },
  ] = useMutation(ADMITTED_APPLICANT);

  const [
    unadmittedStudents,
    {
      loading: unadmittedLoading,
      error: unadmittedError,
      data: unadmittedData,
    },
  ] = useLazyQuery(UNADMITTED_APPLICANTS);

  const uploadExcelFile = async (e) => {
    if (previewList?.length > 0) {
      previewAdmissionList();
    } else {
      setshowcheckbox(true)
      unadmittedCandidates();
    }
  };

  const unadmittedCandidates = async () => {
    if (programmeName != "" || departmentName != "" || sessionName != "") {
      try {
        const unadmitted = await unadmittedStudents({
          variables: {
            programmeid: programmeName?.Id,
            departmentid: departmentName?.Id,
            sessionid: sessionName?.Id
          },
        });
        console.log(
          unadmitted?.data?.unadmittedApplicants,
          "Unadddddddddddddddddddddddddddd$$$$"
        );
        let unadmittedMap = unadmitted?.data?.unadmittedApplicants?.map(
          (item) => {
            return {
              Name: item?.personName,
              FormNumber: item?.applicantionFormNumber,
              Id: item?.applicantionFormNumber,
              Programme: item?.programmeName,
              Department: item?.departmentName,
            };
          }
        );
        setTableRow(unadmittedMap);
        setShowTable(true);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("All the field are required");
    }
  };

  const previewAdmissionList = async () => {
    try {
      const admissionList = await admissionListDto({
        variables: {
          admissionlistformnumber: previewList,
        },
      });
      console.log(admissionList?.data?.admissionListDtoNames, "gdgdgdgdgdg");
      //   setverifyingbutton(true);
      setShowTable(true);
      setPostArr(admissionList?.data?.admissionListDtoNames);
      let mapRow = admissionList?.data?.admissionListDtoNames?.map((item) => {
        return {
          Name: item?.personName,
          FormNumber: item?.applicantionFormNumber,
          Id: item?.admissionListId,
          Programme: item?.programmeName,
          Department: item?.departmentName,
        };
      });
      setTableRow(mapRow);
      console.log(tableRow, "tablerow");
      console.log(mapRow, "maprow");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePrepApplicants = async (e) => {
    try {
      console.log(e, "admitt studenbtsss")
      if (posttArr?.length !== 0) {
        posttArr.forEach((x) => {
          const payload = {
            admissionBatchId: admissionBatch?.Id,
            applcationFormNumber: x.applicantionFormNumber,
            departmentId: departmentName?.Id,
            departmentOptionId: null,
            programmeId: programmeName?.Id,
            sessionId: sessionName?.Id,
          };
          console.log(payload, "payload");
          saveAdmittedFunc(payload);
        });
      }

      else if (e.length > 0) {
        var appno = [];
        e.forEach((x) => {
          appno.push(x.FormNumber);
        });

        const payload = {
          admissionBatchId: admissionBatch?.Id,
          applcationFormNumber: appno,
          departmentId: departmentName?.Id,
          departmentOptionId: null,
          programmeId: programmeName?.Id,
          sessionId: sessionName?.Id,
        };
        console.log(payload, "payload");
        saveAdmittedFunc(payload);
      }
      else {
        toast.warn("Please Select an applicant");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveAdmittedFunc = async (e) => {
    const admitResponse = await admittedApplicant({
      variables: {
        admittedAplicantDto: e,
      },
    });
    toast.success("Admission succesful");
  };




  const ProcessExcel = (data) => {
    console.log(tempList, "templistt");
    if (typeof window !== "undefined") {
      let workbook = XLSX.read(data, {
        type: "binary",
      });
      let firstSheet = workbook.SheetNames[0];
      let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
      console.log(excelRows, "converted to json");
      const extractNums = excelRows?.map((item) => item?.ApplicationNumber);
      console.log(extractNums, "extraccccccccccccccccccccccccct");
      setPreviewList(extractNums);
      console.log(previewList, "jkl.");
    }
  };

  const PreviewFile = (e) => {
    if (e.target.files[0] !== null) {
      setFiles(true);
    }
    setFiles(e.target.files[0]);
    console.log("Single Files: ", e.target.files[0]);
    let fileUpload = e.target;

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();

        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            setTempList(e.target.result);

            ProcessExcel(e.target.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        } else {
          reader.onload = (e) => {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            console.log(data, "11111");
            ProcessExcel(data);
            setTempList(data);
          };
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        toast.error("This browser does not support HTML5");
      }
    } else {
      toast.error("Please upload a valid Excel file");
    }
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

  const admissionBatchList = allAdmissionBatchData?.allAdmissionBatch?.map(
    (item) => {
      return {
        Name: item.name,
        Id: item.id,
      };
    }
  );

  //   const handleChange = (e) => {
  //     setSession(e.target.value)
  //     console.log(e.target.value, 'eventtttt')
  //   }

  return (
    <div>
      <ToastContainer />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            <div class="card card-table px-5 py-5">
              <h4>Admission Upload</h4>
              <div className="row">
                <div className="col-sm-12">
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
                              value={sessionName}
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
                              value={programmeName}
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
                              Department <span className="login-danger">*</span>
                            </label>
                            <Dropdown
                              value={departmentName}
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
                              Admission Batch{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <Dropdown
                              value={admissionBatch}
                              options={admissionBatchList}
                              placeholder="select Admission Batch"
                              onChange={(e) =>
                                setAdmissionBatch(e.target.value)
                              }
                              className="w-full md:w-21.5rem"
                              optionLabel="Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="local-forms form-group">
                            <label>Upload Excel (Optional) </label>
                            <input
                              type="file"
                              name="file"
                              id="file"
                              className="mt-3"
                              onChange={(e) => PreviewFile(e)}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="student-submit">
                            {verifyingbutton == false ? (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => uploadExcelFile(e)}
                              >
                                View
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                type="button"
                                disabled
                              >
                                <span
                                  className="spinner-grow spinner-grow-sm me-1"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Loading...
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div>
                  {showTable ? (
                    <Table
                      saveFunc={handlePrepApplicants}
                      headers={headers}
                      generateColumnTemplates={generateColumnTemplates}
                      tableName={"Admit Students By File Upload"}
                      allowEdit={false}
                      allowApply={false}
                      tableObjectBody={TableObj}
                      showExport={false}
                      showAddButton={false}
                      variablesForQuery={{}}
                      tableContent={tableRow}
                      dropDownObjects={[]}
                      editFunc={{}}
                      deleteFunc={{}}
                      showCheckBox={showcheckbox}
                      showAdmitButton={true}
                    />

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
