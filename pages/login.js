import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { STAFF_LOGIN } from "./api/mutations/authMutation";
import { useRouter } from "next/router";
import Script from "next/script";
import DashboardAdmin from "./admin/dashboard";
import Spinner from "@/components/spinner";
import Header from "@/components/header";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState("");

	const router = useRouter();

	const [login, { loading: loginLoad, error: loginError, data: loginData }] =
		useMutation(STAFF_LOGIN);

	const loginFunc = async () => {
		if (username == "" || password == "") {
			toast.error("Please provide username and password");
		} else {
			setIsLoading(true);
			try {
				const payLoad = await login({
					variables: {
						username: username,
						password: password,
					},
				});
				localStorage.clear();
				localStorage.setItem("authToken", payLoad?.data?.staffLogin?.authToken);
				toast.success("Login Successful");
				setIsLoading(false);
				console.log(payLoad, "payLoad");
				if (payLoad?.data?.staffLogin?.role === "Administrator") {
					router.push("./admin/dashboard");
				} else {
					router.push("./student");
				}
			} catch (err) {
				toast.error(err.message);
			}
		}
	};
	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="main-wrapper login-body">
					<Header />
					<div className="login-wrapper">
						<div className="container">
							<div className="loginbox">
								<div className="login-left">
									<img
										className="img-fluid"
										src="assets/img/login.png"
										alt="Logo"
									/>
								</div>
								<div className="login-right">
									<div className="login-right-wrap">
										<h1>Hi, Welcome Back!</h1>
										<p className="account-subtitle">
											Sign in using your personalized account to access more
											features of the portal
										</p>

										<form action="https://preschool.dreamguystech.com/template/index.html">
											<div className="form-group">
												<label>
													Username <span className="login-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => setUsername(e.target.value)}
												/>
												<span className="profile-views">
													<i className="fas fa-user-circle"></i>
												</span>
											</div>
											<div className="form-group">
												<label>
													Password <span className="login-danger">*</span>
												</label>
												<input
													className="form-control pass-input"
													type="text"
													onChange={(e) => setPassword(e.target.value)}
												/>
												<span className="profile-views feather-eye toggle-password"></span>
											</div>
											<div className="forgotpass">
												<div className="remember-me">
													<label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
														{" "}
														Remember me
														<input type="checkbox" name="radio" />
														<span className="checkmark"></span>
													</label>
												</div>
												<a href="forgot-password.html">Forgot Password?</a>
											</div>
											<div className="form-group">
												<button
													className="btn btn-primary btn-block"
													type="button"
													onClick={() => loginFunc()}>
													Login
												</button>
											</div>
										</form>

										<div className="login-or">
											<span className="or-line"></span>
											<span className="span-or">or</span>
										</div>

										<div className="social-login">
											<a href="#">
												<i className="fab fa-google-plus-g"></i>
											</a>
											<a href="#">
												<i className="fab fa-facebook-f"></i>
											</a>
											<a href="#">
												<i className="fab fa-twitter"></i>
											</a>
											<a href="#">
												<i className="fab fa-linkedin-in"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
