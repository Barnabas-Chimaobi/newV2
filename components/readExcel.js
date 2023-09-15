import React from "react";
import * as XLSX from "xlsx";

export default function readExcel(e) {
  var dataFromExcel = PreviewFile(e);
  return ProcessExcel(dataFromExcel);
}

const ProcessExcel = (data) => {
  if (typeof window !== "undefined") {
    if (data !== null && data !== "undefined") {
      let workbook = XLSX.read(data, {
        type: "binary",
      });
      let firstSheet = workbook.SheetNames[0];
      let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
      console.log(excelRows, "converted to json");
      const extractNums = excelRows?.map((item) => item?.ApplicationNumber);
      console.log(extractNums, "extraccccccccccccccccccccccccct");
      //setPreviewList(extractNums);
      //   console.log(previewList, "jkl.");
      return extractNums;
    }
  }
};

const PreviewFile = (e) => {
  //setFiles(e.target.files[0]);
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
