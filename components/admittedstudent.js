
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import Header from './header';
import { useRouter } from 'next/router';
import { Constant } from '../constant';
import Encrypt from "./encrypt"
import { CHECK_ADMISSION_STATUS, OLEVEL_GRADE, OLEVEL_SUBJECT, OLEVEL_TYPE } from '../pages/api/queries/applicant';
import { GENERATE_INVOICE } from '../pages/api/mutations/applicant'

import { Card } from 'primereact/card';
import Spinner from './spinner';


export default function Admittedstudent({ formnumber }) {
    const router = useRouter();
    const [loadedData, setloadedData] = useState(false);
    const [admittedApplicatData, setadmittedApplicatData] = useState("");
    const [olevelSubjects, setolevelSubjects] = useState("");
    const [olevelGrades, setolevelGrades] = useState("");
    const [olevelTypes, setolevelTypes] = useState("");
    const [firstSitting, setfirstSitting] = useState("");
    const [secondSitting, setsecondSitting] = useState("");
    const [admissionStatus, { loading: admissionStatusLoad, error: admissionStatusError, data: admissionStatusData }] = useLazyQuery(CHECK_ADMISSION_STATUS);
    const [OlevelGrade, { loading: OlevelGradeLoad, error: OlevelGradeError, data: OlevelGradeData }] = useLazyQuery(OLEVEL_GRADE);
    const [OlevelSubject, { loading: OlevelSubjectLoad, error: OlevelSubjectError, data: OlevelSubjectData }] = useLazyQuery(OLEVEL_SUBJECT);
    const [OlevelType, { loading: OlevelTypeLoad, error: OlevelTypeError, data: OlevelTypeData }] = useLazyQuery(OLEVEL_TYPE);
    const [firstSub1, setfirstSub1] = useState("");
    const [firstSub2, setfirstSub2] = useState("");
    const [firstSub3, setfirstSub3] = useState("");
    const [firstSub4, setfirstSub4] = useState("");
    const [firstSub5, setfirstSub5] = useState("");
    const [firstSub6, setfirstSub6] = useState("");
    const [firstSub7, setfirstSub7] = useState("");
    const [firstSub8, setfirstSub8] = useState("");
    const [firstSub9, setfirstSub9] = useState("");
    const [secondSub1, setsecondSub1] = useState("");
    const [secondSub2, setsecondSub2] = useState("");
    const [secondSub3, setsecondSub3] = useState("");
    const [secondSub4, setsecondSub4] = useState("");
    const [secondSub5, setsecondSub5] = useState("");
    const [secondSub6, setsecondSub6] = useState("");
    const [secondSub7, setsecondSub7] = useState("");
    const [secondSub8, setsecondSub8] = useState("");
    const [secondSub9, setsecondSub9] = useState("");
    const [firstGrade1, setfirstGrade1] = useState("");
    const [firstGrade2, setfirstGrade2] = useState("");
    const [firstGrade3, setfirstGrade3] = useState("");
    const [firstGrade4, setfirstGrade4] = useState("");
    const [firstGrade5, setfirstGrade5] = useState("");
    const [firstGrade6, setfirstGrade6] = useState("");
    const [firstGrade7, setfirstGrade7] = useState("");
    const [firstGrade8, setfirstGrade8] = useState("");
    const [firstGrade9, setfirstGrade9] = useState("");
    const [secondGrade1, setsecondGrade1] = useState("");
    const [secondGrade2, setsecondGrade2] = useState("");
    const [secondGrade3, setsecondGrade3] = useState("");
    const [secondGrade4, setsecondGrade4] = useState("");
    const [secondGrade5, setsecondGrade5] = useState("")
    const [secondGrade6, setsecondGrade6] = useState("");
    const [secondGrade7, setsecondGrade7] = useState("");
    const [secondGrade8, setsecondGrade8] = useState("");
    const [secondGrade9, setsecondGrade9] = useState("");
    const [scaleProgress, setscaleProgress] = useState(100);
    const [admissionProgress, setadmissionProgress] = useState(0)
    const [admissionSlipUrl, setadmissionSlipUrl] = useState("");

    const admissionStatusFunc = async (formNo) => {
        try {
            const inputId = parseInt(formNo);
            const admissionStatusData = await admissionStatus({
                variables: {
                    checkAdmissionStatusByIdId: inputId
                }
            });
            console.log(admissionStatusData, inputId, "fix nowwwww")
            setadmittedApplicatData(admissionStatusData?.data?.checkAdmissionStatusById);

            setfirstSitting(admissionStatusData?.data?.checkAdmissionStatusById?.applicationForm?.applicationFormFullResponse?.submitOlevelResult[0]);
            setsecondSitting(admissionStatusData?.data?.checkAdmissionStatusById?.applicationForm?.applicationFormFullResponse?.submitOlevelResult[1]);
            if (firstSitting?.olevelResultsDto?.length > 0) {
                setfirstSub1({ name: firstSitting?.olevelResultsDto[0]?.subject })
                setfirstGrade1({ name: firstSitting?.olevelResultsDto[0]?.grade })
                setfirstSub2({ name: firstSitting?.olevelResultsDto[1]?.subject })
                setfirstGrade2({ name: firstSitting?.olevelResultsDto[1]?.grade })
                setfirstSub3({ name: firstSitting?.olevelResultsDto[2]?.subject })
                setfirstGrade3({ name: firstSitting?.olevelResultsDto[2]?.grade })
                setfirstSub4({ name: firstSitting?.olevelResultsDto[3]?.subject })
                setfirstGrade4({ name: firstSitting?.olevelResultsDto[3]?.grade })
                setfirstSub5({ name: firstSitting?.olevelResultsDto[4]?.subject })
                setfirstGrade5({ name: firstSitting?.olevelResultsDto[4]?.grade })
                setfirstSub6({ name: firstSitting?.olevelResultsDto[5]?.subject })
                setfirstGrade6({ name: firstSitting?.olevelResultsDto[5]?.grade })
                setfirstSub7({ name: firstSitting?.olevelResultsDto[6]?.subject })
                setfirstGrade7({ name: firstSitting?.olevelResultsDto[6]?.grade })
                setfirstSub8({ name: firstSitting?.olevelResultsDto[7]?.subject })
                setfirstGrade8({ name: firstSitting?.olevelResultsDto[7]?.grade })
                setfirstSub9({ name: firstSitting?.olevelResultsDto[8]?.subject })
                setfirstGrade9({ name: firstSitting?.olevelResultsDto[8]?.grade })
            }
            if (secondSitting?.olevelResultsDto?.length > 0) {
                setsecondSub1({ name: secondSitting?.olevelResultsDto[0]?.subject })
                setsecondGrade1({ name: secondSitting?.olevelResultsDto[0]?.grade })
                setsecondSub2({ name: secondSitting?.olevelResultsDto[1]?.subject })
                setsecondGrade2({ name: secondSitting?.olevelResultsDto[1]?.grade })
                setsecondSub3({ name: secondSitting?.olevelResultsDto[2]?.subject })
                setsecondGrade3({ name: secondSitting?.olevelResultsDto[2]?.grade })
                setsecondSub4({ name: secondSitting?.olevelResultsDto[3]?.subject })
                setsecondGrade4({ name: secondSitting?.olevelResultsDto[3]?.grade })
                setsecondSub5({ name: secondSitting?.olevelResultsDto[4]?.subject })
                setsecondGrade5({ name: secondSitting?.olevelResultsDto[4]?.grade })
                setsecondSub6({ name: secondSitting?.olevelResultsDto[5]?.subject })
                setsecondGrade6({ name: secondSitting?.olevelResultsDto[5]?.grade })
                setsecondSub7({ name: secondSitting?.olevelResultsDto[6]?.subject })
                setsecondGrade7({ name: secondSitting?.olevelResultsDto[6]?.grade })
                setsecondSub8({ name: secondSitting?.olevelResultsDto[7]?.subject })
                setsecondGrade8({ name: secondSitting?.olevelResultsDto[7]?.grade })
                setsecondSub9({ name: secondSitting?.olevelResultsDto[8]?.subject })
                setsecondGrade9({ name: secondSitting?.olevelResultsDto[8]?.grade })
            }

            console.log(firstSitting, secondSitting, "fists anf second")
            const subjects = await OlevelSubject();
            setolevelSubjects(subjects?.data?.gellAllOLevelSubject);
            const grades = await OlevelGrade();
            setolevelGrades(grades?.data?.gellAllOLevelGrade);
            console.log(subjects?.data?.gellAllOLevelSubject, grades?.data?.gellAllOLevelGrade, "Data for olevel")
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    };
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        admissionStatusFunc(formnumber)
            .then((x) => {
                const statusProgress = admittedApplicatData?.applicantStatusId * 10;

                setadmissionProgress(statusProgress);
                setscaleProgress(100 - statusProgress);

                const documentStyle = getComputedStyle(document.documentElement);

                const data = {
                    labels: ['Admission Progress'],
                    datasets: [
                        {
                            data: [admissionProgress, scaleProgress],
                            backgroundColor: [
                                documentStyle.getPropertyValue('--blue-500'),
                                documentStyle.getPropertyValue('fff')
                            ],
                            hoverBackgroundColor: [
                                documentStyle.getPropertyValue('--blue-400'),
                                documentStyle.getPropertyValue('fff')
                            ]
                        }
                    ]
                };
                const options = {
                    cutout: '60%'
                };

                setChartData(data);
                setChartOptions(options);
                setloadedData(true);
            });
    }, [formnumber]);




    const [email, setEmail] = useState("")
    const [tabOne, setTabOne] = useState('active')
    const [tabTwo, setTabTwo] = useState('')
    const [tabThree, setTabThree] = useState('')
    const [tabFour, setTabFour] = useState('')
    const [tabFive, setTabFive] = useState('')
    const [pageOne, setpageOne] = useState('active show')
    const [pageTwo, setpageTwo] = useState('')
    const [pageThree, setpageThree] = useState('')
    const [pageFour, setpageFour] = useState('')
    const [pageFive, setpageFive] = useState('')
    const [loadingbutton, setloadingbutton] = useState(false);

    const selectedInvoice = (feetypeId) => {
        if (!admittedApplicatData?.payments) {
            return "";
        }

        return admittedApplicatData.payments.filter((payment) => {
            return payment.feeDetail.feeType.id === feetypeId;
        });
    };

    const [generateInvoiceFee, { loading: generateInvoiceFeeLoad, error: generateInvoiceFeeError, data: generateInvoiceFeeData }] = useMutation(GENERATE_INVOICE);
    const generateInvoice = async (feetype) => {
        setloadingbutton(true)
        try {
            const invoice = await generateInvoiceFee({
                variables: {
                    personId: admittedApplicatData?.applicationForm?.applicantAppliedCourse?.personId,
                    levelId: 1,
                    formtypeid: 1,
                    sessionId: 0,
                    feetypeId: feetype,
                    paymentMode: 1
                }
            })
            console.log(invoice.data, "Invoiceeeeeeeeeee")
            setloadingbutton(false)
            router.push(Constant.BASE_URL + `/common/invoice/` + Encrypt(invoice?.data?.generateInvoice?.invoiceNumber));
        } catch (error) {
            console.error('Error fetching form:', error);
            setloadingbutton(false)
        }
    }

    const generateReceipt = async (invoiceNo) => {

        try {

            router.push(Constant.BASE_URL + `/common/receipt/` + Encrypt(invoiceNo));
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    const clearActiveTabsAndPages = () => {
        setTabOne('');
        setTabTwo('');
        setTabThree('');
        setTabFour('');
        setTabFive('');
        setpageOne('');
        setpageTwo('');
        setpageThree('');
        setpageFour('');
        setpageFive('');
    }
    const styles = {
        cardBody: {
            backgroundColor: 'lightblue',
            padding: '20px',
            borderRadius: '10px',
        },
        heading: {
            color: 'navy',
            fontSize: '1.5rem',
        },
        amount: {
            color: 'green',
            fontWeight: 'bold',
            fontSize: '1.2rem',
        },
    };




    return (
        <>

            <Header>
                {loadedData ?
                    <div className="Homepage-wrapper">
                        <div className="content container-fluid">
                            <div className="row">

                                <div className="col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">
                                    <div className="card bg-white">
                                        <div className="card-header">
                                            <h5 className="card-title">Admissions</h5>
                                        </div>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="student-personals-grp">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="heading-detail">
                                                                    <h4>Applicant Details : Current Status({admittedApplicatData?.applicantStatus})</h4>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-user" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>FullName</h4>
                                                                            <h5>{admittedApplicatData?.fullName}</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <img src="/assets/img/icons/buliding-icon.svg" alt="" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Programme </h4>
                                                                            <h5>{admittedApplicatData?.programmeName}</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-phone-call" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Department </h4>
                                                                            <h5>{admittedApplicatData?.courseOfStudy}</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-mail" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Department Option</h4>
                                                                            <h5>
                                                                                {admittedApplicatData?.courseOption}
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-user" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Form Number</h4>
                                                                            <h5> {admittedApplicatData?.applicationFormNumber}</h5>
                                                                        </div>
                                                                    </div>
                                                                    {admittedApplicatData?.matricNumber === "" ? <></> : <div className="personal-activity col-lg-4 mb-5">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-calendar" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Matriculation Number</h4>
                                                                            <h5>{admittedApplicatData?.matricNumber}</h5>
                                                                        </div>
                                                                    </div>}
                                                                    <div className="personal-activity col-lg-4 mb-5 ">
                                                                        <div className="personal-icons">
                                                                            <i className="feather-italic" />
                                                                        </div>
                                                                        <div className="views-personal">
                                                                            <h4>Faculty</h4>
                                                                            <h5>{admittedApplicatData?.faculty}</h5>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="student-personals-grp">
                                                        <div className="card flex justify-content-center">
                                                            <div className="card-body">

                                                                {loadedData ?
                                                                    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-15rem md:w-18rem h-18rem md:h-15rem" />
                                                                    : <></>}
                                                            </div> </div> </div>
                                                </div>
                                            </div>


                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                                                <li className="nav-item"><a className={`nav-link ${tabOne !== '' ? 'active' : ''}`} href="#solid-rounded-tab1" data-bs-toggle="tab"  >Offered Admission</a></li>
                                                <li className="nav-item"><a className={`nav-link ${tabTwo !== '' ? 'active' : ''}`} href="#solid-rounded-tab2" data-bs-toggle="tab"  >Olevel Verification</a></li>
                                                <li className="nav-item"><a className={`nav-link ${tabThree !== '' ? 'active' : ''}`} href="#solid-rounded-tab3" data-bs-toggle="tab" >Manage Fees</a></li>
                                                <li className="nav-item"><a className={`nav-link ${tabFour !== '' ? 'active' : ''}`} href="#solid-rounded-tab4" data-bs-toggle="tab" disabled >Login As A Student</a></li>
                                                <li className="nav-item"><a className={`nav-link ${tabFive !== '' ? 'active' : ''}`} href="#solid-rounded-tab5" data-bs-toggle="tab"  ></a></li>
                                            </ul>
                                            <div className="tab-content">

                                                <div className={`tab-pane  ${pageOne !== '' ? 'show active' : ''}`} id="solid-rounded-tab1">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card student-personals-grp">
                                                                <div className="card-body">
                                                                    <div className="">

                                                                        <>
                                                                            <Card title="">
                                                                                <div className="card flex-fill bg-white">
                                                                                    <div className="card-header">
                                                                                        <h5 className="card-title mb-0">(1). Admission Slip</h5>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <div
                                                                                            className="bg-primary p-3 px-3"
                                                                                            style={{ marginBottom: 5, color: "#fff", textAlign: "justify" }}
                                                                                        >
                                                                                            <p style={{ fontWeight: "bold" }}>
                                                                                                Congratulations <b>{admittedApplicatData?.fullName}!</b> You have been given a Provisional
                                                                                                Admission into {Constant.SCHOOL_NAME}
                                                                                            </p>
                                                                                            <small>
                                                                                                This marks the first step of your admission process.
                                                                                                Please follow the instructions below.
                                                                                                <cite title="Source Title" />
                                                                                            </small>
                                                                                        </div>
                                                                                        <div class="row mb-1 ">

                                                                                            <div class="col-md-12">
                                                                                                <strong>Print Admission Slip by clicking 'Print Admission Slip' Button </strong>
                                                                                            </div>
                                                                                            <div class="col-md-4 mt-3">
                                                                                                <a href={Constant.BASE_URL + `/common/admissionslip/` + admittedApplicatData?.applicationFormNumber?.replace(/\//g, '-')} class="btn btn-outline-primary me-2 mb-2 "><i class="fas fa-download"></i> Print Admission Slip</a>
                                                                                            </div>
                                                                                        </div>




                                                                                    </div>
                                                                                </div>

                                                                                <div className="card flex-fill bg-white">
                                                                                    <div className="card-header">
                                                                                        <h5 className="card-title mb-0">(2). Pay Acceptance Fees</h5>
                                                                                        <h5 className="card-title mb-0">Acceptance Fees Invoice Number: <>{selectedInvoice(2)[0]?.invoiceNumber}</></h5>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <p className="card-text">
                                                                                            Click the Generate Invoice button to generate an invoice for your Acceptance fees. Afterward,
                                                                                            you can print your receipt.
                                                                                        </p>
                                                                                        <div class="row ">
                                                                                            {loadingbutton ?
                                                                                                <button className="btn btn-primary col-lg-3 col-sm-12 mb-3 mr-2" type="button" disabled>
                                                                                                    <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                                                                    Generating Invoice...
                                                                                                </button>
                                                                                                :

                                                                                                <button type="button" className="btn btn-primary col-lg-3 col-sm-12 mb-3 mr-2" onClick={() => generateInvoice(2)}>
                                                                                                    Generate Invoice
                                                                                                </button>
                                                                                            }

                                                                                            {/* <a className="btn btn-primary  col-lg-3 col-sm-12 mb-3 " href="#">
                                                                                                Print Receipt
                                                                                            </a> */}
                                                                                            <button type="button" className="btn btn-primary col-lg-3 col-sm-12 mb-3 "
                                                                                                onClick={() => generateReceipt(selectedInvoice(2)[0]?.invoiceNumber)}>
                                                                                                Print Receipt
                                                                                            </button>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </Card>

                                                                            <footer>
                                                                                <p>For assistance, contact our admissions office.</p>
                                                                            </footer>
                                                                        </>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`tab-pane  ${pageTwo !== '' ? 'show active' : ''}`} id="solid-rounded-tab2">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="card">
                                                                                <div className="card-header">
                                                                                    <h5 className="card-title">First Sitting Olevel Details</h5>
                                                                                </div>
                                                                                <div className="card-body">
                                                                                    <form action="#">
                                                                                        <div className="form-group">
                                                                                            <label>Exam Number</label>
                                                                                            <input type="text" className="form-control" disabled readOnly value={firstSitting?.examNumber === null || firstSitting?.examNumber === "0" ? "Exam Number" : firstSitting?.examNumber} />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label>Olevel Type</label>
                                                                                            <input type="text" className="form-control" disabled readOnly value={firstSitting?.olevelType === null ? "Olevel Type" : firstSitting?.olevelType} />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label>Exam Year</label>
                                                                                            <input type="email" className="form-control" disabled readOnly value={firstSitting?.examYear === null || firstSitting?.examYear === 0 ? "Exam Year" : firstSitting?.examYear} />
                                                                                        </div>


                                                                                        {olevelSubjects === null && olevelGrades === null ? <></> :
                                                                                            <div className="table-responsive">
                                                                                                <table className="table table-bordered mb-1">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>S/N</th>
                                                                                                            <th>Subject</th>
                                                                                                            <th>Grade</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>1</td>
                                                                                                            <td>   <Dropdown value={firstSub1} onChange={(e) => setfirstSub1(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade1} onChange={(e) => setfirstGrade1(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>2</td>
                                                                                                            <td>   <Dropdown value={firstSub2} onChange={(e) => setfirstSub2(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade2} onChange={(e) => setfirstGrade2(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>3</td>
                                                                                                            <td>   <Dropdown value={firstSub3} onChange={(e) => setfirstSub3(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade3} onChange={(e) => setfirstGrade3(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>4</td>
                                                                                                            <td>   <Dropdown value={firstSub4} onChange={(e) => setfirstSub4(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade4} onChange={(e) => setfirstGrade4(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>5</td>
                                                                                                            <td>   <Dropdown value={firstSub5} onChange={(e) => setfirstSub5(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade5} onChange={(e) => setfirstGrade5(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>6</td>
                                                                                                            <td>   <Dropdown value={firstSub6} onChange={(e) => setfirstSub6(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade6} onChange={(e) => setfirstGrade6(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>7</td>
                                                                                                            <td>   <Dropdown value={firstSub7} onChange={(e) => setfirstSub7(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade7} onChange={(e) => setfirstGrade7(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>8</td>
                                                                                                            <td>   <Dropdown value={firstSub8} onChange={(e) => setfirstSub8(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade8} onChange={(e) => setfirstGrade8(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>9</td>
                                                                                                            <td>   <Dropdown value={firstSub9} onChange={(e) => setfirstSub9(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={firstGrade9} onChange={(e) => setfirstGrade9(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        }



                                                                                        <div className="text-end">
                                                                                            <button type="submit" className="btn btn-primary">
                                                                                                Submit
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="card">
                                                                                <div className="card-header">
                                                                                    <h5 className="card-title">Second Sitting Olevel Details</h5>
                                                                                </div>
                                                                                <div className="card-body">
                                                                                    <form action="#">
                                                                                        <div className="form-group">
                                                                                            <label>Exam Number</label>
                                                                                            <input type="text" className="form-control" disabled readOnly value={secondSitting?.examNumber === null || secondSitting?.examNumber === "0" ? "Exam Number" : secondSitting?.examNumber} />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label>Olevel Type</label>
                                                                                            <input type="text" className="form-control" disabled readOnly value={secondSitting?.olevelType === null ? "Olevel Type" : secondSitting?.olevelType} />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label>Exam Year</label>
                                                                                            <input type="email" className="form-control" disabled readOnly value={secondSitting?.examYear === null || secondSitting?.examYear === 0 ? "Exam Year" : secondSitting?.examYear} />
                                                                                        </div>
                                                                                        {olevelSubjects === null && olevelGrades === null ? <></> :
                                                                                            <div className="table-responsive">
                                                                                                <table className="table table-bordered mb-1">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>S/N</th>
                                                                                                            <th>Subject</th>
                                                                                                            <th>Grade</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>1</td>
                                                                                                            <td>   <Dropdown value={secondSub1} onChange={(e) => setsecondSub1(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade1} onChange={(e) => setsecondGrade1(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>2</td>
                                                                                                            <td>   <Dropdown value={secondSub2} onChange={(e) => setsecondSub2(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade2} onChange={(e) => setsecondGrade2(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>3</td>
                                                                                                            <td>   <Dropdown value={secondSub3} onChange={(e) => setsecondSub3(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade3} onChange={(e) => setsecondGrade3(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>4</td>
                                                                                                            <td>   <Dropdown value={secondSub4} onChange={(e) => setsecondSub4(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade4} onChange={(e) => setsecondGrade4(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>5</td>
                                                                                                            <td>   <Dropdown value={secondSub5} onChange={(e) => setsecondSub5(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade5} onChange={(e) => setsecondGrade5(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>6</td>
                                                                                                            <td>   <Dropdown value={secondSub6} onChange={(e) => setsecondSub6(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade6} onChange={(e) => setsecondGrade6(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>7</td>
                                                                                                            <td>   <Dropdown value={secondSub7} onChange={(e) => setsecondSub7(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade7} onChange={(e) => setsecondGrade7(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>8</td>
                                                                                                            <td>   <Dropdown value={secondSub8} onChange={(e) => setsecondSub8(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade8} onChange={(e) => setsecondGrade8(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>9</td>
                                                                                                            <td>   <Dropdown value={secondSub9} onChange={(e) => setsecondSub9(e.value)}
                                                                                                                options={olevelSubjects}
                                                                                                                optionLabel="name"
                                                                                                                placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                <Dropdown value={secondGrade9} onChange={(e) => setsecondGrade9(e.value)}
                                                                                                                    options={olevelGrades}
                                                                                                                    optionLabel="name"
                                                                                                                    placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        }
                                                                                        <div className="text-end">
                                                                                            <button type="submit" className="btn btn-primary">
                                                                                                Submit
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={`tab-pane  ${pageThree !== '' ? 'show active' : ''}`} id="solid-rounded-tab3">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card card-table comman-shadow">
                                                                <div className="card-body">
                                                                    <div className="col-md-12 col-lg-9 d-flex">

                                                                        <Card title="Manage Fees">
                                                                            <div className="card flex-fill bg-white">
                                                                                <div className="card-header">
                                                                                    <h5 className="card-title mb-0">(3). Pay School Fees</h5>
                                                                                    <h5 className="card-title mb-0">School Fees Invoice Number: <>{selectedInvoice(3)[0]?.invoiceNumber}</></h5>
                                                                                </div>
                                                                                <div className="card-body">
                                                                                    <p className="card-text">
                                                                                        Click the Generate Invoice button to generate an invoice for your school fees. Afterward,
                                                                                        you can print your receipt.
                                                                                    </p>
                                                                                    <div class="row ">

                                                                                        {loadingbutton ?
                                                                                            <button className="btn btn-primary col-lg-3 col-sm-12 mb-3 mr-2" type="button" disabled>
                                                                                                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                                                                Generating Invoice...
                                                                                            </button>
                                                                                            :

                                                                                            <button type="button" className="btn btn-primary col-lg-3 col-sm-12 mb-3 mr-2" onClick={() => generateInvoice(3)}>
                                                                                                Generate Invoice
                                                                                            </button>
                                                                                        }

                                                                                        <button type="button" className="btn btn-primary col-lg-3 col-sm-12 mb-3 "
                                                                                            onClick={() => generateReceipt(selectedInvoice(3)[0]?.invoiceNumber)}>
                                                                                            Print Receipt
                                                                                        </button>

                                                                                        {/* <a className="btn btn-primary  col-lg-3 col-sm-12 mb-3 " href="#">
                                                                                            Print Receipt
                                                                                        </a> */}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </Card>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={`tab-pane  ${pageFour !== '' ? 'show active' : ''}`} id="solid-rounded-tab4">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card">
                                                                <div className="card-body">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className={`tab-pane  ${pageFive !== '' ? 'show active' : ''}`} id="solid-rounded-tab5">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card">
                                                                <div className="card-body">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div></div>
                    : <Spinner />}
            </Header >

        </>
    )
}
