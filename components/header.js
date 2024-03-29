import React from "react";
import { Constant } from "../constant";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function header({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="main-wrapper">
        <div className="header" id="navothercolor">
          <div className="header-left">
            <a href="./" className="logo">
              <Image
                src={Constant.SCHOOL_LOGO}
                alt="Logo"
                width={80}
                height={80}
              />
            </a>
            <div class="pt-3">
              <h4 className="schoolName">{Constant.SCHOOL_NAME}</h4>
              <p className="schoolAddress pt-1">{Constant.SCHOOL_ADDRESS}</p>
            </div>
            <a href="index.html" className="logo logo-small">
              <img
                src={Constant.SMALL_SCHOOL_LOGO}
                alt="Logo"
                width={30}
                height={30}
              />
            </a>
          </div>

          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow new-user-menus">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown">
                <span className="user-img">
                  <div className="user-text">
                    <p className=" text-black mb-0 text-md">Applicant</p>
                  </div>
                </span>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="profile.html">
                  Application Guide
                </a>
                <a className="dropdown-item" href="/applicant/applicationform">
                  Manage Application
                </a>
                <a className="dropdown-item" href="login.html">
                  Check Admission Status
                </a>
                <a className="dropdown-item" href="login.html">
                  Course Finder
                </a>
              </div>
            </li>

            <a href="./login" className="dropdown-toggle nav-link">
              <span className="user-img">
                <div className="user-text">
                  <p className="text-black mb-0 text-md">Login</p>
                </div>
              </span>
            </a>
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}
