import { TabView, TabPanel } from "primereact/tabview";
import React from "react";
import HostelType from "./hostelType";
import CreateHostel from "./createHostel";
import CreateHostelSeries from "./createHostelSeries";
import HostelRoom from "./hostelRoom";

export default function index() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body">
              <TabView>
                <TabPanel header="Hostel Type">
                  <HostelType />
                </TabPanel>
                <TabPanel header="Create Hostel ">
                  <CreateHostel />
                </TabPanel>
                <TabPanel header="Hostel Series">
                  <CreateHostelSeries />
                </TabPanel>
                <TabPanel header="Hostel Rooms">
                  <HostelRoom />
                </TabPanel>
                <TabPanel header=""></TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
