"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Constant } from "../constant";
import { ALL_LEVEL } from "../pages/api/queries/admin";
import { MENUS } from "../pages/api/queries/admin";
import { Spinner } from "@/components/spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [showMenu, setShowMenu] = useState([]);
  const [displayMenu, { loading: menuLoad, error: menuError, data: menuData }] =
    useLazyQuery(MENUS);

  console.log(menuData, "menudataaa");

  const menuFunc = async () => {
    const menuResponse = await displayMenu();
    console.log(menuResponse?.data, "responsee");
    setShowMenu(menuResponse?.data);
  };
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
    menuFunc();
    pageLoad();
    setisLoading(true);
  }, []);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (itemName) => {
    if (openSubmenu === itemName) {
      // Close the submenu if it's already open
      setOpenSubmenu(null);
    } else {
      // Open the clicked submenu
      setOpenSubmenu(itemName);
    }
  };

  const submenuStyle = {
    display: "none",
  };
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuToggle = (index) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(index);
    }
  };
  const gotoPath = (path) => {
    router.push(path);
  };

  const renderfunction = () => {
    return (
      <>
        <ul>
          <li class="menu-title">
            <span>Admin Menu</span>
          </li>

          {showMenu?.menu?.map((item) => (
            <Menu>
              <SubMenu label={item?.name}>
                {item?.dropdowns?.map((drops) => (
                  <MenuItem onClick={() => gotoPath(drops?.path)}>
                    {" "}
                    {drops?.name}{" "}
                  </MenuItem>
                ))}
              </SubMenu>
            </Menu>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="main-wrapper">
      <div className="header" id="navothercolor">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src={Constant.SCHOOL_LOGO} alt="Logo" width={90} height={90} />
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
                  src={Constant?.BACK_END_URL + "/" + passport}
                  width={31}
                  alt={fullName}
                />
                <div className="user-text">
                  <h6>{fullName}</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={Constant?.BACK_END_URL + "/" + passport}
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{fullName}</h6>
                  <p className="text-muted mb-0">Administrator</p>
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
        {isLoading ? renderfunction() : <></>}
        {/* <div className="sidebar-inner slimscroll">

					<div id="sidebar-menu" className="sidebar-menu">
						{isLoading ? renderfunction() : <></>}
					</div>
				</div> */}
        {/* <Sidebar>
					<Menu>
						<SubMenu label="Charts">
							<MenuItem> Pie charts </MenuItem>
							<MenuItem> Line charts </MenuItem>
						</SubMenu>
						<MenuItem> Documentation </MenuItem>
						<MenuItem> Calendar </MenuItem>
					</Menu>
				</Sidebar>
				; */}
      </div>

      {children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(AdminLayout), { ssr: false });
