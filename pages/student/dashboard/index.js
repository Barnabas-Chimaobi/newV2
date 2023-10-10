"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";
import { VIEWALLTIMETABLESTUDENTS } from "@/pages/api/queries/admin";
import { VIEW_NOTIFICATIONS_BY_STUDENTS } from "@/pages/api/queries/admin";
import formatTimee from "../../../components/timeconverter";

export default function index() {
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [showCalender, setShowCalender] = useState(true);
  const [showTodayEvent, setShowTodayEvent] = useState(false);
  const [fullName, setfullName] = useState("");
  const [passport, setpassport] = useState("");
  const [formatTime, setFormatTime] = useState("");
  const [timetableArr, setTimetableArr] = useState([]);
  const [notificationArr, setNotificationArr] = useState([]);

  const pageLoad = () => {
    if (typeof window !== "undefined") {
      const fullName = localStorage.getItem("fullName");
      setfullName(fullName);
      const passport = localStorage.getItem("passport");
      setpassport(passport);
    }
  };

  const [
    viewTimetable,
    { loading: timetableLoad, error: timetableError, data: timetableData },
  ] = useLazyQuery(VIEWALLTIMETABLESTUDENTS);

  const [
    viewNotifications,
    {
      loading: viewAllNotificationLoad,
      error: viewAllNotificationError,
      data: viewAllNotificationData,
    },
  ] = useLazyQuery(VIEW_NOTIFICATIONS_BY_STUDENTS);

  // console.log(timetableData?.viewAllTimeTableStudents, "dataaa");

  const timeObj = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const tableData = async () => {
    const payload = await viewTimetable();
    // console.log(payload?.data?.viewAllTimeTableStudents, "payyyy");
    setTimetableArr(payload?.data?.viewAllTimeTableStudents);
    setFormatTime(
      new Date(timetableArr[0]?.startTime).toLocaleString(undefined, timeObj)
    );
  };

  // console.log(formatTimee("2023-10-27T12:20:44.875-07:00"));
  // console.log(timetableArr[0]?.startTime, "REAL");

  const notificationObj = async () => {
    const objResponse = await viewNotifications();
    // console.log(
    //   objResponse?.data?.viewNotificationsByStudent,
    //   "objjjjjjresponse"
    // );
    setNotificationArr(objResponse?.data?.viewNotificationsByStudent);
  };

  useEffect(() => {
    notificationObj();
    tableData();
    // setTimetableArr(tabledata?.viewAllTimeTableStudents);
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
    // console.log(e.target.value, "valuee");
    setDate(e.target.value);
    // console.log(date, "dateee");
    setShowCalender(false);
    setShowTodayEvent(true);
  };

  const closeModal = (e) => {
    setShowCalender(true);
    setShowTodayEvent(false);
  };

  const filterDataForToday = () => {
    const currentDate = new Date();
    const filteredData = timetableArr.filter((item) => {
      const startTime = new Date(item.startTime);
      const endTime = new Date(item.endTime);

      return startTime <= currentDate && currentDate;
    });

    return filteredData;
  };

  const todayData = filterDataForToday(timetableArr);
  console.log(todayData[1]?.courseAssignment?.course?.name, "todaydata");

  const firstFormattedStartTime = formatTimee(todayData[0]?.startTime);
  const firstAArrSubject = todayData[0]?.courseAssignment?.course?.name;
  const secondArrSubject = todayData[1]?.courseAssignment?.course?.name;
  const ThirdArrSubject = todayData[2]?.courseAssignment?.course?.name;
  const firstFormattedEndTime = formatTimee(todayData[0]?.endTime);
  const secondFormattedStartTime = formatTimee(todayData[1]?.startTime);
  const secondFormattedEndTime = formatTimee(todayData[1]?.endTime);
  const thirdFormattedStartTime = formatTimee(todayData[2]?.time);
  const thirdFormattedEndTime = formatTimee(todayData[2]?.time);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-sub-header">
                  <h3 className="page-title">Welcome {fullName}!</h3>
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
                      <h6>Number Of Courses</h6>
                      <h3>7</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/teacher-icon-01.svg"
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
                      <h6>Number Of Classes For the week</h6>
                      <h3>15</h3>
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
                      <h6>Number Of Classes For the week</h6>
                      <h3>5</h3>
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
            <div className=" col-xl-3 col-sm-6  d-flex">
              <div className="card bg-comman w-100">
                <div className="card-body">
                  <div className="db-widgets d-flex justify-content-between align-items-center">
                    <div className="db-info">
                      <h6>Number Of Credit Units</h6>
                      <h3>18</h3>
                    </div>
                    <div className="db-icon">
                      <img
                        src="/assets/img/icons/student-icon-02.svg"
                        alt="Dashboard Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-lg-12 col-xl-8">
              {timetableArr?.length > 0 ? (
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Today’s Lesson</h5>
                      </div>
                      <div className="col-6">
                        <ul className="chart-list-out">
                          <li className="lesson-view-all">
                            <a href="#">View All</a>
                          </li>
                          <li className="star-menus"></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="dash-circle">
                    <div className="row p-5">
                      <div className="col-lg-6 col-md-3">
                        <div className="dash-details">
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-01.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Class</h5>
                              <h4>
                                {
                                  timetableArr[0]?.courseAssignment?.course
                                    ?.name
                                }
                              </h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-03.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Start Time</h5>

                              <h4>{firstFormattedStartTime?.time}</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-03.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5> End Time</h5>
                              <h4>{firstFormattedEndTime?.time}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-3">
                        <div className="dash-details">
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-04.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Asignment</h5>
                              <h4>5 Asignment</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-05.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Staff</h5>
                              <h4>{todayData[0]?.user?.fullName}</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-06.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Venue</h5>
                              <h4>{todayData[0]?.venue}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-4 col-md-3 d-flex align-items-center justify-content-center">
                        <div className="skip-group">
                          <button
                            type="submit"
                            className="btn btn-info skip-btn"
                          >
                            skip
                          </button>
                          <button
                            type="submit"
                            className="btn btn-info continue-btn"
                          >
                            Continue
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Today’s Lesson </h5>
                      </div>
                      <div className="mt-5">
                        <h6>None at the moment.....</h6>
                      </div>

                      {/* <div className="col-6">
                        <ul className="chart-list-out">
                          <li className="lesson-view-all">
                            <a href="#">View All</a>
                          </li>
                          <li className="star-menus"></li>
                        </ul>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="dash-circle">
                    <div className="row p-5">
                      <div className="col-lg-4 col-md-3">
                        <div className="dash-details">
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-01.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Class</h5>
                              <h4>Electrical Engg</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-02.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Lessons</h5>
                              <h4>5 Lessons</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-03.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Time</h5>
                              <h4>Lessons</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-3">
                        <div className="dash-details">
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-04.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Asignment</h5>
                              <h4>5 Asignment</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-05.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Staff</h5>
                              <h4>John Doe</h4>
                            </div>
                          </div>
                          <div className="lesson-activity">
                            <div className="lesson-imgs">
                              <img
                                src="/assets/img/icons/lesson-icon-06.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-lesson">
                              <h5>Lesson Learned</h5>
                              <h4>10/50</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
              <div className="row">
                {/* <div className="col-12 col-lg-12 col-xl-12 d-flex">
                  <div className="card flex-fill comman-shadow">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <h5 className="card-title">Learning Activity</h5>
                        </div>
                        <div className="col-6">
                          <ul className="chart-list-out">
                            <li>
                              <span className="circle-blue" />
                              Teacher
                            </li>
                            <li>
                              <span className="circle-green" />
                              Student
                            </li>
                            <li className="star-menus">
                              <a href="javascript:;">
                                <i className="fas fa-ellipsis-v" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Chart
                        type="line"
                        data={chartData}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="col-12 col-lg-12 col-xl-12 d-flex">
                  <div className="card flex-fill comman-shadow">
                    <div className="card-header d-flex align-items-center">
                      <h5 className="card-title">Timetable</h5>
                      <ul className="chart-list-out student-ellips">
                        <li className="star-menus">
                          <a href="javascript:;">
                            <i className="fas fa-ellipsis-v" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="teaching-card">
                        {/* <ul className="steps-history">
                          <li>Sep22</li>
                          <li>Sep23</li>
                          <li>Sep24</li>
                        </ul> */}
                        <ul className="activity-feed">
                          <li className="feed-item d-flex align-items-center">
                            <div className="dolor-activity">
                              <span className="feed-text1">
                                <a>{firstAArrSubject}</a>
                              </span>
                              <ul className="teacher-date-list">
                                <li>
                                  <i className="fas fa-calendar-alt me-2" />
                                  {firstFormattedStartTime?.dateonly}
                                </li>
                                <li>|</li>
                                <li>
                                  <i className="fas fa-clock me-2" />
                                  {firstFormattedStartTime?.time} -{" "}
                                  {firstFormattedEndTime?.time}
                                </li>
                              </ul>
                            </div>
                            <div className="activity-btns ms-auto">
                              {/* <button type="submit" className="btn btn-info">
                                In Progress
                              </button> */}
                            </div>
                          </li>
                          <li className="feed-item d-flex align-items-center">
                            <div className="dolor-activity">
                              <span className="feed-text1">
                                <a>{secondArrSubject} </a>
                              </span>
                              <ul className="teacher-date-list">
                                <li>
                                  <i className="fas fa-calendar-alt me-2" />
                                  {secondFormattedStartTime?.dateonly}
                                </li>
                                <li>|</li>
                                <li>
                                  <i className="fas fa-clock me-2" />
                                  {secondFormattedStartTime?.time} -{" "}
                                  {secondFormattedEndTime?.time}
                                </li>
                              </ul>
                            </div>
                            <div className="activity-btns complete ms-auto">
                              {/* <button type="submit" className="btn btn-info">
                                Completed
                              </button> */}
                            </div>
                          </li>
                          <li className="feed-item d-flex align-items-center">
                            <div className="dolor-activity">
                              <span className="feed-text1">
                                <a>{ThirdArrSubject}</a>
                              </span>
                              <ul className="teacher-date-list">
                                <li>
                                  <i className="fas fa-calendar-alt me-2" />
                                  {thirdFormattedStartTime?.dateonly}
                                </li>
                                <li>|</li>
                                <li>
                                  <i className="fas fa-clock me-2" />
                                  {thirdFormattedStartTime?.time} -{" "}
                                  {thirdFormattedEndTime?.time}
                                </li>
                              </ul>
                            </div>
                            <div className="activity-btns ms-auto">
                              {/* <button type="submit" className="btn btn-info">
                                In Progress
                              </button> */}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-lg-12 col-xl-4 d-flex">
              <div className="card flex-fill comman-shadow">
                <div className="card-body">
                  {showCalender ? (
                    <div className=" card flex justify-content-center">
                      <Calendar
                        value={date}
                        onChange={(e) => showEvent(e)}
                        inline
                        showWeek
                      />
                    </div>
                  ) : (
                    <div className="calendar-info calendar-info1">
                      <div className="up-come-header">
                        <h2>Today's Event</h2>
                        <span onClick={() => closeModal()}>
                          <a href="javascript:;">
                            <i className="feather-x" />
                          </a>
                        </span>
                      </div>

                      <div className="upcome-event-date">
                        <h3>{new Date(date).toDateString()}</h3>
                        <span>
                          <i className="fas fa-ellipsis-h" />
                        </span>
                      </div>
                      <div className="calendar-details">
                        <p>08:00 am</p>
                        <div className="calendar-box normal-bg">
                          <div className="calandar-event-name">
                            <h4>English</h4>
                            <h5>Lorem ipsum sit amet</h5>
                          </div>
                          <span>08:00 - 09:00 am</span>
                        </div>
                      </div>
                      <div className="calendar-details">
                        <p>09:00 am</p>
                        <div className="calendar-box normal-bg">
                          <div className="calandar-event-name">
                            <h4>Mathematics </h4>
                            <h5>Lorem ipsum sit amet</h5>
                          </div>
                          <span>09:00 - 10:00 am</span>
                        </div>
                      </div>
                      <div className="calendar-details">
                        <p>10:00 am</p>
                        <div className="calendar-box normal-bg">
                          <div className="calandar-event-name">
                            <h4>History</h4>
                            <h5>Lorem ipsum sit amet</h5>
                          </div>
                          <span>10:00 - 11:00 am</span>
                        </div>
                      </div>
                      <div className="calendar-details">
                        <p>11:00 am</p>
                        <div className="calendar-box break-bg">
                          <div className="calandar-event-name">
                            <h4>Break</h4>
                            <h5>Lorem ipsum sit amet</h5>
                          </div>
                          <span>11:00 - 12:00 am</span>
                        </div>
                      </div>
                      <div className="calendar-details">
                        <p>11:30 am</p>
                        <div className="calendar-box normal-bg">
                          <div className="calandar-event-name">
                            <h4>History</h4>
                            <h5>Lorem ipsum sit amet</h5>
                          </div>
                          <span>11:30 - 12:00 am</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="calendar-info calendar-info1">
                    <div className="up-come-header">
                      <h2>Notifications</h2>
                      <span>
                        <a href="javascript:;">
                          <i className="feather-plus" />
                        </a>
                      </span>
                    </div>
                    <div className="upcome-event-date">
                      <h3>10 Jan</h3>
                      <span>
                        <i className="fas fa-ellipsis-h" />
                      </span>
                    </div>
                    <div className="calendar-details">
                      <p>08:00 am</p>
                      <div className="calendar-box normal-bg">
                        <div className="calandar-event-name">
                          <h4>{notificationArr[0]?.title}</h4>
                          <h5>{notificationArr[0]?.description}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="upcome-event-date">
                      <h3>10 Jan</h3>
                      <span>
                        <i className="fas fa-ellipsis-h" />
                      </span>
                    </div>
                    <div className="calendar-details">
                      <p>08:00 am</p>
                      <div className="calendar-box normal-bg">
                        <div className="calandar-event-name">
                          <h4>{notificationArr[1]?.title}</h4>
                          <h5>{notificationArr[1]?.description}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>Copyright © 2023 LloydAnt.</p>
        </footer>
      </div>
    </div>
  );
}
