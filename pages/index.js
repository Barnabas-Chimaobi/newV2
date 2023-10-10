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

import formatTime from "@/components/timeconverter";

const Home = () => {
	console.log(formatTime("2023-10-27T12:20:44.875-07:00"))
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
					router.push("./student/dashboard");
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
			{/* <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
			<link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
			<link rel="stylesheet" href="/assets/css/owl.carousel.css" />
			<link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
			<link rel="stylesheet" href="/assets/css/templatemo-style.css" /> */}
			<link
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				rel="stylesheet"
			/>
			<link
				href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.2/mdb.min.css"
				rel="stylesheet"
			/>

			{isLoading && <Spinner />}
			{/* <div class=""> */}
			{/* <HeaderLanding /> */}
			<nav
				class="navbar navbar-expand-lg navbar-light"
				style={{ backgroundColor: "#E0A30C" }}>
				<div class="container-fluid">
					{/* <a class="navbar-brand" href="#">
						Navbar
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<i class="fas fa-bars"></i>
					</button> */}
					<div
						class="collapse navbar-collapse justify-content-end mr-8"
						id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item">
								<a
									class="nav-link text-white pr-5"
									aria-current="page"
									href="#">
									School Website
								</a>
							</li>

							<li class="nav-item">
								<a class="nav-link text-white" href="#">
									Staff portal
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container">
					<a class="navbar-brand me-2" href="https://mdbgo.com/">
						<img
							src={Constant.SCHOOL_LOGO}
							height="35"
							alt="MDB Logo"
							loading="lazy"
						// style="margin-top: -1px;"
						/>
					</a>

					<button
						class="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarButtonsExample"
						aria-controls="navbarButtonsExample"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<i class="fas fa-bars"></i>
					</button>

					<div class="collapse navbar-collapse" id="navbarButtonsExample">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a style={{ marginBottom: 0 }} class="nav-link" href="#">
									<p
										class="text-black font-bold"
										style={{ fontSize: 16, marginBottom: 0 }}>
										{Constant.SCHOOL_NAME}
									</p>
									<p
										class="text-black font-bold"
										style={{ fontSize: 12, marginBottom: 0 }}>
										{Constant.SCHOOL_ADDRESS}
									</p>
								</a>
							</li>
						</ul>

						<div class="d-flex  col-sm-6 col-lg-3">
							<button
								class="btn btn-link text-black  dropdown-toggle"
								// type="button"
								// id="dropdownMenuButton"
								// data-mdb-toggle="dropdown"
								aria-expanded="false">
								Returning Students
							</button>
							<div class="dropdown">
								<button
									class="btn btn-link text-black  dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-mdb-toggle="dropdown"
									aria-expanded="false">
									Applicant
								</button>

								<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<li>
										<a class="dropdown-item" href="#">
											Application Guide
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Course Finder
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="/applicant/applicationform">
											Manage Application
										</a>
									</li>
								</ul>
							</div>

							<a class="btn btn-link px-3 me-2" href="./login">
								Login
							</a>
						</div>
					</div>
				</div>
			</nav>

			<div
				id="carouselExampleCrossfade"
				class="carousel slide carousel-fade"
				data-mdb-ride="carousel">
				<div class="carousel-indicators justify-content-start">
					<button
						type="button"
						data-mdb-target="#carouselExampleCrossfade"
						data-mdb-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"></button>
					<button
						type="button"
						data-mdb-target="#carouselExampleCrossfade"
						data-mdb-slide-to="1"
						aria-label="Slide 2"></button>
					<button
						type="button"
						data-mdb-target="#carouselExampleCrossfade"
						data-mdb-slide-to="2"
						aria-label="Slide 3"></button>
				</div>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<div class="carousel-caption text-left mb-8">
							<p className="" style={{ opacity: 0.7 }}>
								WELCOME TO
							</p>
							<h5
								className="text-white text-bold"
								style={{ fontSize: 28, width: 500 }}>
								FEDERAL POLYTECHNIC ILARO STUDENT PORTAL
							</h5>
							<a
								onClick={() => router.push("./login")}
								// type="button"
								class="btn-click btn px-5 mt-3 me-2">
								Sign In
							</a>
						</div>
						<img
							src={Constant.ILAROGATE}
							class="d-block w-100 h-50"
							alt="Wild Landscape"
						/>
					</div>
					<div class="carousel-item">
						<div class="carousel-caption text-left mb-8">
							<h5
								className="text-white text-bold"
								style={{ fontSize: 28, width: 500 }}>
								START YOUR JOURNEY TO SUCCESS WITH OUR PRESTIGEOUS SCHOOL
							</h5>
							<p className="" style={{ opacity: 0.7 }}>
								Our online courses are built in partnership with technology
								leaders and are designed to meet industry demands.
							</p>
							<a
								onClick={() => router.push("./login")}
								type="button"
								class="btn-click btn mt-3 px-5 me-2">
								Sign In
							</a>
						</div>
						<img
							src={Constant.ILARO11}
							class="d-block w-100 h-50"
							alt="Camera"
						/>
					</div>
					<div class="carousel-item">
						<div class="carousel-caption text-left mb-8">
							<h5
								className="text-white text-bold"
								style={{ fontSize: 28, width: 500 }}>
								Efficient Learning Methods
							</h5>
							<p className="" style={{ opacity: 0.7 }}>
								We have the best facility to enhance distance learning through
								improved technology.
							</p>
							<a
								onClick={() => router.push("./login")}
								type="button"
								class="btn-click btn  mt-3 px-5 me-2">
								Sign In
							</a>
						</div>
						<img
							src={Constant.ILARO2}
							class="d-block w-100 h-50"
							alt="Exotic Fruits"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-mdb-target="#carouselExampleCrossfade"
					data-mdb-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-mdb-target="#carouselExampleCrossfade"
					data-mdb-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
			{/* <Carousel
				value={product}
				numVisible={1}
				numScroll={1}
				responsiveOptions={responsiveOptions}
				className="custom-carousel"
				circular
				autoplayInterval={5000}
				itemTemplate={productTemplate}
			/> */}
			<div
				className="col-lg-6 col-sm-6 mb-8 "
				style={{
					position: "relative",
					float: "right",
					marginTop: -40,
					zIndex: 5,
				}}>
				<div class="nav-center  bg-green-700 p-5 py-3  d-flex flex-direction-row justify-content-around">
					<div class=" p-2">
						<a href="#" class="col-3:text-sm text-white font-bold">
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
			<div class=" container flex justify-content-center col-lg-9">
				<p class="font-bold pb-10">INSTRUCTIONS</p>
			</div>
			<div class=" container flex justify-content-center col-lg-9">
				<div class="card mb-3 ">
					<div class="row g-0" style={{ backgroundColor: "#2A166D" }}>
						<div class="col-md-3">
							<img
								style={{ width: 320, height: 320 }}
								src={Constant.Rectangle}
								alt="Trendy Pants and Shoes"
								class="img-fluid rounded-start d-block w-100"
							/>
						</div>
						<div class="col-md-8" style={{ backgroundColor: "#2A166D" }}>
							<div class="card-body">
								{/* <h5 class="card-title">Card title</h5> */}
								<p class="card-text">
									<p className="text-yellow-500">
										{" "}
										Enter correct information only and ensure that you do not
										spell your names wrongly.
									</p>
									<p className="text-white">
										Note that your information and personal details are linked
										to your Confirmation Order Number, your invoice number and
										the form you purchase.{" "}
									</p>

									<p className="text-white">
										You would not be able to correct or change the information
										with which you obtain your Confirmation Order Number, your
										invoice and or your Application form after submitting that
										information or purchasing the form. If you make any mistake,
										do not use the Confirmation Order Number or invoice so
										generated to obtain a form. Rather, generate another number
										and invoice with your correct information and proceed with
										those details.
									</p>
								</p>
								<p className="text-white">
									<small class=" text-white">Last updated 3 mins ago</small>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <section>
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
			</section> */}

			<div class="container-fluid">
				<div className="image bg-white mb-5">
					<div className="imagecontact">
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
			</div>

			<footer
				style={{ backgroundColor: "#047735" }}
				class="container-fluid  text-center text-white">
				<div
					class="container-fluid text-center"
					style={{ backgroundColor: "#047735" }}>
					© 2023 Copyright:
					<a class="text-white" href="https://mdbootstrap.com/">
						Lloydant
					</a>
				</div>
			</footer>

			{/* <div>
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
			</div> */}
			<Script
				type="text/javascript"
				src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.2/mdb.min.js"></Script>

			{/* </div> */}
		</>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
