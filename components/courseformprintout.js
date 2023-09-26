import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Constant } from '../constant';
import { INVOICE } from '../pages/api/queries/admin';
import QRCode from "react-qr-code"
import jsPDF from "jspdf";
import Loader from "./loadingpage";
import Decrypt from "./decrypt";
import Encrypt from "./encrypt";
import NairaFormatter from "./nairaformatter";


export default function Invoice({ courseForm }) {

    const [details, setDetails] = useState("")
    const [loading, setloading] = useState(true);
    const [invoice, { loading: invoiceLoad, error: invoiceError, data: invoiceData }] = useLazyQuery(INVOICE);
    const invoiceFunc = async (invoiceNumber) => {
        try {
            const invoiceResponse = await invoice({
                variables: {
                    invoicenumber: invoiceNumber
                }
            });
            console.log(invoiceResponse);
            setDetails(invoiceResponse?.data?.invoice);
            setloading(false);
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };


    useEffect(() => {
        console.log(Decrypt(invoiceNumber), "Invoice loggged no")
        invoiceFunc(Decrypt(invoiceNumber));
    }, [Decrypt(invoiceNumber)]);


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

    useEffect(() => {
        invoiceFunc()
    }, [])

    return (
        <div>
            {loading ?
                <Loader /> :
                <div>
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
                                                            <img src="/assets/img/logo.png" alt="logo" />
                                                        </div>
                                                        <div className="invoice-head">
                                                            <h2>Invoice</h2>
                                                            <p>Invoice Number : {details?.invoiceNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="invoice-info">
                                                            <strong className="customer-text-one">Invoice From</strong>
                                                            <h6 className="invoice-name">{Constant.SCHOOL_NAME}</h6>
                                                            <p className="invoice-details">
                                                                {Constant.SCHOOL_ADDRESS}
                                                            </p>
                                                            <p className="invoice-details">{Constant.SCHOOL_EMAIL}</p>
                                                            <p className="invoice-details">{Constant.SCHOOL_PHONE}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-item invoice-item-two">
                                                <div className="d-flex justify-content-between">
                                                    <div className="">
                                                        <div className="invoice-info">
                                                            <strong className="customer-text-one">Billed to</strong>
                                                            <h6 className="invoice-name"><span className='invoice-details invoice-details-two'>Name:</span> {details?.fullName}</h6>
                                                            <h6 className="invoice-name"><span className='invoice-details invoice-details-two'>Email:</span> {details?.email}</h6>

                                                            {details?.matricNumber === null ? <></> : <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>Matric Number:</span> {details?.matricNumber}</h6>}
                                                            <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>Department:</span> {details?.departmentName}</h6>
                                                            {details?.facultyName === null ? <></> : <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>School:</span> {details?.facultyName}</h6>}
                                                        </div>
                                                    </div>
                                                    <div className="" >
                                                        <div
                                                            style={{
                                                                height: 100,
                                                                marginTop: -20,
                                                                // maxWidth: 64,
                                                                width: 100,
                                                            }}>
                                                            <QRCode
                                                                size={250}
                                                                style={{ height: "", maxWidth: "100%", width: "100%" }}
                                                                value={Constant.BASE_URL + `/common/invoice/` + Encrypt(details?.invoiceNumber)}
                                                                viewBox={`0 0 256 256`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-issues-box">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Session : {details?.feeDetail?.session?.name} </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Level : {details?.feeDetail?.level?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Date Generated : {new Date(details?.dateGenerated).toLocaleDateString()} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-item invoice-table-wrap">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            table
                                                        </div>
                                                    </div>
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

                </div>
            }
        </div>
    )
}
