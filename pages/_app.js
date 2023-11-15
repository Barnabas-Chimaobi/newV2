"use client";
import AdminLayout from "../components/AdminLayout";
import StudentLayout from "../components/StudentLayout";
import Script from "next/script";
import "../public/assets/css/bootstrap-datetimepicker.min.css";
import "../public/assets/css/ckeditor.css";
import "../public/assets/css/feather.css";
import "../public/assets/css/google.css";
import "../public/assets/plugins/bootstrap/css/bootstrap.min.css";
import "../public/assets/plugins/feather/feather.css";
import "../public/assets/plugins/icons/flags/flags.css";
import "../public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "../public/assets/plugins/fontawesome/css/all.min.css";
import "../public/assets/plugins/select2/css/select2.min.css";
import "../public/assets/css/style.css";
import "../styles/Home.module.css";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
import { client } from "../pages/api";
import { useApolloClient } from "@apollo/client";
import Generateapplicationinvoice from "../components/generateapplicationinvoice";
import indexpagelayout from "../components/indexpagelayout";
import Toaster from "../components/toast/toaster";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Table from "../components/table";
import { useRouter } from "next/router";
import ErrorBoundary from "./error";
import store from "../redux/stores";
import { Provider } from "react-redux";
import { Poppins, Rubik } from "next/font/google";

const poppins = Rubik({
	subsets: ["latin"],
	weight: "400",
});

