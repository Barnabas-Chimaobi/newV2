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

export default function Home({ Component, pageProps }) {
  const router = useRouter();
  const rootPath = router.pathname.split("/");
  //console.log(pathname, "router====sss");
  //console.log(pageProps, Component, "Page propssss")
  // const rootPath = pathname?.split("/");
  //console.log(rootPath, router.pathname, "Root pathjhh")

  if (rootPath && rootPath[1] == "admin") {
    return (
      <>
        <Script
          src="/js/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
        <Script
          src="/plugins/slimscroll/jquery.slimscroll.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/select2/js/select2.min.js"
          strategy="beforeInteractive"
        ></Script>

        <Script src="/js/script.js"></Script>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AdminLayout>
              <ErrorBoundary>
                <Component {...pageProps} />
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
        <Script
          src="/js/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
        <Script
          src="/plugins/slimscroll/jquery.slimscroll.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/select2/js/select2.min.js"
          strategy="beforeInteractive"
        ></Script>

        <Script src="/js/script.js" strategy="beforeInteractive"></Script>
        <Script
          src="/plugins/apexchart/apexcharts.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/apexchart/chart-data.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/plugins/simple-calendar/jquery.simple-calendar.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="/js/calander.js" strategy="beforeInteractive"></Script>

        <Script
          src="/js/circle-progress.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StudentLayout>
              <ErrorBoundary>
                <Component {...pageProps} />
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
          src="/js/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
        <Script
          src="/plugins/slimscroll/jquery.slimscroll.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/plugins/select2/js/select2.min.js"
          strategy="beforeInteractive"
        ></Script>

        <Script src="/js/script.js" strategy="beforeInteractive"></Script>
        <Provider store={store}>
          <ApolloProvider client={client}>
            {/* <ThemeProvider> */}
            <AdminLayout>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </AdminLayout>
            {/* </ThemeProvider> */}
          </ApolloProvider>
        </Provider>
      </>
    );
  }

  return (
    <>
      <Script
        src="/js/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/js/feather.min.js" strategy="beforeInteractive"></Script>
      <Script
        src="/plugins/slimscroll/jquery.slimscroll.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/select2/js/select2.min.js"
        strategy="beforeInteractive"
      ></Script>

      <Script src="/js/script.js" strategy="beforeInteractive"></Script>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ApolloProvider>
      </Provider>
    </>
  );
}
