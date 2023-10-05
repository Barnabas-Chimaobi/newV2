import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Constant } from '../constant';
import { PRINT_COURSE_REG } from '../pages/api/queries/admin';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import QRCode from "react-qr-code"
import jsPDF from "jspdf";
import Loader from "./loadingpage";

import { DataTable } from 'primereact/datatable';
import NairaFormatter from "./nairaformatter";


export default function Invoice({ courseForm }) {

    const [details, setDetails] = useState("")
    const [loading, setloading] = useState(true);
    const [courseReg, { loading: courseRegLoad, error: courseRegError, data: courseRegData }] = useLazyQuery(PRINT_COURSE_REG);
    const courseFunc = async (n) => {
        try {
            const invoiceResponse = await courseReg({
                variables: {
                    printCourseFormId: parseInt(n)
                }
            });
            console.log(invoiceResponse);
            setDetails(invoiceResponse?.data?.printCourseForm);
            setloading(false);
        } catch (error) {
            console.error('Error fetching courseform:', error);
        }
    };
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: '20vh', // Make the container fill the viewport height
    };

    const signatureLineStyle = {
        borderTop: '2px solid #000',
        width: '200%',
    };

    useEffect(() => {

        courseFunc(courseForm);
    }, []);


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
                                            </div>
                                            <div className="invoice-item invoice-item-two">
                                                <div className="d-flex justify-content-between">
                                                    <div className="">
                                                        <div className="invoice-info">

                                                            <h6 className="invoice-name"><span className='invoice-details invoice-details-two'>Name:</span> {details?.fullName}</h6>
                                                            <h6 className="invoice-name"><span className='invoice-details invoice-details-two'>Matric Number:</span> {details?.matricNo}</h6>

                                                            <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>School:</span> {details?.faculty}</h6>
                                                            <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>Department:</span> {details?.department}</h6>
                                                            <h6 className="invoice-name"> <span className='invoice-details invoice-details-two'>Programme:</span> {details?.programme}</h6>
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
                                                                value={Constant.BASE_URL + `/common/courseregistration/` + courseForm}
                                                                viewBox={`0 0 256 256`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>Course Registration Print Out</h4>
                                            <div className="invoice-issues-box">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Session : {details?.session} </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Level : {details?.level}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Semester : {details?.semester} </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Total Course : {details?.courseRegData.length} </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">
                                                            <p>Total Units : {details?.courseRegData.reduce((accumulator, currentItem) => accumulator + currentItem.courseUnit, 0)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="invoice-issues-date">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invoice-item invoice-table-wrap">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            <DataTable value={details?.courseRegData} tableStyle={{ minWidth: '50rem' }} >


                                                                <Column field="courseCode" header="Course Code" ></Column>
                                                                <Column field="courseName" header="Course Name"></Column>
                                                                <Column field="courseUnit" header="Credit Unit"></Column>
                                                                <Column field="courseType" header="Course Type"></Column>

                                                            </DataTable>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div style={containerStyle}>


                                            <div>

                                                <hr style={signatureLineStyle} />
                                                <h5>Registrar</h5>
                                            </div>


                                        </div>
                                    </div>
                                    <div className='pb-4 mb-5' id='printButton'>
                                        <div className='col-auto text-end float-end ms-auto download-grp' onClick={() => print()}>
                                            <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download" ></i> Print</a>
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
