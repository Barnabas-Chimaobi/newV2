import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import CreateDepartment from "./createDepartment";
import BulkUpload from "./bulkUpload";
export default function index() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body">
              <TabView>
                <TabPanel header="Create Department">
                  <CreateDepartment />
                </TabPanel>
                <TabPanel header=" Bulk Department Upload">
                  <BulkUpload />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
