import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { STAFF_LOGIN } from "./api/mutations/authMutation";
import { useRouter } from "next/router";
import Script from "next/script";
import DashboardAdmin from "./admin/dashboard";
import Spinner from "@/components/spinner";
import Header from "@/components/header";
import ApplicationFormNav from "@/components/ugoComponent/ApplicationFormNav";

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
        } else if (payLoad?.data?.staffLogin?.role === "Student") {
          router.push("./student/dashboard");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <ApplicationFormNav />
      {/* <Header> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=" main-wrapper login-body ">
          <div className="login-wrapper">
            <div className="container text-center">
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
      )}
      {/* </Header> */}
    </div>
  );
}
