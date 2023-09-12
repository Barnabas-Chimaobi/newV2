import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Constant } from '../constant';
import QRCode from "react-qr-code"
import jsPDF from "jspdf";

export default function AcknowledgementSlip() {

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
                                                    <img src="assets/img/logo.png" alt="logo" />
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
                                            <h2 className='text-center'>2022/2023 FPI Screening Form Acknowledgement Slip</h2>
                                        </div>
                                        <div className='d-flex p-3 mx-auto'>
                                            <div className='col-4'>
                                                <p>Application Form Number</p>
                                                <h4>Application Form Number</h4>
                                            </div>
                                            <div className='col-4'>
                                                <p>Exam Number</p>
                                                <h4>Exam no32</h4>
                                            </div>
                                            <div className='col-4 mt-n5'>
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
                                                        value={""}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="row mx-auto">
                                        <div className='col-4 p-3'>
                                            <p>Full name</p>
                                            <p className="fw-bold">...</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Department</p>
                                            <p className="fw-bold">gmail.com</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Programme</p>
                                            <p className="fw-bold">gmail.com</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Phone</p>
                                            <p className="fw-bold">...</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>State of Origin</p>
                                            <p className="fw-bold">gmail.com</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>L.G.A</p>
                                            <p className="fw-bold">gmail.com</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Email</p>
                                            <p className="fw-bold">gmail.com</p>
                                        </div>

                                    </div>
                                    <div className="invoice-item invoice-item-one">
                                    </div>
                                    <div className='row'>
                                        <div className='col-4 p-3'>
                                            <p>Next of Kin</p>
                                            <p className="fw-bold">...</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Full name</p>
                                            <p className="fw-bold">...</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Contact Address</p>
                                            <p className="fw-bold">...</p>
                                        </div>
                                        <div className='col-4 p-3'>
                                            <p>Phone Number</p>
                                            <h4 className="fw-bold">...</h4>
                                        </div>

                                    </div>
                                    <div className="invoice-item invoice-item-one">
                                    </div>
                                    <div className='row mx-auto'>
                                        <div className='col p-3'>
                                            <div>
                                                <h6 className='fw-bold'>FIRST SITTING</h6>
                                            </div>
                                            <div className='p-4'>
                                                <h6>Exam Number</h6>
                                                <h5>123467</h5>
                                            </div>
                                            <div className='p-4'>
                                                <h6>Type</h6>
                                                <h5>waec/neco</h5>
                                            </div>
                                            <div className=''>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h6 className='fw-bold'>SUBJECT</h6>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>

                                                    </div>
                                                    <div className='col'>
                                                        <h6 className='fw-bold'>GRADE</h6>
                                                        <p>A</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='col p-3'>
                                            <div>
                                                <h6 className='fw-bold'>SECOND SITTING</h6>
                                            </div>
                                            <div className='p-4'>
                                                <h6>Exam Number</h6>
                                                <h5>123467</h5>
                                            </div>
                                            <div className='p-4'>
                                                <h6>Type</h6>
                                                <h5>waec/neco</h5>
                                            </div>
                                            <div className=''>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h6 className='fw-bold'>SUBJECT</h6>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>
                                                        <p>MATHS</p>

                                                    </div>
                                                    <div className='col'>
                                                        <h6 className='fw-bold'>GRADE</h6>
                                                        <p>A</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                        <p>C</p>
                                                        <p>B</p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='pb-4 mb-5'>
                                <div className='col-auto text-end float-end ms-auto download-grp'>
                                    <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download" onClick={() => print()}></i>Print Slip</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
