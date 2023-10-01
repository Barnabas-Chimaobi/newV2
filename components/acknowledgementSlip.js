import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Constant } from '../constant';
import QRCode from "react-qr-code"
import jsPDF from "jspdf";
import { ACKNOWLEDGEMENTPAGE } from '@/pages/api/queries/applicant';
import Image from 'next/image';


import Loader from "./loadingpage";

export default function AcknowledgementSlip({ data }) {

    const [details, setDetails] = useState("")
    const [loading, setloading] = useState(true);

    const [Acknowledgement, { loading: AcknowledgementLoad, error: AcknowledgementError, data: AcknowledgementData }] = useLazyQuery(ACKNOWLEDGEMENTPAGE);
    const pageFunc = async (Number) => {
        console.log(Number, "number ......")
        try {
            const Response = await Acknowledgement({
                variables: {
                    applicationformid: parseInt(Number)
                }
            });
            console.log(Response);
            setDetails(Response?.data?.acknowledgementPage);
            setloading(false);
        } catch (error) {
            console.error('Error fetching slip:', error);
        }
    };


    useEffect(() => {

        pageFunc(data);
    }, [data]);


    const exportPdf = async () => {
        // setShowReceipt(true);
        var doc = new jsPDF("portrait", "pt", "A2");
        setTimeout(() => {
            let getReciept = document.getElementById("printableArea");
            if (getReciept != null) {
                doc.html(document.getElementById("printableArea"), {
                    callback: function (doc) {
                        doc.save("Invoice");
                    },
                });
                // setShowReceipt(false)
                // setLoaderPrint(false)
            }
        }, 2000);
    };

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
        const style = document.createElement('style');
        style.type = 'text/css';
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
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = printStyles;

        // Append the style element to the document head
        document.head.appendChild(style);

    };

    const print = () => {
        setPrintStyles()
        window.print("#printableArea")
        showPrint()
    }


    return (
        <div>
            {loading ?
                <Loader /> :
                <div id="printableArea">
                    <div className="content container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="card invoice-info-card" >
                                    <div className="card-body">
                                        <div className="invoice-item invoice-item-one">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="invoice-logo">
                                                        <img src={Constant.SCHOOL_LOGO} alt="logo" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="invoice-info">
                                                        <h6 className="invoice-name">{Constant.SCHOOL_NAME}</h6>
                                                        <p className="invoice-details">
                                                            {Constant.SCHOOL_ADDRESS}
                                                        </p>
                                                        <p className="invoice-details">{Constant.SCHOOL_EMAIL}</p>
                                                        <p className="invoice-details">{Constant.SCHOOL_PHONE}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-head mb-4">
                                                <h2 className='text-center'>{details?.sessionName} Acknowledgement Slip</h2>
                                            </div>
                                            <div className='d-flex p-3 mx-auto'>
                                                <div className='col-4'>
                                                    <p>FullName</p>
                                                    <h4>{details?.fullName}</h4>

                                                    <p>Exam Number</p>
                                                    <h4>{details?.examNumber}</h4>
                                                    <p>Programme</p>
                                                    <h4>{details?.programmeName}</h4>

                                                </div>
                                                <div className='col-4'>
                                                    <p>Application Form Number</p>
                                                    <h4>{details?.applicationFormNumber}</h4>
                                                    <p>Department</p>
                                                    <h4>{details?.departmentName}</h4>
                                                    <p>Email</p>
                                                    <h4>{details?.email}</h4>
                                                </div>
                                                <div className='col-4 mt-n5'>


                                                    <img src={details?.person?.passportUrl} alt="Passport"
                                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                        width={500}
                                                        height={400} />




                                                </div>

                                            </div>
                                        </div>
                                        {details?.fieldGroupForPages.map((item, x) => {
                                            if (!(item?.pageName.includes("O-Level") || item?.pageName.includes("Passport"))) {
                                                return (
                                                    <div className="row mx-auto">

                                                        <h4> {item?.pageName}</h4>

                                                        {item?.fields.map((itemx, y) => {

                                                            return (
                                                                <div className='col-4 p-3'>
                                                                    <p>{itemx?.key}</p>
                                                                    <p className="fw-bold">{itemx?.response}</p>
                                                                </div>
                                                            )
                                                        })}

                                                    </div>
                                                )
                                            }
                                        })
                                        }

                                        <div className="invoice-item invoice-item-one">
                                        </div>
                                        <div className='row mx-auto'>
                                            <h4>O-level Result</h4>
                                            {details?.olevelResultCombination.map((item, x) => {
                                                if (item?.examNumber != null) {
                                                    return (
                                                        <div className='col-6 p-3'>
                                                            <div className='p-4'>
                                                                <h6 className='fw-bold'>{x == 0 ? "First Sitting" : "Second Sitting"}</h6>
                                                            </div>
                                                            <div className='p-4'>
                                                                <h6>Exam Number</h6>
                                                                <h5>{item?.examNumber}</h5>
                                                            </div>
                                                            <div className='p-4'>
                                                                <h6>Type</h6>
                                                                <h5>{item?.olevelType}</h5>
                                                            </div>
                                                            <div className='p-4'>
                                                                <div className=''>

                                                                    <table>
                                                                        <thead>
                                                                            <td> <b>Subject</b></td>
                                                                            <td><b>Grade</b></td>
                                                                        </thead>
                                                                        <tbody>
                                                                            {item?.olevelResultCombinationDetails?.map((val, x) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td>
                                                                                            {val?.subject}
                                                                                        </td>
                                                                                        <td> {val?.grade}</td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                            }
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                            })}




                                        </div>
                                        <div className='col-12 mt-n5'>
                                            <div
                                                className=''
                                                style={{
                                                    height: 100,
                                                    margin: "0 auto",
                                                    // maxWidth: 64,
                                                    width: 100,
                                                }}>
                                                <QRCode
                                                    size={256}
                                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                    value={Constant.BASE_URL + "/common/acknowledgementslip/" + data}
                                                    viewBox={`0 0 256 256`}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='pb-4 mb-5' id='printButton'>

                                    <div className='col-auto text-end float-end ms-auto download-grp' onClick={() => print()}>
                                        <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download" ></i> Print Invoice</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}
