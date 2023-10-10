import React from "react";
import { Constant } from "../constant";
import { useRouter } from "next/router";
import Link from "next/link";

export default function headerLanding({ children }) {
	const router = useRouter();

	return (
		<>
			{/* <div className="main-wrapper"> */}
			<div className="header" id="navothercolor">
				<div>
					<div className="header-left">
						<a href="./" className="logo flex flex-row">
							<img
								src={Constant.SCHOOL_LOGO}
								alt="Logo"
								width={90}
								height={90}
							/>
							<div>
								<h6 className="schoolName">{Constant.SCHOOL_NAME}</h6>
								<h6 className="schoolAddress">{Constant.SCHOOL_ADDRESS}</h6>
							</div>
						</a>
					</div>
				</div>

				<a className="mobile_btn" id="mobile_btn">
					<i className="fas fa-bars" />
				</a>

				<ul className="nav user-menu">
					<li className="nav-item dropdown has-arrow new-user-menus">
						<a
							href="#"
							className="dropdown-toggle nav-link"
							data-bs-toggle="dropdown">
							<span className="user-img">
								<div className="user-text">
									<p className="title text-muted mb-0 text-md">Applicant</p>
								</div>
							</span>
						</a>
						<div className="dropdown-menu">
							<Link className="dropdown-item" href="profile.html">
								Application Guide
							</Link>

							<Link className="dropdown-item" href="login.html">
								Course Finder
							</Link>
							<a className="dropdown-item" href="/applicant/applicationform">
								Manage Application
							</a>
						</div>
					</li>

					{/* <a href="./login" className="dropdown-toggle nav-link">
						<span className="user-img">
							<div className="user-text">
								<p className="text-muted mb-0 text-md">Login</p>
							</div>
						</span>
					</a> */}
				</ul>
			</div>
			{/* </div> */}
		</>
	);
}
