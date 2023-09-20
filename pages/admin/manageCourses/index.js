import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import CreateCourse from "./createCourse";
import CourseAllocation from "./courseAllocation";
import CourseAssignment from "./courseAssignment";

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
                <TabPanel header="Course Allocation">
                  <CourseAllocation />
                </TabPanel>
                <TabPanel header="Course Assignment">
                  <CourseAssignment />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
