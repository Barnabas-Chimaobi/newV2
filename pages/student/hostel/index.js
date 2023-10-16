import React, { useState } from "react";

export default function Hostel() {
	const [tabOne, setTabOne] = useState("active-one");
	const [tabTwo, setTabTwo] = useState("");
	const [tabThree, setTabThree] = useState("");

	return (
		<>
			<div className="page-wrapper">
				<div className="content container-fluid">
					{/* <p className="font-bold">Hostel Allocation</p> */}
					<div class="col-md-12">
						<div class="card bg-white">
							<div class="card-header">
								<h5 class="card-title">Hostel Allocation</h5>
							</div>
							<div class="card-body">
								<ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
									<li class="nav-item className={`nav-link ${tabOne !== '' ? 'active' : ''}`}">
										<a
											onClick={() => setTabOne("active-one")}
											className={`nav-link ${
												tabOne == "active-one" ? "active" : ""
											}`}
											// {...(email === "" ? { disabled: "disabled" } : {})}
											href="#solid-rounded-justified-tab1"
											data-bs-toggle="tab">
											Request Hostel
										</a>
									</li>
									<li class="nav-item ">
										<a
											onClick={() => setTabOne("active-two")}
											className={`nav-link ${
												tabOne == "active-two" ? "active" : ""
											}`}
											href="#solid-rounded-justified-tab2"
											data-bs-toggle="tab">
											Hostel Allocation Status
										</a>
									</li>
									<li class="nav-item">
										<a
											onClick={() => setTabOne("active-three")}
											className={`nav-link ${
												tabOne == "active-three" ? "active" : ""
											}`}
											href="#solid-rounded-justified-tab3"
											data-bs-toggle="tab">
											Print Hostel Receipt
										</a>
									</li>
								</ul>
								<div class="tab-content">
									<div
										class={`tab-pane ${tabOne == "active-one" ? "active" : ""}`}
										id="solid-rounded-justified-tab1">
										<div className="row">
											<div className="col-sm-12">
												<div className="card">
													<div className="card-body">
														<form>
															<div className="row">
																<div className="col-lg-6 col-sm-12">
																	<div className="form-group local-forms">
																		<label>
																			Request for Hostel Allocation
																			<span className="login-danger">*</span>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Enter confirmation order number"
																			// value={email}
																			// onChange={(e) => setEmail(e.target.value)}
																		/>
																	</div>
																</div>
																<div className="col-12 col-lg-6 col-sm-12">
																	<div className="student-submit">
																		<button
																			className="btn btn-primary"
																			type="button">
																			Submit
																		</button>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										class={`tab-pane ${tabOne == "active-two" ? "active" : ""}`}
										id="solid-rounded-justified-tab2">
										<div className="row">
											<div className="col-sm-12">
												<div className="card">
													<div className="card-body">
														<form>
															<div className="row">
																<div className="col-lg-6 col-sm-12">
																	<div className="form-group local-forms">
																		<label>
																			Hostel Status
																			<span className="login-danger">*</span>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Enter confirmation order number"
																			// value={email}
																			// onChange={(e) => setEmail(e.target.value)}
																		/>
																	</div>
																</div>
																<div className="col-12 col-lg-6 col-sm-12">
																	<div className="student-submit">
																		<button
																			className="btn btn-primary"
																			type="button">
																			Submit
																		</button>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										class={`tab-pane ${
											tabOne == "active-three" ? "active" : ""
										}`}
										id="solid-rounded-justified-tab3">
										<div className="row">
											<div className="col-sm-12">
												<div className="card">
													<div className="card-body">
														<form>
															<div className="row">
																<div className="col-lg-6 col-sm-12">
																	<div className="form-group local-forms">
																		<label>
																			print your Hostel Slip
																			<span className="login-danger">*</span>
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Enter confirmation order number"
																			// value={email}
																			// onChange={(e) => setEmail(e.target.value)}
																		/>
																	</div>
																</div>
																<div className="col-12 col-lg-6 col-sm-12">
																	<div className="student-submit">
																		<button
																			className="btn btn-primary"
																			type="button">
																			Submit
																		</button>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
