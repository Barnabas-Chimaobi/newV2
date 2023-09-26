"use client";
import React, { useState, useEffect } from "react";
import { Constant } from "../constant";

export default function Layout({ children }) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
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

                        <a className="mobile_btn" id="mobile_btn">
                            <i className="fas fa-bars" />
                        </a>
                        <ul className="nav user-menu">
                            <li className="nav-item dropdown noti-dropdown me-2">
                                <a
                                    href="#"
                                    className="dropdown-toggle nav-link header-nav-list"
                                    data-bs-toggle="dropdown"
                                >
                                    <img src="/assets/img/icons/header-icon-05.svg" alt="" />
                                </a>
                                <div className="dropdown-menu notifications">
                                    <div className="topnav-dropdown-header">
                                        <span className="notification-title">Notifications</span>
                                        <a href="javascript:void(0)" className="clear-noti">
                                            {" "}
                                            Clear All{" "}
                                        </a>
                                    </div>
                                    <div className="noti-content">
                                        <ul className="notification-list">
                                            <li className="notification-message">
                                                <a href="#">
                                                    <div className="media d-flex">
                                                        <span className="avatar avatar-sm flex-shrink-0">
                                                            <img
                                                                className="avatar-img rounded-circle"
                                                                alt="User Image"
                                                                src="/assets/img/profiles/avatar-02.jpg"
                                                            />
                                                        </span>
                                                        <div className="media-body flex-grow-1">
                                                            <p className="noti-details">
                                                                <span className="noti-title">Carlson Tech</span>{" "}
                                                                has approved{" "}
                                                                <span className="noti-title">your estimate</span>
                                                            </p>
                                                            <p className="noti-time">
                                                                <span className="notification-time">
                                                                    4 mins ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="notification-message">
                                                <a href="#">
                                                    <div className="media d-flex">
                                                        <span className="avatar avatar-sm flex-shrink-0">
                                                            <img
                                                                className="avatar-img rounded-circle"
                                                                alt="User Image"
                                                                src="/assets/img/profiles/avatar-11.jpg"
                                                            />
                                                        </span>
                                                        <div className="media-body flex-grow-1">
                                                            <p className="noti-details">
                                                                <span className="noti-title">
                                                                    International Software Inc
                                                                </span>{" "}
                                                                has sent you a invoice in the amount of{" "}
                                                                <span className="noti-title">$218</span>
                                                            </p>
                                                            <p className="noti-time">
                                                                <span className="notification-time">
                                                                    6 mins ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="notification-message">
                                                <a href="#">
                                                    <div className="media d-flex">
                                                        <span className="avatar avatar-sm flex-shrink-0">
                                                            <img
                                                                className="avatar-img rounded-circle"
                                                                alt="User Image"
                                                                src="/assets/img/profiles/avatar-17.jpg"
                                                            />
                                                        </span>
                                                        <div className="media-body flex-grow-1">
                                                            <p className="noti-details">
                                                                <span className="noti-title">John Hendry</span>{" "}
                                                                sent a cancellation request{" "}
                                                                <span className="noti-title">
                                                                    Apple iPhone XR
                                                                </span>
                                                            </p>
                                                            <p className="noti-time">
                                                                <span className="notification-time">
                                                                    8 mins ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="notification-message">
                                                <a href="#">
                                                    <div className="media d-flex">
                                                        <span className="avatar avatar-sm flex-shrink-0">
                                                            <img
                                                                className="avatar-img rounded-circle"
                                                                alt="User Image"
                                                                src="/assets/img/profiles/avatar-13.jpg"
                                                            />
                                                        </span>
                                                        <div className="media-body flex-grow-1">
                                                            <p className="noti-details">
                                                                <span className="noti-title">
                                                                    Mercury Software Inc
                                                                </span>{" "}
                                                                added a new product{" "}
                                                                <span className="noti-title">
                                                                    Apple MacBook Pro
                                                                </span>
                                                            </p>
                                                            <p className="noti-time">
                                                                <span className="notification-time">
                                                                    12 mins ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="topnav-dropdown-footer">
                                        <a href="#">View all Notifications</a>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item zoom-screen me-2">
                                <a href="#" className="nav-link header-nav-list">
                                    <img src="/assets/img/icons/header-icon-04.svg" alt="" />
                                </a>
                            </li>
                            <li className="nav-item dropdown has-arrow new-user-menus">
                                <a
                                    href="#"
                                    className="dropdown-toggle nav-link"
                                    data-bs-toggle="dropdown"
                                >
                                    <span className="user-img">
                                        <img
                                            className="rounded-circle"
                                            src="/assets/img/profiles/avatar-01.jpg"
                                            width={31}
                                            alt="Ryan Taylor"
                                        />
                                        <div className="user-text">
                                            <h6>Ryan Taylor</h6>
                                            <p className="text-muted mb-0">Student</p>
                                        </div>
                                    </span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="user-header">
                                        <div className="avatar avatar-sm">
                                            <img
                                                src="/assets/img/profiles/avatar-01.jpg"
                                                alt="User Image"
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <div className="user-text">
                                            <h6>Ryan Taylor</h6>
                                            <p className="text-muted mb-0">Student</p>
                                        </div>
                                    </div>
                                    <a className="dropdown-item" href="profile.html">
                                        My Profile
                                    </a>

                                    <a className="dropdown-item" href="login.html">
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar" id="sidebar">
                        <div className="sidebar-inner slimscroll">
                            <div id="sidebar-menu" className="sidebar-menu">
                                <ul>
                                    {/* <li className="menu-title">
                  <span>Main Menu</span>
                </li> */}
                                    <li className="submenu">
                                        <a href="../../../admin/faculty/">
                                            <i className="feather-grid" /> <span>Manage Faculty</span>{" "}
                                            <span className="menu-arrow" />
                                        </a>
                                        <a href="../../../admin/department/">
                                            <i className="feather-grid" />{" "}
                                            <span>Manage Department</span>{" "}
                                            <span className="menu-arrow" />
                                        </a>
                                        {/* <ul>

                    <li>
                      <a href="index.html">Admin Dashboard</a>
                    </li>
                    <li>
                      <a href="teacher-dashboard.html">Teacher Dashboard</a>
                    </li>
                    <li>
                      <a href="student-dashboard.html">Student Dashboard</a>
                    </li>
                  </ul> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </html>
        </>
    );

}
