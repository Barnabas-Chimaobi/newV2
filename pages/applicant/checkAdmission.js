import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import HeadeLanding from "@/components/header";
import { Column } from "primereact/column";

import { CHECK_ADMISSION_STATUS } from "../api/queries/admin";
import Admittedstudent from "@/components/admittedstudent";

export default function checkAdmission() {
	const [verifyingbutton, setverifyingbutton] = useState(false);
	const [verified, setverified] = useState("Check Admission Status");
	const [applcationFormNumber, setApplcationFormNumber] = useState("");
	const [isopen, setisopen] = useState(true);
	const [statusvalue, setstatusvalue] = useState();

	const [
		admissionStatus,
		{
			loading: admissionStatusLoading,
			error: admissionStatusError,
			data: admissionStatusData,
		},
	] = useLazyQuery(CHECK_ADMISSION_STATUS);

	const checkStatus = async () => {
		try {
			if (applcationFormNumber == "") {
				toast.error("Please enter an Application number");
			} else {
				// setLoader(true);
				const status = await admissionStatus({
					variables: {
						applicationformnumber: applcationFormNumber,
					},
				});
				// setLoader(false);
				if (status.data.checkAdmissionStatus.applicationForm === null) {
					// console.log(status, "statussss=====");
					toast.error("Please confirm your Application form number is correct");
				} else {
					setstatusvalue(status.data.checkAdmissionStatus);
					// dispatch(applicationFormNo(applcationFormNumber));
					setisopen(false);
					console.log(status, "statussss=====hjkhgjfg");
				}
			}
		} catch (err) {
			console.log(err, "errr========ss");
		}
	};

	return (
		<div>
			<ToastContainer />
			{isopen ? (
				<HeadeLanding>
					{/* <div className="Homepage-wrapper">
            <div className="content container-fluid">
              <div className="row mt-5 flex justify-content-center">
                <div className="col-sm-6 ">
                  <div className="card ">
                    <div className="card-body">
                      <form>
                        <div className="row flex align-content-center">
                          <div className="justify-content-center col-lg-6 col-sm-12">
                            <div className="form-group local-forms">
                              <label>
                                Application Form Number{" "}
                                <span className="login-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Application Form Number"
                                value={applcationFormNumber}
                                onChange={(e) =>
                                  setApplcationFormNumber(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-sm-12 pl-5">
                            <div className="student-submit">
                              {verifyingbutton == false ? (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => checkStatus()}
                                >
                                  {verified}
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  disabled
                                >
                                  <span
                                    className="spinner-grow spinner-grow-sm me-1"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Checking...
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
					<>
						<meta charSet="utf-8" />
						<title>HTML Codex - Login Form Template</title>
						<meta
							content="width=device-width, initial-scale=1.0"
							name="viewport"
						/>
						<meta content="Login Form Template" name="keywords" />
						<meta content="Login Form Template" name="description" />
						{/* Favicon */}
						<link href="img/favicon.ico" rel="icon" />
						{/* Stylesheet */}
						<link href="../../css/form.css" rel="stylesheet" />
						<div className="wrapper login-1">
							<div className="container">
								<div className="col-left">
									<div className="login-text">
										<h2>Check Admission Status</h2>
										<p>
											Supply your invoice number to check
											<br />
											admission status.
											{/* It's totally free. */}
										</p>
										{/* <a class="btn" href="">Sign Up</a> */}
									</div>
								</div>
								<div className="col-right">
									<div className="login-form">
										{/* <h2>Login</h2> */}
										<form>
											<p>
												<label>
													Application From Number<span>*</span>
												</label>
												<input
													// type="text"
													// placeholder="Password"
													required=""
													onChange={(e) =>
														setApplcationFormNumber(e.target.value)
													}
												/>
											</p>
											<p>
												<button
													onClick={() => checkStatus()}
													type="submit"
													// defaultValue="Submit"
												>
													Submit
												</button>
											</p>
											{/* <p>
								<a href="">Forget Password?</a>
							</p> */}
										</form>
									</div>
								</div>
							</div>
						</div>
					</>
				</HeadeLanding>
			) : (
				<Admittedstudent status={statusvalue} formNo={applcationFormNumber} />
			)}
		</div>
	);
}
