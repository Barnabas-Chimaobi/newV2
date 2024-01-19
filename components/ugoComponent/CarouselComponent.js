import { Constant } from "@/constant";
import Head from "next/head";
import React from "react";

export default function CarouselComponent() {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </Head>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
          <div class="item active">
            <div class="carousel-caption text-left mb-8">
              <p className="" style={{ opacity: 0.7 }}>
                WELCOME TO
              </p>
              <h5
                className="text-white text-bold"
                style={{ fontSize: 28, width: 500 }}>
                ABIA STATE POLYTECHNIC STUDENT PORTAL
              </h5>

              <div className="flex">
                <a
                  href="./login"
                  // onClick={() => router.push("./login")}
                  // type="button"
                  class="btn-click py-2 rounded nav-link px-5 mt-3 me-2">
                  Sign In
                </a>
              </div>
            </div>
            <img
              src={Constant.ILAROGATE}
              class="d-block w-100 h-100"
              alt="Wild Landscape"
            />
          </div>

          <div class="item">
            <img
              src={Constant.ILARO11}
              class="d-block w-100 h-50"
              alt="Camera"
            />
          </div>

          <div class="item">
            <img
              src={Constant.ILARO2}
              class=" d-block w-100 h-50"
              alt="Exotic Fruits"
            />
          </div>
        </div>

        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
