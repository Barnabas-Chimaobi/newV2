import React from "react";
import { Constant } from "../constant";
import { useRouter } from "next/router";
import Link from "next/link";

export default function header({ children }) {
	const router = useRouter();

	return (
		<>
			<div className="main-wrapper">
				<div className="header" id="navothercolor">
					<div className="header-left">
						<a href="./" className="logo">
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
									<div className="user-text">
										<p className="text-muted mb-0 text-md">Applicant</p>
									</div>
								</span>
							</a>
							<div className="dropdown-menu">
								<a className="dropdown-item" href="profile.html">
									Application Guide
								</a>

								<a className="dropdown-item" href="login.html">
									Course Finder
								</a>
								<a
									className="dropdown-item"
									href="/applicant/applicationform"
								>
									Manage Application
								</a>
							</div>
						</li>

						<a href="/login" className="dropdown-toggle nav-link">
							<span className="user-img">
								<div className="user-text">
									<p className="text-muted mb-0 text-md">Login</p>
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
