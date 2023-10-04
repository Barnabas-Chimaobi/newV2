"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";

export default function DashboardAdmin() {
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [showCalender, setShowCalender] = useState(true);
  const [showTodayEvent, setShowTodayEvent] = useState(false);
  const [fullName, setfullName] = useState("");
  const [passport, setpassport] = useState("");

  const pageLoad = () => {
    if (typeof window !== "undefined") {
      const fullName = localStorage.getItem("fullName");
      setfullName(fullName);
      const passport = localStorage.getItem("passport");
      setpassport(passport);
    }
  };

  useEffect(() => {
    pageLoad();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue("#008080"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  const showEvent = (e) => {
    console.log(e.target.value, "valuee");
    setDate(e.target.value);
    console.log(date, "dateee");
    setShowCalender(false);
    setShowTodayEvent(true);
  };

  const closeModal = (e) => {
    setShowCalender(true);
    setShowTodayEvent(false);
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-sub-header">
                  <h3 className="page-title">Welcome !</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-xl-3 col-sm-6  d-flex">
              <div className="card bg-comman w-100">
                <div className="card-body">
                  <div className="db-widgets d-flex justify-content-between align-items-center">
                    <div className="db-info">
                      <h6>Students</h6>
                      <h3>5526</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/dash-icon-01.svg"
                        alt="Dashboard Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xl-3 col-sm-6 d-flex">
              <div className="card bg-comman w-100">
                <div className="card-body">
                  <div className="db-widgets d-flex justify-content-between align-items-center">
                    <div className="db-info">
                      <h6>All Programmes</h6>
                      <h3>06</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/teacher-icon-02.svg"
                        alt="Dashboard Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xl-3 col-sm-6 d-flex">
              <div className="card bg-comman w-100">
                <div className="card-body">
                  <div className="db-widgets d-flex justify-content-between align-items-center">
                    <div className="db-info">
                      <h6>All Departments</h6>
                      <h3>30/50</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/dash-icon-03.svg"
                        alt="Dashboard Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xl-3 col-sm-6  d-flex">
              <div className="card bg-comman w-100">
                <div className="card-body">
                  <div className="db-widgets d-flex justify-content-between align-items-center">
                    <div className="db-info">
                      <h6>Number Of courses</h6>
                      <h3>15/20</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/student-icon-01.svg"
                        alt="Dashboard Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
