import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { RECEIPT } from "../pages/api/queries/admin";
import { Constant } from "../constant";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import Loader from "./loadingpage";
import Decrypt from "./decrypt";
import Encrypt from "./encrypt";
import NairaFormatter from "./nairaformatter";

export default function Receipt({ invoiceNumber }) {
  const [details, setDetails] = useState("");
  const [loading, setloading] = useState(true);
  const [
    receipt,
    { loading: receiptLoad, error: receiptError, data: receiptData },
  ] = useLazyQuery(RECEIPT);
  // console.log(receiptData?.receipt)
  console.log(invoiceNumber, "invvvvvv");

  // const details = receiptData?.receipt;
  const receiptFunc = async (invoice) => {
    try {
      const receiptResponse = await receipt({
        variables: {
          invoicenumber: invoice,
        },
      });
      // console.log(receiptResponse)
      setDetails(receiptResponse?.data?.receipt);
      setloading(false);
    } catch (error) {
      console.error("Error Receipt invoice:", error);
    }
  };

  useEffect(() => {
    receiptFunc(Decrypt(invoiceNumber));
  }, [invoiceNumber]);

  const setPrintStyles = () => {
    // Define your print-specific styles
    const printStyles = `
          @page {
            size: A3; /* Set paper size to A4 */

          }
          #printButton {
            display: none;
          }

          @media print {
            body {
              transform: scale(1); /* Set your desired scale factor (e.g., 0.7 for 70%) */

            }
          }
        `;

    // Create a new style element
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = printStyles;

    // Append the style element to the document head
    document.head.appendChild(style);
  };

  const showPrint = () => {
    const printStyles = `

        #printButton {
          display: block;
        }


      `;

    // Create a new style element
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = printStyles;

    // Append the style element to the document head
    document.head.appendChild(style);
  };

  const print = () => {
    setPrintStyles();
    window.print("#printableArea");
    showPrint();
  };

  //   useEffect(() => {
  //     receiptFunc();
  //   }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="card invoice-info-card" id="printableArea">
                  <div className="card-body">
                    <div className="invoice-item invoice-item-one">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="invoice-logo">
                            <img src="/assets/img/logo.png" alt="logo" />
                          </div>
                          <div className="invoice-head">
                            <h2>OFFICIAL PAYMENT RECEIPT</h2>
                            <p>Serial Number : {details?.paymentSerial}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="invoice-info">
                            {/* <strong className="customer-text-one">Invoice From</strong> */}
                            <h6 className="invoice-name">
                              {Constant.SCHOOL_NAME}
                            </h6>
                            <p className="invoice-details">
                              {Constant.SCHOOL_ADDRESS}
                            </p>
                            <p className="invoice-details">
                              {Constant.SCHOOL_EMAIL}
                            </p>
                            <p className="invoice-details">
                              {Constant.SCHOOL_PHONE}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-item invoice-item-two">
                      <div className="row justify-space-between">
                        <div className="col-12 col-lg-6">
                          <div className="invoice-info">
                            {/* <strong className="customer-text-one">Billed to</strong> */}
                            <h6 className="invoice-name">
                              <span className="invoice-details invoice-details-two">
                                Name:
                              </span>{" "}
                              {details?.fullName}{" "}
                            </h6>
                            <h6 className="invoice-name">
                              {" "}
                              <span className="invoice-details invoice-details-two">
                                Matric Number:
                              </span>{" "}
                              {details?.matricNumber}
                            </h6>
                            <h6 className="invoice-name">
                              {" "}
                              <span className="invoice-details invoice-details-two">
                                Department:
                              </span>{" "}
                              {details?.departmentName}{" "}
                            </h6>
                            <h6 className="invoice-name">
                              {" "}
                              <span className="invoice-details invoice-details-two">
                                School:
                              </span>{" "}
                              {details?.facultyName}{" "}
                            </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6 float-end">
                          <div className="invoice-info">
                            {/* <strong className="customer-text-one">Billed to</strong> */}
                            <h6 className="invoice-name">
                              <span className="invoice-details invoice-details-two">
                                RRR / CONFIRMATION:
                              </span>{" "}
                            </h6>
                            <h6 className="invoice-name">
                              {" "}
                              <span className="invoice-details invoice-details-two">
                                PAYMENT MODE:
                              </span>{" "}
                              {details?.paymentMode?.payment_Mode_Name}
                            </h6>
                            <h6 className="invoice-name">
                              {" "}
                              <span className="invoice-details invoice-details-two">
                                PAYMENT TYPE:
                              </span>{" "}
                              {details?.paymentType?.paymentTypeName}{" "}
                            </h6>
                            {/* <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>:</span> </h6> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-issues-box">
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="invoice-issues-date">
                            <p>Session : {details?.session?.name}</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="invoice-issues-date">
                            <p>Level :{details?.feeDetail?.level?.name} </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="invoice-issues-date">
                            <p>
                              Date Paid :{" "}
                              {new Date(details?.datePaid).toLocaleDateString()}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-item invoice-table-wrap">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="invoice-table table table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Description</th>
                                  <th>Quantity</th>
                                  <th>Unit Price</th>
                                  <th className="text-end">Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* <tr>
                                                                        <td> {details?.feeDetail?.feeType?.description}</td>
                                                                        <td className='ml-'>1</td>
                                                                        <td > {NairaFormatter(details?.total)}</td>
                                                                        <td className="text-end"> {NairaFormatter(details?.total)}</td>
                                                                    </tr> */}
                                {details?.feeDetail?.fees.map((item, index) => (
                                  <tr>
                                    <td>{item?.name}</td>

                                    <td className="ml-">
                                      {parseInt(index) + 1}
                                    </td>
                                    <td>{NairaFormatter(item?.amount)}</td>
                                    <td className="text-end">
                                      {NairaFormatter(item?.amount)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center justify-content-end">
                      <div className="col-lg-6 col-md-6">
                        <div className="invoice-total-card">
                          <div className="invoice-total-box">
                            <div className="invoice-total-inner">
                              <p className="mb-0">
                                Sub total <span></span>
                              </p>
                            </div>
                            <div className="invoice-total-footer">
                              <h4>
                                Total Amount{" "}
                                <span> {NairaFormatter(details?.total)}</span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div
                        className=""
                        style={{
                          height: 100,
                          margin: "",
                          // maxWidth: 64,
                          width: 100,
                        }}
                      >
                        <QRCode
                          size={256}
                          style={{
                            height: "",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={Encrypt(
                            Constant.BASE_URL +
                              `/common/receipt/` +
                              details?.invoiceNumber
                          )}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                      <div className="mb-5">
                        <div className="invoice-sign text-end">
                          <img
                            className="img-fluid d-inline-block"
                            src="/assets/img/signature.png"
                            alt="sign"
                          />
                          <span className="d-block">Bursar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-4 mb-5">
                  <div
                    className="col-auto text-end float-end ms-auto download-grp"
                    onClick={() => print()}
                    id="printButton"
                  >
                    <a href="#" class="btn btn-outline-primary me-2">
                      <i class="fas fa-download"></i>Print Receipt
                    </a>
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
