import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as XLSX from "xlsx";
import { SAVE_DEPARTMENT_BULK } from "@/pages/api/mutations/adminMutation";
import { GET_ALL_FACULTY } from "@/pages/api/queries/admin";
import { Dropdown } from "primereact/dropdown";

export default function bulkUpload() {
  const [departmentList, setDepartmentList] = useState([]);
  const [facultyId, setFacultyId] = useState("");

  const [
    departmentBulk,
    { loading: bulkLoad, error: bulkError, data: bulkData },
  ] = useMutation(SAVE_DEPARTMENT_BULK);

  const [
    faculty,
    { loading: loadingFaculty, error: error, data: facultyList },
  ] = useLazyQuery(GET_ALL_FACULTY);

  const departmentBulkFunc = async () => {
    const payload = await departmentBulk({
      variables: {
        facultyid: facultyId?.Id,
        model: departmentList,
      },
    });
  };

  const facultydropdown = facultyList?.allFaculty?.map((item) => {
    return {
      Id: item?.id,
      Name: item?.name,
    };
  });

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

  useEffect(() => {
    faculty();
  }, []);
  return (
    <div>
      <div className="card">
        <div className="row p-5">
          <div className="col-lg-4 col-sm-12">
            <div>
              <label>Select Faculty</label>
              <Dropdown
                value={facultyId}
                options={facultydropdown}
                placeholder="select Faculty"
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full md:w-21.5rem"
                optionLabel="Name"
              />
            </div>
          </div>
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
            <div>
              <DataTable value={departmentList}>
                <Column field="departmentName" header="Department Name" />
                <Column field="departmentCode" header="Department Code" />
              </DataTable>
              <div className="card flex align-content-right">
                <Button
                  label="Submit"
                  className="w-10"
                  onClick={() => departmentBulkFunc()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
