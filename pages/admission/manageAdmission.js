import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import AdmissionUpload from "./admissionUpload";
import ChangeDepartment from "./changeDepartment";

export default function manageAdmission() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body">
              <TabView>
                <TabPanel header="Admission Upload">
                  <AdmissionUpload />
                </TabPanel>
                <TabPanel header="Change Department">
                  <ChangeDepartment />
                </TabPanel>
                <TabPanel header="Revoke Admission"></TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
