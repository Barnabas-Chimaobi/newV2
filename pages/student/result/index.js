import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function index() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="row gap-3">
              <div className="col-sm-12 col-lg-8">
                <Accordion>
                  <AccordionTab header="1st  year"></AccordionTab>
                  <AccordionTab header="2nd year"></AccordionTab>
                  <AccordionTab header="3rd  year"></AccordionTab>
                  <AccordionTab header="4th  year"></AccordionTab>
                  <AccordionTab header="5th  year"></AccordionTab>
                </Accordion>
              </div>
              <div className="col-sm-12 col-lg-3">
                <Card
                  title="title"
                  subTitle="sub"
                  footer={null}
                  header="head"
                  className="md:w-25rem justify-center mx-auto"
                >
                  <p className="m-0">Current Semester: 2nd</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
