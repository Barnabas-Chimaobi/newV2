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

			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container">
					<a class="navbar-brand me-2" href="https://mdbgo.com/">
						<img
							src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
							height="16"
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
								<a class="nav-link" href="#">
									Dashboard
								</a>
							</li>
						</ul>

						<div class="d-flex align-items-center">
							<button type="button" class="btn btn-link px-3 me-2">
								Login
							</button>
							<button type="button" class="btn btn-primary me-3">
								Sign up for free
							</button>
							<a
								class="btn btn-dark px-3"
								href="https://github.com/mdbootstrap/mdb-ui-kit"
								role="button">
								<i class="fab fa-github"></i>
							</a>
						</div>
					</div>
				</div>
			</nav>

			<div
				id="carouselExampleCaptions"
				class="carousel slide"
				data-mdb-ride="carousel">
				<div class="carousel-indicators">
					<button
						type="button"
						data-mdb-target="#carouselExampleCaptions"
						data-mdb-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"></button>
					<button
						type="button"
						data-mdb-target="#carouselExampleCaptions"
						data-mdb-slide-to="1"
						aria-label="Slide 2"></button>
					<button
						type="button"
						data-mdb-target="#carouselExampleCaptions"
						data-mdb-slide-to="2"
						aria-label="Slide 3"></button>
				</div>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img
							src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
							class="d-block w-100"
							alt="Wild Landscape"
						/>
						<div class="carousel-caption d-none d-md-block">
							<h5>First slide label</h5>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</div>
					</div>
					<div class="carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
							class="d-block w-100"
							alt="Camera"
						/>
						<div class="carousel-caption d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div class="carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
							class="d-block w-100"
							alt="Exotic Fruits"
						/>
						<div class="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>
								Praesent commodo cursus magna, vel scelerisque nisl consectetur.
							</p>
						</div>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-mdb-target="#carouselExampleCaptions"
					data-mdb-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-mdb-target="#carouselExampleCaptions"
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
				className=" container bg-green-700 p-5 col-lg-6 col-sm-6 mb-8 "
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

			<div class="d-flex justify-content-center col-md-6">
				<div class="card mb-3 ">
					<div class="row g-0">
						<div class="col-md-4">
							<img
								src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
								alt="Trendy Pants and Shoes"
								class="img-fluid rounded-start"
							/>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								{/* <h5 class="card-title">Card title</h5> */}
								<p class="card-text">
									<p>
										{" "}
										Enter correct information only and ensure that you do not
										spell your names wrongly.
									</p>
									<p>
										Note that your information and personal details are linked
										to your Confirmation Order Number, your invoice number and
										the form you purchase.{" "}
									</p>

									<p>
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
								<p class="card-text">
									<small class="text-muted">Last updated 3 mins ago</small>
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

			<footer class="bg-dark text-center text-white">
				<div class="container p-4 pb-0">
					<section class="">
						<form action="">
							<div class="row d-flex justify-content-center">
								<div class="col-auto">
									<p class="pt-2">
										<strong>Sign up for our newsletter</strong>
									</p>
								</div>

								<div class="col-md-5 col-12">
									<div class="form-outline form-white mb-4">
										<input
											type="email"
											id="form5Example29"
											class="form-control"
										/>
										<label class="form-label" for="form5Example29">
											Email address
										</label>
									</div>
								</div>

								<div class="col-auto">
									<button type="submit" class="btn btn-outline-light mb-4">
										Subscribe
									</button>
								</div>
							</div>
						</form>
					</section>
				</div>

				<div
					class="text-center p-3"
					style={{ backgroundColor: "background-color: rgba(0, 0, 0, 0.2)" }}>
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
