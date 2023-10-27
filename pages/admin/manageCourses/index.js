import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import CreateCourse from "./createCourse";
import CourseAllocation from "./courseAllocation";
import CourseAssignment from "./courseAssignment";
import AssignCourses from "./assignCourses";
import BulkCourseUpload from "./bulkCourseUpload";

export default function index() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body">
              <TabView>
                <TabPanel header="Create Course">
                  <CreateCourse />
                </TabPanel>
                <TabPanel header=" Bulk Course Upload">
                  <BulkCourseUpload />
                </TabPanel>
                <TabPanel header="Course Allocation">
                  <CourseAllocation />
                </TabPanel>
                <TabPanel header="View Assigned Courses">
                  <CourseAssignment />
                </TabPanel>
                <TabPanel header="Assign Courses">
                  <AssignCourses />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
