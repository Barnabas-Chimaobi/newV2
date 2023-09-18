import React from 'react'
import { Constant } from '../constant'

export default function header({ children }) {
    return (
        <>
            <div className="main-wrapper">
                <div className="header" id="navothercolor">
                    <div className="header-left">
                        <a href="index.html" className="logo" >
                            <img src={Constant.SCHOOL_LOGO} alt="Logo" width={90}
                                height={90} />
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


                    <a className="mobile_btn" id="mobile_btn">
                        <i className="fas fa-bars" />
                    </a>

                    <ul className="nav user-menu" >

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
                                        <p className="text-muted mb-0">Administrator</p>
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
                                        <p className="text-muted mb-0">Administrator</p>
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
                {children}

            </div >
        </>
    )
}
