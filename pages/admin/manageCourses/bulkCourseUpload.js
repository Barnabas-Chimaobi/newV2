import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as XLSX from "xlsx";
import { SAVE_COURSE_BULK } from "@/pages/api/mutations/adminMutation";
import { ALL_COURSE } from "@/pages/api/queries/admin";

export default function bulkCourseUpload() {
  const [courses, setCourses] = useState([]);

  const [
    courseBulk,
    { loading: saveBulkLoad, error: saveBulkError, data: saveBulkData },
  ] = useMutation(SAVE_COURSE_BULK);

  const [
    getAllCourse,
    { loading: allCourseLoad, error: allCourseError, data: allCourseData },
  ] = useLazyQuery(ALL_COURSE);

  const courseBulkFunc = async () => {
    const bulkData = await courseBulk({
      variables: {
        model: courses,
      },
    });
    getAllCourse();
    // console.log(bulkData, "bulkdataa");
    toast.success(bulkData?.status);
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const courseData = XLSX.utils.sheet_to_json(worksheet);
        setCourses(courseData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <div>
      <ToastContainer />
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

          {courses.length > 0 && (
            <div>
              <DataTable value={courses}>
                <Column field="courseName" header="Course Name" />
                <Column field="courseCode" header="Course Code" />
              </DataTable>

              <div className="card flex align-content-right">
                <Button
                  label="Submit"
                  className="w-10"
                  onClick={() => courseBulkFunc()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
