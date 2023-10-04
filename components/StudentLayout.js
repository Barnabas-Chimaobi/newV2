"use client";
import React, { useState, useEffect } from "react";
import { Constant } from "../constant";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  const [domLoaded, setDomLoaded] = useState(false);
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
    setDomLoaded(true);
    pageLoad();
  }, []);

  return (
    <>
      {domLoaded && (
        <div className="main-wrapper">
          <div className="header" id="navothercolor">
            <div className="header-left">
              <a href="index.html" className="logo">
                <img
                  src={Constant.SCHOOL_LOGO}
                  alt="Logo"
                  width={90}
                  height={90}
                />
              </a>
              <a href="index.html" className="logo logo-small">
                <img
                  src={Constant.SMALL_SCHOOL_LOGO}
                  alt="Logo"
                  width={30}
                  height={30}
                />
              </a>
            </div>
            <div className="menu-toggle">
              <a href="javascript:void(0);" id="toggle_btn">
                <i className="fas fa-bars" />
              </a>
            </div>

            <a className="mobile_btn" id="mobile_btn"></a>
            <ul className="nav user-menu">
              <li className="nav-item dropdown has-arrow new-user-menus">
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-bs-toggle="dropdown"
                >
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={Constant.BACK_END_URL + "/" + passport}
                      width={31}
                      alt={fullName}
                    />
                    <div className="user-text">
                      <h6>{fullName}</h6>
                      <p className="text-muted mb-0">Student</p>
                    </div>
                  </span>
                </a>
                <div className="dropdown-menu">
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <img
                        src={Constant.BACK_END_URL + "/" + passport}
                        alt="User Image"
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="user-text">
                      <h6>{fullName}</h6>
                      <p className="text-muted mb-0">Student</p>
                    </div>
                  </div>
                  <a className="dropdown-item" href="profile.html">
                    My Profile
                  </a>

                  <Link
                    className="dropdown-item"
                    href={Constant.BASE_URL + `/login`}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li className="submenu">
                    <Link href="../../../student/dashboard">
                      <i className="feather-grid" /> <span>Dashboard</span>{" "}
                    </Link>
                    <Link href="../../../student/fees/">
                      <i className="feather-credit-card" />{" "}
                      <span>Manage Payment</span>{" "}
                    </Link>
                    <Link href="../../../student/courses/">
                      <i className="feather-folder" />{" "}
                      <span>Manage Courses</span>{" "}
                    </Link>
                    <Link href="#">
                      <i className="feather-clock" /> <span>Timetable</span>{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });