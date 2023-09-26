import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header>
        <div className="">
          <div className="">
            <div class="">
              <div class="">
                <div class="">
                  <div class="container">
                    <div
                      id="myCarousel"
                      class="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <ol class="carousel-indicators">
                        <li
                          data-bs-target="#myCarousel"
                          data-bs-slide-to="0"
                          class="active"
                        ></li>
                        <li
                          data-bs-target="#myCarousel"
                          data-bs-slide-to="1"
                        ></li>
                        <li
                          data-bs-target="#myCarousel"
                          data-bs-slide-to="2"
                        ></li>
                      </ol>

                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="assets/img/rectorImg.jpeg"
                            alt="Image 1"
                            class="d-block w-100"
                          />
                          <div class="carousel-caption mt-2">
                            <h3 className="text-white"> WELCOME TO</h3>
                            <h2 className="font-bold text-white">
                              FEDERAL POLYTECHNIC ILARO STUDENT PORTAL
                            </h2>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <img
                            src="assets/img/rectorImg.jpeg"
                            alt="Image 2"
                            class="d-block w-100"
                          />
                          <div class="carousel-caption">
                            <h3>Slide 2</h3>
                            <p>Description for Slide 2</p>
                          </div>
                        </div>
                        <div class="carousel-item">
                          <img
                            src="assets/img/rectorImg.jpeg"
                            alt="Image 3"
                            class="d-block w-100"
                          />
                          <div class="carousel-caption">
                            <h3>Slide 3</h3>
                            <p>Description for Slide 3</p>
                          </div>
                        </div>
                      </div>

                      <a
                        class="carousel-control-prev"
                        href="#myCarousel"
                        role="button"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </a>
                      <a
                        class="carousel-control-next"
                        href="#myCarousel"
                        role="button"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-green-700 w-50 h-25 p-5"
                  style={{
                    marginTop: -50,
                    position: "relative",
                    float: "right",
                  }}
                >
                  <div class="row">
                    <div class="col-3">
                      <p class="text-white">Generate Invoice</p>
                    </div>
                    <div class="col-3">
                      <p class="text-white">Check Result</p>
                    </div>
                    <div class="col-3">
                      <p class="text-white">Search Result</p>
                    </div>
                    <div class="col-3">
                      <p class="text-white">Application Status</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white">
                  <div className="mx-auto text-center">
                    <h2 className="text-green-700 p-5 pt-5">
                      Rector's Welcome Message
                    </h2>
                    <div>
                      <div>
                        <img
                          src="assets/img/rectorImg.jpeg"
                          className="w-50 h-50"
                        />
                      </div>
                      <div>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white mb-5">
                  <div className="p-5">
                    <img src="assets/img/footerImg.png" />
                    <h3 className="p-4 text-white" style={{ marginTop: -150 }}>
                      If you experience any difficulties or issues kindly call
                      07088391544 , 09059424123 , 09053630262 or email
                      support@lloydant.com, For transcript related call
                      08104593133
                    </h3>
                  </div>
                </div>
                <div className="w-100 bg-green-700 h-25 p-2">
                  <p className="text-right text-white">
                    © 2023 THE FEDERAL POLYTECHNIC ILARO All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
}
