import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Constant } from "../constant";
import { ALL_LEVEL } from "../pages/api/queries/admin";
import { MENUS } from "../pages/api/queries/admin";

export default function AdminLayout({ children }) {
  const [showMenu, setShowMenu] = useState([]);
  const [displayMenu, { loading: menuLoad, error: menuError, data: menuData }] =
    useLazyQuery(MENUS);

  console.log(menuData, "menudataaa");

  const menuFunc = async () => {
    const menuResponse = await displayMenu();
    console.log(menuResponse?.data, "responsee");
    setShowMenu(menuResponse?.data);
  };

  useEffect(() => {
    menuFunc();
  }, []);

  return (
    <>
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
                    <h6>Ada Ogbonna</h6>
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
                    <h6>Ada Ogbonna</h6>
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
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul className="">
                {showMenu?.menu?.map((item) => {
                  console.log(item, "itemmmmmAdmin");
                  return (
                    <li className="submenu">
                      <a href="#">
                        <i></i> <span> {item?.name}</span>{" "}
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        {item?.dropdowns?.map((drops) => {
                          console.log(drops, "dropdownnn");
                          return (
                            <li className="">
                              <a href={drops?.path}>{drops?.name}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
