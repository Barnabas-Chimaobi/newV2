import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as XLSX from "xlsx";

export default function bulkUpload() {
  const [departmentList, setDepartmentList] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const department = XLSX.utils.sheet_to_json(worksheet);

        setDepartmentList(department);
      };

      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div>
      <div className="card">
        <div className="row p-5">
          <div className="col-lg-4 col-sm-12">
            <div className="form-group local-forms">
              <FileUpload
                className="mt-5"
                mode="basic"
                chooseLabel="Choose Excel File"
                uploadLabel="Upload"
                cancelLabel="Cancel"
                onSelect={handleFileUpload}
              />
            </div>
          </div>

          {departmentList.length > 0 && (
            <DataTable value={departmentList}>
              <Column field="departmentName" header="Department Name" />
              <Column field="departmentCode" header="Department Code" />
              <Column field="facultyName" header="Faculty Name" />
            </DataTable>
          )}
        </div>
      </div>
    </div>
  );
}
