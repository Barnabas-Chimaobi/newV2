import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Dropdown } from "primereact/dropdown";
import Table from "../../../components/table";
import {
  GET_ALL_SESSION,
  ALL_PROGRAMME,
  UPLOAD_SHEET,
  ASSIGNED_COURSES,
} from "@/pages/api/queries/admin";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { read, utils, writeFile } from "xlsx";
import { SAVE_STUDENT_RESULT } from "@/pages/api/mutations/adminMutation";

export default function index() {
  const [sessionName, setSession] = useState("");
  const [programmeName, setProgramme] = useState("");
  const [showTable, setShowTable] = useState(false);
  const fileInputRef = useRef();
  const [mapArr, setMapArr] = useState([]);
  const [headerArr, setHeaderArr] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [arr, setArr] = useState([]);

  const [
    saveStudentResult,
    {
      loading: saveStudentResultLoad,
      error: saveStudentResultError,
      data: saveStudentResultData,
    },
  ] = useMutation(SAVE_STUDENT_RESULT);

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

  const [
    uploadSheet,
    {
      loading: uploadSheetLoad,
      error: uploadSheetError,
      data: uploadSheetData,
    },
  ] = useLazyQuery(UPLOAD_SHEET);

  const [
    assignedCourses,
    {
      loading: assignedCoursesLoad,
      error: assignedCoursesError,
      data: assignedCoursesData,
    },
  ] = useLazyQuery(ASSIGNED_COURSES);

  const assignedCoursesFunc = async () => {
    try {
      const assignedCoursesResponse = await assignedCourses({
        variables: {
          sessionid: sessionName?.Id,
          programmeid: programmeName?.Id,
        },
      });
      setShowTable(true);
      // console.log(sessionName, "sessionn");
    } catch (err) {
      toast.error(err.message);
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

  const headers = [
    {
      field: "Code",
      header: "Course Code",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Title",
      header: "Course Title",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Download",
      header: "Download Result Template",
      sortable: true,
      style: { minWidth: "12rem", backgroundColor: "white" },
    },
    {
      field: "Upload",
      header: "Upload Result Sheet",
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

  const renderDownloadButton = (rowData) => {
    return (
      <Button
        icon="pi pi-download"
        label="Download"
        onClick={() => handleDownload(rowData)}
      />
    );
  };

  const handleDownload = (data) => {
    // console.log(data, "dataaaa");
    uploadSheetFunc(data);
  };

  const uploadSheetFunc = async (data) => {
    try {
      const sheetResponse = await uploadSheet({
        variables: {
          sessionid: sessionName?.Id,
          courseId: data.Id,
        },
      });
      // console.log(sheetResponse, "shettttdataaaa");

      if (sheetResponse?.data?.uploadSheet?.resultDetails?.length > 0) {
        processExcelSheet(sheetResponse?.data?.uploadSheet?.resultDetails);
      } else {
        toast.error("No Record of Registered Students");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const processExcelSheet = (data) => {
    const XLSX = require("xlsx");

    // console.log(data.length, "dataaaasss");
    // console.log(data, "EXCELDATAAAAAA");
    const megaArr = [];
    const excelHeader = [
      "S/N",
      "MatricNumber",
      "quiz1",
      "quiz2",
      "quiz3",
      "quiz4",
      "quiz5",
      "quiz6",
      "quiz7",
      "quiz8",
      "quiz9",
      "Exam",
      "courseCode",
    ];
    megaArr.push(excelHeader);

    for (let i = 0; i < data.length; i++) {
      let obj = {
        sn: (i + 1).toString(),
        matnumber: data[i].matriculationNumber,
        q1: data[i].quiz1 == " " ? " " : data[i].quiz1,
        q2: data[i].quiz2 == " " ? " " : data[i].quiz2,
        q3: data[i].quiz3 == " " ? " " : data[i].quiz3,
        q4: data[i].quiz4 == " " ? " " : data[i].quiz4,
        q5: data[i].quiz5 == " " ? " " : data[i].quiz5,
        q6: data[i].quiz6 == " " ? " " : data[i].quiz6,
        q7: data[i].quiz7 == " " ? " " : data[i].quiz7,
        q8: data[i].quiz8 == " " ? " " : data[i].quiz8,
        q9: data[i].quiz9 == " " ? " " : data[i].quiz9,
        exam: data[i].exam == " " ? " " : data[i].exam,
        courseCode: data[i].courseCode,
      };
      var newObj2 = Object.values(obj);
      megaArr.push(newObj2);
    }
    const excelData = megaArr;
    // setExcelArr(excelData);

    //create a new workbook and worksheet
    const workbook = utils.book_new();
    const sheet = utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, sheet, "sheet 1");
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    //save the excel file
    writeFile(workbook, "resultSheet.xlsx");
  };

  const handleFileUpload = (event) => {
    setArr([]);
    // console.log(event, "eventt");
    const file = event?.target?.files[0];
    // console.log(file, "seleceteddddfile");

    if (file) {
      // console.log(file, "fileeee");
      const reader = new FileReader();

      reader.onload = function (e) {
        // console.log("File read successfully");
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = utils.sheet_to_json(
          sheet,
          { header: 1, defval: null },
          true
        );

        sheetData?.map((item, index) => {
          if (index != 0) {
            let obj = {
              courseCode: item[12],
              matriculationNumber: item[1],
              quiz1: item[2] == "" || item[2] == 0 ? "-" : item[2],
              quiz2: item[3] == "" || item[3] == 0 ? "-" : item[3],
              quiz3: item[4] == "" || item[4] == 0 ? "-" : item[4],
              quiz4: item[5] == "" || item[5] == 0 ? "-" : item[5],
              quiz5: item[6] == "" || item[6] == 0 ? "-" : item[6],
              quiz6: item[7] == "" || item[7] == 0 ? "-" : item[7],
              quiz7: item[8] == "" || item[8] == 0 ? "-" : item[8],
              quiz8: item[9] == "" || item[9] == 0 ? "-" : item[9],
              quiz9: item[10] == "" || item[10] == 0 ? "-" : item[10],
              exam: item[11] == "" ? 0 : item[11],
            };
            // arr.push(obj);
            // console.log(obj, "itemmm");
            setArr([...arr, obj]);
            // console.log(arr, "afterrrr");
          }
        });

        setShowTable(false);
        setIsFileUploaded(true);
        setHeaderArr(sheetData[0]);
        setMapArr(sheetData);
        // setArr(sheetData);
        // console.log(sheetData, "sheetData");
        // console.log(mapArr, "mapArr");
        setTimeout(() => {
          console.log(arr, "Arr");
        }, 2000);
        // console.log("Arr length:", arr.length);
        renderUploadedDataTable();
      };
      reader.readAsArrayBuffer(file);
    } else {
      // console.log("file not selected");
    }
  };

  // useEffect(() => {
  //   if (isFileUploaded) {
  //     renderUploadedDataTable();
  //   }
  // }, [isFileUploaded]);

  const renderUploadedDataTable = () => {
    console.log("Arr length in renderUploadedDataTable:", arr, headerArr);
    return (
      <div class="card card-table mt-3">
        <DataTable value={arr} tableStyle={{ minWidth: "60rem" }}>
          {/* {headerArr?.map((x, i) => {
            console.log(x, "parammmm");
            return <Column field={x} header={x.toUpperCase()} />;
          })} */}

          <Column field="s/n" header="S/N" />
          <Column field="courseCode" header="courseCode" />
          <Column field="matriculationNumber" header="Matric Number" />
          <Column field="quiz1" header="Quiz 1" />
          <Column field="quiz2" header="Quiz 2" />
          <Column field="quiz3" header="Quiz 3" />
          <Column field="quiz4" header="Quiz 4" />
          <Column field="quiz5" header="Quiz 5" />
          <Column field="quiz6" header="Quiz 6" />
          <Column field="quiz7" header="Quiz 7" />
          <Column field="quiz8" header="Quiz 8" />
          <Column field="quiz9" header="Quiz 9" />
          <Column field="exam" header="Exam" />
        </DataTable>
        <div className="ml-auto mt-2">
          <Button
            label="Save"
            severity="success"
            onClick={() => saveStudentResultFunc()}
          />
        </div>
      </div>
    );
  };

  const saveStudentResultFunc = async () => {
    try {
      const saveStudentResultResponse = await saveStudentResult({
        variables: {
          sessionid: sessionName?.Id,
          result: arr,
        },
      });
      // setShowModal(false);
      console.log(saveStudentResultResponse, "resultttt");
      if (saveStudentResultResponse?.data?.saveStudentResult) {
        toast.success("Result has been uploaded");
      } else {
        toast.error("Error occured while uploading");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const renderUploadButton = (rowData) => {
    return (
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e)}
          ref={fileInputRef}
        />
        <Button
          icon="pi pi-upload"
          label="Upload"
          onClick={() => fileInputRef.current.click()}
        />
      </div>
    );
  };

  const tableRow = assignedCoursesData?.assignedCourses?.map((item, index) => {
    return {
      Code: item?.code,
      Title: item?.name,
      Id: item?.id,
    };
  });

  return (
    <div>
      <ToastContainer />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card p-5">
            <h2>Manage Result</h2>
          </div>
          <div class=" card row p-5">
            <div className="row mt-3">
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
                <div className="student-submit">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => assignedCoursesFunc()}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            <div class="col-sm-12">
              <div className="col-sm-12">
                {isFileUploaded && renderUploadedDataTable()}
              </div>
              {showTable ? (
                <div class="card card-table">
                  <DataTable
                    value={tableRow}
                    tableStyle={{ minWidth: "60rem" }}
                  >
                    <Column field="Code" header="Code"></Column>
                    <Column field="Title" header="Title"></Column>
                    <Column body={(item) => renderDownloadButton(item)} />
                    <Column body={() => renderUploadButton()} />
                  </DataTable>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
