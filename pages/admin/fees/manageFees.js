import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import FeeSetup from "./feeSetup";
import FeeType from "./feeType";
import Fee from "./fee";

export default function manageFees() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body">
              <TabView>
                <TabPanel header="Fee Type">
                  <FeeType />
                </TabPanel>
                <TabPanel header="Fee">
                  <Fee />
                </TabPanel>
                <TabPanel header="Fee Setup">
                  <FeeSetup />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
