import React, { useEffect, useState } from "react";
import { Constant } from "@/constant";
import dynamic from "next/dynamic";
import HeaderLanding from "@/components/headeLanding";
import Login from "./login";
import Script from "next/script";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { STAFF_LOGIN } from "./api/mutations/authMutation";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "@/components/spinner";

// import "../public/assets/css/bootstrap.min.css";
// import "../public/assets/css/font-awesome.min.css";
// import "../public/assets/css/owl.carousel.css";
// import "../public/assets/css/owl.theme.default.min.css";
// import "../public/assets/css/templatemo-style.css";

const Home = () => {
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
				localStorage.setItem(
					"passport",
					payLoad?.data?.staffLogin?.passportUrl
				);
				localStorage.setItem("fullName", payLoad?.data?.staffLogin?.fullName);
				localStorage.setItem(
					"matricNumber",
					payLoad?.data?.staffLogin?.username
				);
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

	const product = [
		{ image: Constant.ILAROGATE, id: 1 },
		{ image: Constant.ILARO11, id: 2 },
		{ image: Constant.ILARO2, id: 3 },
	];
	const responsiveOptions = [
		{
			breakpoint: "1199px",
			numVisible: 1,
			numScroll: 1,
		},
		{
			breakpoint: "991px",
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: "767px",
			numVisible: 1,
			numScroll: 1,
		},
	];

	const productTemplate = (product) => {
		return product.id == 1 ? (
			<div className="imagebg slides border-1 surface-border border-round m-2 text-center py-5 px-3 col-lg-12 col-md-12 col-sm-12">
				<div className="mb-3 main">
					<div class="caption">
						<div class="container">
							<div class="col-md-6 col-sm-12">
								<p>WELCOME TO</p>
								<h1>FEDERAL POLYTECHNIC ILARO STUDENT PORTAL</h1>
								<a href="#feature" class=" smoothScroll">
									Sign In
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : product.id == 2 ? (
			<div className="imagebg1 border-1 surface-border border-round m-2 text-center py-5 px-3 col-lg-12 col-md-12 col-sm-12">
				<div className="mb-3">
					<div class="caption">
						<div class="container">
							<div class="col-md-6 col-sm-12">
								<h1>
									START YOUR JOURNEY TO SUCCESS WITH OUR PRESTIGEOUS SCHOOL
								</h1>
								<h3>
									Our online courses are built in partnership with technology
									leaders and are designed to meet industry demands.
								</h3>
								<a
									href="#feature"
									class="section-btn btn btn-default smoothScroll">
									Sign In
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : (
			<div className="imagebg2 border-1 surface-border border-round m-2 text-center py-5 px-3 col-lg-12 col-md-12 col-sm-12">
				<div className="mb-3">
					<div class="caption">
						<div class="container">
							<div class="col-md-6 col-sm-12">
								<h1>Efficient Learning Methods</h1>
								<h3>
									We have the best facility to enhance distance learning through
									improved technology
								</h3>
								<a
									href="#feature"
									class="section-btn btn btn-default smoothScroll">
									Sign In
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			console.log("kjhgfdghj======");
			// Check if the route change was a "back" navigation
			if (shallow) {
				// This means the user navigated away from the page and then came back
				console.log("Navigated back to this page");
			}
		};

		// Listen for route changes
		router.events.on("routeChangeComplete", handleRouteChange);

		// Clean up the event listener when the component unmounts
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, []);

	return (
		<>
			{isLoading && <Spinner />}
			{/* <div class=""> */}
			<HeaderLanding />
			<Carousel
				value={product}
				numVisible={1}
				numScroll={1}
				responsiveOptions={responsiveOptions}
				className="custom-carousel"
				circular
				autoplayInterval={5000}
				itemTemplate={productTemplate}
			/>
			<div
				className=" bg-green-700 p-5 col-lg-6 col-sm-6 "
				style={{
					// marginTop: -50,
					position: "relative",
					float: "right",
					marginRight: 30,
					// alignSelf: "flex-end",
				}}>
				<div class=" d-flex flex-direction-row justify-content-around">
					<div class=" p-2">
						<a href="#" class="text-white font-bold">
							Generate Invoice
						</a>
					</div>
					<div class=" p-2">
						<a href="#" class="text-white font-bold">
							Fill appliction form
						</a>
					</div>

					<div class=" p-2">
						<a href="#" class="text-white font-bold">
							Application Status
						</a>
					</div>
				</div>
			</div>

			<section>
				<div id="feature" class="logins col-lg-10 col-md-6 ">
					<h2 class="fpi">Start your journey to a better future with FPI</h2>
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div>
				<div className="image bg-white mb-5">
					<div className="imagecontact p-5">
						<h3
							className="p-4 text-white"
							style={{
								fontSize: "18px",
								fontWeight: "bold",
								textAlign: "center",
								// marginRight: "500px",
								// marginLeft: "500px",
								// width: "800px",
								// alignSelf: "center",
							}}>
							If you experience any difficulties or issues kindly call
							07088391544 , 09059424123 , 09053630262 or email
							support@lloydant.com, For transcript related call 08104593133
						</h3>
					</div>
				</div>
				<div className="footer w-100 bg-green-700 h-25 p-2">
					<p className="rights-reserved font-bold text-white pt-4">
						© 2023 Lloydant All rights reserved.
					</p>
				</div>
			</div>

			{/* </div> */}
		</>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