export default function Home({ Component, pageProps }) {
	const router = useRouter();
	const rootPath = router.pathname.split("/");
	//console.log(pathname, "router====sss");
	//console.log(pageProps, Component, "Page propssss")
	// const rootPath = pathname?.split("/");
	//console.log(rootPath, router.pathname, "Root pathjhh");

	if (rootPath && rootPath[1] == "admin") {
		return (
			<>
				{/* <Script
					src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
					strategy="beforeInteractive"></Script> */}
				<Script
					src="/js/jquery-3.6.0.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
					strategy="beforeInteractive"></Script>
				<Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/slimscroll/jquery.slimscroll.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/select2/js/select2.min.js"
					strategy="beforeInteractive"></Script>

				<Script src="/js/script.js"></Script>
				<Provider store={store}>
					<ApolloProvider client={client}>
						<AdminLayout>
							<ErrorBoundary>
								<main className={poppins.className}>
									<Component {...pageProps} />
								</main>
							</ErrorBoundary>
						</AdminLayout>
					</ApolloProvider>
				</Provider>
			</>
		);
	}

	if (rootPath && rootPath[1] === "student") {
		return (
			<>
				{/* <Provider store={store}> */}
				{/* <Script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js" strategy="beforeInteractive"></Script>
				<Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" strategy="beforeInteractive"></Script>
				<Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script> */}
				<Script
					src="/js/jquery-3.6.0.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
					strategy="beforeInteractive"></Script>
				<Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/slimscroll/jquery.slimscroll.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/select2/js/select2.min.js"
					strategy="beforeInteractive"></Script>

				<Script src="/js/script.js" strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/apexchart/apexcharts.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/apexchart/chart-data.js"
					strategy="beforeInteractive"></Script>

				<Script
					src="/plugins/simple-calendar/jquery.simple-calendar.js"
					strategy="beforeInteractive"></Script>
				<Script src="/js/calander.js" strategy="beforeInteractive"></Script>

				<Script
					src="/js/circle-progress.min.js"
					strategy="beforeInteractive"></Script>
				<Provider store={store}>
					<ApolloProvider client={client}>
						<StudentLayout>
							<ErrorBoundary>
								<main className={poppins.className}>
									<Component {...pageProps} />
								</main>
							</ErrorBoundary>
						</StudentLayout>
					</ApolloProvider>
				</Provider>
			</>
		);
	}

	if (rootPath && rootPath[1] === "admission") {
		return (
			<>
				<Script
					src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
					strategy="beforeInteractive"></Script>
				{/* <Script
					src="/js/jquery-3.6.0.min.js"
					strategy="beforeInteractive"></Script> */}
				{/* <Script
					src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
					strategy="beforeInteractive"></Script> */}
				<Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/slimscroll/jquery.slimscroll.min.js"
					strategy="beforeInteractive"></Script>
				<Script
					src="/plugins/select2/js/select2.min.js"
					strategy="beforeInteractive"></Script>

				<Script src="/js/script.js" strategy="beforeInteractive"></Script>
				<Provider store={store}>
					<ApolloProvider client={client}>
						{/* <ThemeProvider> */}
						<AdminLayout>
							<ErrorBoundary>
								<main className={poppins.className}>
									<Component {...pageProps} />
								</main>
							</ErrorBoundary>
						</AdminLayout>
						{/* </ThemeProvider> */}
					</ApolloProvider>
				</Provider>
			</>
		);
	}
	// if (rootPath && rootPath[1] === "") {
	// 	return (
	// 		<>
	// 			<Script
	// 				src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
	// 				strategy="beforeInteractive"></Script>

	// 			<Provider store={store}>
	// 				<ApolloProvider client={client}>
	// 					<ErrorBoundary>
	// 						<main className={poppins.className}>
	// 							<Component {...pageProps} />
	// 						</main>
	// 					</ErrorBoundary>
	// 				</ApolloProvider>
	// 			</Provider>
	// 		</>
	// 	);
	// }

	return (
		<>
			{/* <Script
				src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"
				strategy="beforeInteractive"></Script>
			<Script
				src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
				strategy="beforeInteractive"></Script>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
				strategy="beforeInteractive"></Script> */}
			<Script
				src="/js/jquery-3.6.0.min.js"
				strategy="beforeInteractive"></Script>
			<Script
				src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
				strategy="beforeInteractive"></Script>
			<Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
			<Script
				src="/plugins/slimscroll/jquery.slimscroll.min.js"
				strategy="beforeInteractive"></Script>
			<Script
				src="/plugins/select2/js/select2.min.js"
				strategy="beforeInteractive"></Script>

			<Script src="/js/script.js" strategy="beforeInteractive"></Script>
			{/* <Script src="/js/jquery.js"></Script> */}
			{/* <Script
				src="https://code.jquery.com/jquery-1.9.1.min.js"
				integrity="sha256-wS9gmOZBqsqWxgIVgA8Y9WcQOa7PgSIX+rPA0VL2rbQ="
				strategy="beforeInteractive"
				crossorigin="anonymous"></Script> */}
			{/* <Script
				type="text/javascript"
				src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></Script> */}

			{/* <Script src="/js/feather.min.js" strategy="beforeInteractive"></Script> */}
			{/* <Script
				src="/plugins/slimscroll/jquery.slimscroll.min.js"
				strategy="beforeInteractive"></Script> */}
			{/* <Script
				src="/plugins/select2/js/select2.min.js"
				strategy="beforeInteractive"></Script>
			<Script src="/js/script.js" strategy="beforeInteractive"></Script>
			<Script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></Script> */}
			{/* <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></Script> */}
			{/* <Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
				strategy="beforeInteractive"></Script> */}
			{/* <Script
				src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
				strategy="beforeInteractive"></Script> */}
			{/* <Script
				src="/js/jquery-3.6.0.min.js"
				strategy="beforeInteractive"></Script> */}
			{/* <Script src="/js/bootstrap.min.js" strategy="beforeInteractive"></Script> */}
			{/* <Script
				src="/js/owl.carousel.min.js"
				strategy="beforeInteractive"></Script>
			<Script src="/js/smoothscroll.js" strategy="beforeInteractive"></Script>
			<Script src="/js/custom.js"></Script> */}
			<Provider store={store}>
				<ApolloProvider client={client}>
					<ErrorBoundary>
						{/* <ReportView /> */}
						<main className={poppins.className}>
							<Component {...pageProps} />
						</main>
					</ErrorBoundary>
				</ApolloProvider>
			</Provider>
		</>
	);
}
