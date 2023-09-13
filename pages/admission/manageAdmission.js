import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Dropdown } from "primereact/dropdown";
import Table from "../../components/table";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import { FileUpload } from "primereact/fileupload";
import { ADMISSION_LIST_DTO_NAMES } from "../api/mutations/admin";
import * as XLSX from "xlsx";

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

  const [
    admissionListDto,
    {
      loading: admissionListLoading,
      error: admissionListError,
      data: admissionListData,
    },
  ] = useMutation(ADMISSION_LIST_DTO_NAMES);

  const uploadExcelFile = async (e) => {
    try {
      const admissionList = await admissionListDto({
        variables: {
          admissionlistformnumber: previewList,
        },
      });
      console.log(admissionList, "gdgdgdgdgdg");
      setAdmissionListArr(admissionList?.data?.admissionListDtoNames);
      setPostArr(admissionList?.data?.admissionListDtoNames);
      if (admissionList?.data?.admissionListDto?.id > 0) {
        window.location.reload(true);
        setShowTable(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const ProcessExcel = (data) => {
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
    setFiles(e.target.files[0]);
    console.log("Single Files: ", e.target.files[0]);
    let fileUpload = e.target;

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();

        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
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

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="row">
            <div class="card card-table px-5 py-5">
              <h4>Admission Upload</h4>
              <div className="mt-5 row">
                <div className="col">
                  {/* <FileUpload name="demo" /> */}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => PreviewFile(e)}
                  />
                </div>
                <div className="col">
                  <button
                    className="border bg-green-600 bg-green-600 text-white rounded py-1 px-1"
                    onClick={(e) => uploadExcelFile(e)}
                  >
                    Upload Excel File
                  </button>
                </div>
              </div>
              <div className="row">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
