import { Constant } from "@/constant";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a class="navbar-brand gap-1 gap-lg-3" href="#">
            <img
              src={Constant.SCHOOL_LOGO}
              height="35"
              alt="MDB Logo"
              loading="lazy"
              // style="margin-top: -1px;"
            />

            <a style={{ marginBottom: 0 }} class="nav-link" href="#">
              <h4
                class="text-black font-bold"
                style={{ fontSize: 16, marginBottom: 0 }}>
                {Constant.SCHOOL_NAME}
              </h4>
              <p
                class="text-black font-bold"
                style={{ fontSize: 12, marginBottom: 0 }}>
                {Constant.SCHOOL_ADDRESS}
              </p>
            </a>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            // aria-controls="navbarSupportedContent"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fas fa-bars" />
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <div className="mr-auto" />
            <div class="form-inline my-2 my-lg-0">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a
                    aria-current="page"
                    class=" nav-link  btn-link text-black  dropdown-toggle col-3 col-lg-5"
                    // type="button"
                    // id="dropdownMenuButton"
                    // data-mdb-toggle="dropdown"
                    aria-expanded="false">
                    Returning Students
                  </a>
                </li>
                <li class="nav-item">
                  <div class="dropdown col-lg-4">
                    <a
                      class="nav-link btn-link text-black  dropdown-toggle "
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false">
                      Applicant
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton">
                      <li>
                        <a class="dropdown-item" href="#">
                          Application Guide
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="/applicant/applicationform">
                          Manage Application
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="/applicant/checkAdmission">
                          Check Admission Status
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="nav-item">
                  <a
                    class="nav-link text-black btn-link"
                    href="/login"
                    // onClick={() => router.push("./login")}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
