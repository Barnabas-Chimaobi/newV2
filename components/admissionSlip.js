import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Constant } from '../constant';
import QRCode from "react-qr-code"
import jsPDF from "jspdf";

export default function AdmissionSlip() {

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
                                            <h2 className='text-center'>Admission Notification Slip</h2>
                                        </div>
                                        <div className='row p-5'>
                                            <div className='col-4'>
                                                <p>Name</p>
                                                <h4>Nmesoma Ogbonna</h4>
                                            </div>
                                            <div className='col-4'>
                                                <p>Programme</p>
                                                <h4>Regular</h4>
                                            </div>
                                            <div className='col-4'>
                                                <p>Department</p>
                                                <h4>Accountancy</h4>
                                            </div>
                                            {/* <div className='col-4'>
                                    <div
                                    className=''
                                        style={{
                                            height: 100,
                                            margin: "0",
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

                                </div> */}
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <h5 className='fw-bold'>Instructions on how to complete the admission process</h5>
                                        <ol className='list-group list-group-numbered'>
                                            <li className='font-bold  text-l'>Confirm that you have met the departmental requirement</li>
                                            <li className='font-bold  text-l'> Generate an acceptance fee invoice</li>
                                            <li className='font-bold  text-l'>Proceed to the bank and make payment using the invoice number
                                                boldy written on the invoice
                                            </li>
                                            <li className='font-bold  text-l'>Return to the portal and input the RRR Number given at the
                                                bank to print admission letter and acceptance receipt
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Verify O-level result
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Generate school fee invoice
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Proceed to the bank and make payment using the invoice number
                                                boldy written on the invoice
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Return to the portal and input the RRR Number given at the
                                                bank to print school fees receipt
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Fill course registration form
                                            </li>
                                            <li className='font-bold  text-l'>
                                                Fill Student bio-data form
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className='pb-4 mb-5'>
                                <div className='col-auto text-end float-end ms-auto download-grp' onClick={() => print()} id='printButton'>
                                    <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download" ></i>Print Slip</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}
