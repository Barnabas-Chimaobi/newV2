import React from "react";
import { STUDENT_PROFILE } from "@/pages/api/queries/basicQueries";
import { useQuery } from "@apollo/client";

export default function index() {
	const { data: studentData, loading: studentLoading } =
		useQuery(STUDENT_PROFILE);
	const newData = studentData?.studentProfile;
	console.log(studentData, "data=======");
	return (
		<div class="page-wrapper">
			<div class="content container-fluid">
				<div class="page-header">
					<div class="row">
						<div class="col">
							<h3 class="page-title">Profile</h3>
							{/* <ul class="breadcrumb">
								<li class="breadcrumb-item">
									<a href="index.html">Dashboard</a>
								</li>
								<li class="breadcrumb-item active">Profile</li>
							</ul> */}
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="profile-header">
							<div class="row align-items-center">
								<div class="col-auto profile-image">
									<a href="#">
										<img
											class="rounded-circle"
											alt="User Image"
											src={newData?.passportUrl}
										/>
									</a>
								</div>
								<div class="col ms-md-n2 profile-user-info">
									<h4 class="user-name mb-0">{newData?.fullName}</h4>
									<h6 class="text-muted">{newData?.courseOfStudy}</h6>
									<div class="about-text">{newData?.faculty}</div>
									<div class="user-Location">
										<i class="fas fa-map-marker-alt"></i> {newData?.address}
									</div>
								</div>
								<div class="col-auto profile-btn">
									<a href class="btn btn-primary">
										{" "}
										Edit{" "}
									</a>
								</div>
							</div>
						</div>
						<div class="profile-menu">
							<ul class="nav nav-tabs nav-tabs-solid">
								<li class="nav-item">
									<a
										class="nav-link active"
										data-bs-toggle="tab"
										href="#per_details_tab">
										About
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" data-bs-toggle="tab" href="#password_tab">
										Password
									</a>
								</li>
							</ul>
						</div>
						<div class="tab-content profile-tab-cont">
							<div class="tab-pane fade show active" id="per_details_tab">
								<div class="row">
									<div class="col-lg-9">
										<div class="card">
											<div class="card-body">
												<h5 class="card-title d-flex justify-content-between">
													<span>Personal Details</span>
													<a
														class="edit-link"
														data-bs-toggle="modal"
														href="#edit_personal_details">
														<i class="far fa-edit me-1"></i>Edit
													</a>
												</h5>
												<div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
														Name
													</p>
													<p class="col-sm-9">{newData?.fullName}</p>
												</div>
												{/* <div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
														Date of Birth
													</p>
													<p class="col-sm-9">24 Jul 1983</p>
												</div> */}
												<div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
														Email ID
													</p>
													<p class="col-sm-9">
														<a
															href="https://preschool.dreamguystech.com/cdn-cgi/l/email-protection"
															class="__cf_email__"
															data-cfemail="5f353037313b303a1f3a273e322f333a713c3032">
															{newData?.email}
														</a>
													</p>
												</div>
												<div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
														Mobile
													</p>
													<p class="col-sm-9">{newData?.phoneNumber}</p>
												</div>
												<div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
														Level
													</p>
													<p class="col-sm-9">{newData?.level}</p>
												</div>
												<div class="row">
													<p class="col-sm-3 text-muted text-sm-end mb-0">
														Address
													</p>
													<p class="col-sm-9 mb-0">
														{newData?.address}
														<br />
														{/* Miami,
														<br />
														Florida - 33165,
														<br />
														United States. */}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3">
										<div class="card">
											<div class="card-body">
												<h5 class="card-title d-flex justify-content-between">
													<span>Student Type</span>
													<a class="edit-link" href="#">
														<i class="far fa-edit me-1"></i> Edit
													</a>
												</h5>
												<button class="btn btn-success" type="button">
													<i class="fe fe-check-verified"></i>{" "}
													{newData?.programmeName}
												</button>
											</div>
										</div>

										{/* <div class="card">
											<div class="card-body">
												<h5 class="card-title d-flex justify-content-between">
													<span>Skills </span>
													<a class="edit-link" href="#">
														<i class="far fa-edit me-1"></i> Edit
													</a>
												</h5>
												<div class="skill-tags">
													<span>Html5</span>
													<span>CSS3</span>
													<span>WordPress</span>
													<span>Javascript</span>
													<span>Android</span>
													<span>iOS</span>
													<span>Angular</span>
													<span>PHP</span>
												</div>
											</div>
										</div> */}
									</div>
								</div>
							</div>

							<div id="password_tab" class="tab-pane fade">
								<div class="card">
									<div class="card-body">
										<h5 class="card-title">Change Password</h5>
										<div class="row">
											<div class="col-md-10 col-lg-6">
												<form>
													<div class="form-group">
														<label>Old Password</label>
														<input type="password" class="form-control" />
													</div>
													<div class="form-group">
														<label>New Password</label>
														<input type="password" class="form-control" />
													</div>
													<div class="form-group">
														<label>Confirm Password</label>
														<input type="password" class="form-control" />
													</div>
													<button class="btn btn-primary" type="submit">
														Save Changes
													</button>
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
	);
}
