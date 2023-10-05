
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import Table from './table'
import { Column } from 'primereact/column';
import Toaster from './toast/toaster'
import {
    VALIDATE_EMAIL, GET_NATIONALITY, GET_STATE_BY_COUNTRY, PREVIOUS_APPLICATIONS, PROGRAMME_ON_SALE_DROP_DOWN,
    DEPARTMENT_DROP_DOWN, FEE_AMOUNT_FORM, DEPARTMENT_OPTION_DROP_DOWN, GENERATE_APPLICATION_FORM_INVOICE
} from '../pages/api/queries/applicant';
import { toast, ToastContainer } from 'react-toastify';
import { SAVE_BIODATA } from '../pages/api/mutations/applicant';
import { Dropdown } from 'primereact/dropdown';
import Header from './header';
import { useRouter } from 'next/router';
import { Constant } from '../constant';
import NairaFormatter from "./nairaformatter"
import Encrypt from "@/components/encrypt"

export default function Generateapplicationinvoice() {
    const router = useRouter();
    const [toastText, setToastText] = useState('')
    const [toastType, setToastType] = useState('')
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
    const [verifyingbutton, setverifyingbutton] = useState(false)
    const [verified, setverified] = useState("Verify")
    const [disableverifiedButton, setdisableverifiedButton] = useState(false);
    const [emailPerson, setemailPerson] = useState([]);
    const [nationalities, setnationalities] = useState([]);
    const [firstname, setfirstname] = useState('');
    const [othername, setothername] = useState('');
    const [lastname, setlastname] = useState('');
    const [userstate, setuserstate] = useState('');
    const [usernationality, setusernationality] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [states, setStates] = useState([]);
    const [createdUser, setcreatedUser] = useState([]);
    const [tableData, settableData] = useState([]);
    const [programmes, setprogrammes] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [programme, setprogramme] = useState('');
    const [department, setdepartment] = useState('');
    const [formAmount, setformAmount] = useState('0');
    const [departmentOptions, setdepartmentOptions] = useState([]);
    const [departmentOption, setdepartmentOption] = useState('');


    const headers = [
        { field: 'Programme', header: 'Programme', sortable: true, style: { minWidth: '12rem', backgroundColor: 'white' } },
        { field: 'Department', header: 'Department', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white' } },
        { field: 'Session', header: 'Session', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white' } },
        { field: 'Status', header: 'Status', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white', display: "none" } },
        { field: 'InvoiceNumber', header: 'InvoiceNumber', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white', display: "none" } },
        { field: 'IsAdmitted', header: 'Admitted', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white', display: "none" } },
        { field: 'Id', header: 'id', sortable: true, style: { minWidth: '16rem', backgroundColor: 'white', display: "none" } },
        // Add more headers as needed
    ];
    const TableObj = { Programme: '', Department: '', Session: '', Status: '', InvoiceNumber: '', IsAdmitted: '', Id: '' };


    const generateColumnTemplates = (headers) => {
        return headers.map((header) => (
            <Column key={header.field} field={header.field} header={header.header} sortable={header.sortable} style={header.style}></Column>
        ));
    };

    const [validateEmail, { loading: emailLoad, error: emailError, data: emailData }] = useLazyQuery(VALIDATE_EMAIL);
    const [nationality, { loading: nationalityLoad, error: nationalityError, data: nationalityData }] = useLazyQuery(GET_NATIONALITY);
    const [saveBioData, { loading: saveBioDataLoad, error: saveBioDataError, data: saveBioDataData }] = useMutation(SAVE_BIODATA);
    const [getStates, { loading: getStatesLoad, error: getStatesError, data: getStatesData }] = useLazyQuery(GET_STATE_BY_COUNTRY);
    const [getPreviousApplications, { loading: getPreviousApplicationsLoad, error: getPreviousApplicationsError, data: getPreviousApplicationsData }] =
        useLazyQuery(PREVIOUS_APPLICATIONS);
    const [getProgrammes, { loading: getProgrammesLoad, error: getProgrammesError, data: getProgrammesData }] = useLazyQuery(PROGRAMME_ON_SALE_DROP_DOWN);
    const [getDepartments, { loading: getDepartmentsLoad, error: getDepartmentsError, data: getDepartmentsData }] = useLazyQuery(DEPARTMENT_DROP_DOWN);
    const [getFeeAmount, { loading: getFeeAmountLoad, error: getFeeAmountError, data: getFeeAmountData }] = useLazyQuery(FEE_AMOUNT_FORM);
    const [getDepartmentOption, { loading: getDepartmentOptionLoad, error: getDepartmentOptionError, data: getgetDepartmentOption }] = useLazyQuery(DEPARTMENT_OPTION_DROP_DOWN);
    const [generateApplicationInvoice, { loading: generateApplicationInvoiceLoad, error: generateApplicationInvoiceError, data: generateApplicationInvoiceOption }] = useMutation(GENERATE_APPLICATION_FORM_INVOICE);

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



    const validateEmailFunc = async () => {
        setverifyingbutton(true);
        //console.log(email, 'emailssss')
        if (email !== '') {
            const emailResponse = await validateEmail({
                variables: {
                    email: email
                }
            })
            // console.log(emailResponse?.data, "Dataaaa")
            if (emailResponse?.data?.validateEmail?.isVerified) {
                const nat = await nationality();
                //  console.log(nat, "Nationalitiesss");
                setnationalities(nat?.data?.nationality);
                setverified("Verified");
                setverifyingbutton(false);
                setdisableverifiedButton(true);
                toast.success(emailResponse?.data?.validateEmail?.message);
                clearActiveTabsAndPages();
                setTabTwo('Active');
                setpageTwo('Active Show');
                if (emailResponse?.data?.validateEmail?.person != null) {
                    GetStates(emailResponse?.data?.validateEmail?.person?.nationality);
                    // console.log(emailResponse?.data?.validateEmail?.person)
                    setemailPerson(emailResponse?.data?.validateEmail?.person);
                    setfirstname(emailResponse?.data?.validateEmail?.person?.firstName);
                    setothername(emailResponse?.data?.validateEmail?.person?.otherName);
                    setlastname(emailResponse?.data?.validateEmail?.person?.lastName);
                    setphonenumber(emailResponse?.data?.validateEmail?.person?.phoneNumber);
                    setuserstate({ name: emailResponse?.data?.validateEmail?.person?.state });
                    setusernationality({ name: emailResponse?.data?.validateEmail?.person?.nationality });
                    // var tabledataValue = await ViewFunction({ email: email }, "Previous Applications");
                    // console.log(tabledataValue, "Table vauesss");
                    const previousApplicationsResponse = await getPreviousApplications({
                        variables: {
                            email: email
                        }
                    });
                    console.log(previousApplicationsResponse, "Previous ....")
                    var data = previousApplicationsResponse?.data?.allApplications;
                    if (data != null) {
                        var remappeddata = data.map((item) => ({
                            Programme: item?.programmeName, Department: item?.departmentName, Session: item?.sessionName,
                            Status: item?.status, InvoiceNumber: item?.invoiceNumber, Id: item?.id, IsAdmitted: item?.IsAdmitted
                        }))
                        console.log(remappeddata, "Daataaa for Table");
                        settableData(remappeddata);
                    }
                    const ProgrammeData = await getProgrammes();
                    setprogrammes(ProgrammeData?.data?.allProgrammeOnSale);
                }
            } else {
                setverified("Verify");
                toast.error('Email not verified');
            }
        } else {
            toast.error('Please provide an email to be verified')
            setverified("Verify");
            setverifyingbutton(false);
        }
    }


    const GetStates = async (nationality) => {
        const state = await getStates({
            variables: {
                country: nationality
            }
        })
        //   console.log(state?.data?.stateByCountry, 'stateeee');
        setStates(state?.data?.stateByCountry);
    }


    const handleNationalityChange = async (e) => {
        setusernationality(e);
        // console.log(e.name, "selected value");
        await GetStates(e.name);
    };

    const handleProgrammeChange = async (e) => {
        setprogramme(e);
        console.log(e, "programmmess")
        // console.log(e.name, "selected value");

        const departmentdata = await getDepartments({
            variables: {
                programmeId: e.code
            }
        })
        console.log(departmentdata?.data?.departmentByProgramme)
        setdepartments(departmentdata?.data?.departmentByProgramme);
    };

    const handleDepartmentChange = async (e) => {
        setdepartment(e);
        // console.log(e.name, "selected value");
        const amount = await getFeeAmount({
            variables: {
                programmeId: programme.code,
                departmentId: e.code
            }
        });
        //setformAmount(amount?.data?.amountForProgrammeDept);
        let currentAmount = 0;
        setformAmount(currentAmount)
        const updateInterval = 3 * 1000 / amount?.data?.amountForProgrammeDept;
        const interval = setInterval(() => {
            if (currentAmount < amount?.data?.amountForProgrammeDept) {
                currentAmount += 200; // Increment the amount
                setformAmount(currentAmount);
            } else {
                setformAmount(amount?.data?.amountForProgrammeDept)
                clearInterval(interval); // Stop the counting when it reaches the final value
            }
        }, updateInterval); // Update every 10 milliseconds (adjust as needed)


        const DepartmentOptionsDataResponse = await getDepartmentOption({
            variables: {
                departmentid: e.code,
                programmeid: programme.code
            }
        });
        console.log(DepartmentOptionsDataResponse?.data, "Drop doowwnwwk");
        setdepartmentOptions(DepartmentOptionsDataResponse?.data?.allProgrammeDepartmentOptionByProgrammeAndDepartment)


    };


    const saveBioDataFunc = async () => {
        setverifyingbutton(true)
        // console.log(firstname, lastname, othername, email, phonenumber, userstate, usernationality, "Submit vairanlkldd")
        const bioResponse = await saveBioData({
            variables: {
                firstname: firstname,
                lastname: lastname,
                othername: othername,
                email: email,
                phonenumber: phonenumber,
                stateid: userstate?.name,
                nationality: usernationality?.name
            }

        })
        //  console.log(bioResponse)
        if (bioResponse?.data?.saveBiodata?.id > 0) {
            setcreatedUser(bioResponse?.data?.saveBiodata)
            toast.success("Bio- Data Saved")
            clearActiveTabsAndPages();
            setTabThree('Active');
            setpageThree('Active Show');
        } else {
            toast.error('Error')
        }
        setverifyingbutton(false)
    }

    const generateInvoice = async () => {
        setverifyingbutton(true)
        const invoice = await generateApplicationInvoice({
            variables: {
                programmeId: programme.code,
                departmentId: department.code,
                formtypeid: 1,
                personid: createdUser?.id,
                departmentOptions: departmentOption.code
            }
        })
        console.log(invoice.data, "Invoiceeeeeeeeeee")
        setverifyingbutton(false)
        router.push(Constant.BASE_URL + `/common/invoice/` + Encrypt(invoice?.data?.generateApplicationInvoice));
    }

    const openApplyPage = () => {
        clearActiveTabsAndPages();
        setTabThree('');
        setpageThree('');
        setTabFour('Active');
        setpageFour('Active Show');

        //console.log(tabThree, pageThree, tabFour, pageFour, "Page buttonssss")
    }
    const openSpecificPage = (no) => {


        // if (no === 2) {
        //     clearActiveTabsAndPages();
        //     setTabTwo('Active');
        //     setpageTwo('Active Show');
        // }
        // if (no === 3) {
        //     clearActiveTabsAndPages();
        //     settableData('Active');
        //     setpageThree('Active Show');
        // }
        // if (no === 4) {
        //     clearActiveTabsAndPages();
        //     setTabFour('Active');
        //     setpageFour('Active Show');
        // }
    }

    return (
        <>
            <ToastContainer />

            <Header>

                <div className="Homepage-wrapper">
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">
                                <div className="card bg-white">
                                    <div className="card-header">
                                        <h5 className="card-title">Steps To Apply</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                                            <li className="nav-item"><a className={`nav-link ${tabOne !== '' ? 'active' : ''}`} href="#solid-rounded-tab1" data-bs-toggle="tab"  {...(email === '' ? { disabled: 'disabled' } : {})} >Email Verification</a></li>
                                            <li className="nav-item"><a className={`nav-link ${tabTwo !== '' ? 'active' : ''}`} href="#solid-rounded-tab2" data-bs-toggle="tab"  {...(email === '' ? { disabled: 'disabled' } : { disabled: 'disabled' })} >Save Profile</a></li>
                                            <li className="nav-item"><a className={`nav-link ${tabThree !== '' ? 'active' : ''}`} href="#solid-rounded-tab3" data-bs-toggle="tab"  {...(email === '' ? { disabled: 'disabled' } : { disabled: 'disabled' })}  >Previous Applications</a></li>
                                            <li className="nav-item"><a className={`nav-link ${tabFour !== '' ? 'active' : ''}`} href="#solid-rounded-tab4" data-bs-toggle="tab"  {...(email === '' ? { disabled: 'disabled' } : { disabled: 'disabled' })}  >Apply</a></li>
                                            <li className="nav-item"><a className={`nav-link ${tabFive !== '' ? 'active' : ''}`} href="#solid-rounded-tab5" data-bs-toggle="tab" disabled >Print Invoice</a></li>
                                        </ul>
                                        <div className="tab-content">

                                            <div className={`tab-pane  ${pageOne !== '' ? 'show active' : ''}`} id="solid-rounded-tab1">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <form>
                                                                    <div className="row">
                                                                        <div className="col-lg-6 col-sm-12">
                                                                            <div className="form-group local-forms">
                                                                                <label>
                                                                                    Email <span className="login-danger">*</span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Email"
                                                                                    value={email}
                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12 col-lg-6 col-sm-12">
                                                                            <div className="student-submit">
                                                                                {verifyingbutton == false ?
                                                                                    <button type="button" className="btn btn-primary" onClick={() => validateEmailFunc()} disabled={disableverifiedButton}>
                                                                                        {verified}
                                                                                    </button>
                                                                                    :
                                                                                    <button className="btn btn-primary" type="button" disabled>
                                                                                        <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                                                        Verifying...
                                                                                    </button>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
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
                                                                {/* <form> */}
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <h5 className="form-title">
                                                                            <span>Basic Details</span>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Surname <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Surname"
                                                                                value={lastname}
                                                                                onChange={(e) => setlastname(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Firstname <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Firstname"
                                                                                value={firstname}
                                                                                onChange={(e) => setfirstname(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Othername <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Othername"
                                                                                value={othername}
                                                                                onChange={(e) => setothername(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">

                                                                        <div className="local-forms form-group">
                                                                            <label>
                                                                                Nationality <span className="login-danger">*</span>
                                                                            </label>

                                                                            <Dropdown value={usernationality} onChange={(e) => handleNationalityChange(e.value)}
                                                                                options={nationalities?.map((nationality) => ({ name: nationality }))}
                                                                                optionLabel="name"
                                                                                placeholder="Select Your Nationality" className="w-full md:w-21.5rem" />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="local-forms form-group">
                                                                            <label>
                                                                                State Of Origin <span className="login-danger">*</span>
                                                                            </label>


                                                                            <Dropdown value={userstate} onChange={(e) => setuserstate(e.value)}
                                                                                options={states?.map((item) => ({ name: item.name }))}
                                                                                optionLabel="name"
                                                                                placeholder="Select a State" className="w-full md:w-21.5rem" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Phone Number <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Phone Number"
                                                                                value={phonenumber}
                                                                                onChange={(e) => setphonenumber(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <div className="student-submit">

                                                                            {verifyingbutton == false ?
                                                                                <button type="button" className="btn btn-primary" onClick={() => saveBioDataFunc()}>
                                                                                    Submit
                                                                                </button>
                                                                                :
                                                                                <button className="btn btn-primary" type="button" disabled>
                                                                                    <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                                                    Submitting...
                                                                                </button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* </form> */}
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
                                                                <div className="page-header">
                                                                    <div className="row align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="page-title"></h3>
                                                                        </div>
                                                                        <div className="col-auto text-end float-end ms-auto download-grp">

                                                                            <button
                                                                                className="btn btn-primary btn-lg btn-rounded"
                                                                                type="button"
                                                                                style={{
                                                                                    float: 'right', // Float the button to the right
                                                                                    marginLeft: '10px', // Add some left margin for spacing
                                                                                }}
                                                                                onClick={openApplyPage}
                                                                            >

                                                                                Apply
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="table-responsive">

                                                                    <Table headers={headers} generateColumnTemplates={generateColumnTemplates}
                                                                        tableName={"Previous Applications"} allowEdit={false} allowApply={false} tableObjectBody={TableObj}
                                                                        showExport={false} showAddButton={false} variablesForQuery={{ email: email }} tableContent={tableData}
                                                                        showInvoiceButton={true} fillApplicationForm={true} />

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
                                                                {/* <form> */}
                                                                <div className="row">
                                                                    <div className="col-lg-8 col-md-12">
                                                                        <h5 className="form-title">
                                                                            <span>Generate Application Invoice</span>
                                                                        </h5>
                                                                    </div>
                                                                    {/* <div class="invoice-total-footer col-lg-4 col-md-12">
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <h4>Total Amount <span>&#8358; {formAmount}</span></h4>

                                                                            </div></div>
                                                                    </div> */}
                                                                    {/* <div className="invoice-total-footer col-lg-4 col-md-12">
                                                                        <div className="card">
                                                                            <div className="card-body" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
                                                                                <h4 style={{ color: 'white' }}>Total Amount <span style={{ color: 'yellow' }}>&#8358; {formAmount}</span></h4>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                    <div className="invoice-total-footer col-lg-4 col-md-12">
                                                                        <div className="card">
                                                                            <div className="card-body" style={styles.cardBody}>
                                                                                <h4 style={styles.heading}>Total Amount <span style={styles.amount}> {NairaFormatter(formAmount)}</span></h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Surname <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Surname"
                                                                                value={lastname}
                                                                                onChange={(e) => setlastname(e.target.value)}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Firstname <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Firstname"
                                                                                value={firstname}
                                                                                onChange={(e) => setfirstname(e.target.value)}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Othername <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Othername"
                                                                                value={othername}
                                                                                onChange={(e) => setothername(e.target.value)}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>


                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="form-group local-forms">
                                                                            <label>
                                                                                Phone Number <span className="login-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Phone Number"
                                                                                value={phonenumber}
                                                                                onChange={(e) => setphonenumber(e.target.value)}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">

                                                                        <div className="local-forms">
                                                                            <label>
                                                                                Programme <span className="login-danger">*</span>
                                                                            </label>

                                                                            <Dropdown value={programme} onChange={(e) => handleProgrammeChange(e.value)}
                                                                                options={programmes?.map((programmeval) => ({ name: programmeval.name, code: programmeval.id }))}
                                                                                optionLabel="name"
                                                                                placeholder="Select Programme" className="w-full md:w-21.5rem" />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-sm-12">
                                                                        <div className="local-forms">
                                                                            <label>
                                                                                Department <span className="login-danger">*</span>
                                                                            </label>


                                                                            <Dropdown value={department} onChange={(e) => handleDepartmentChange(e.value)}
                                                                                options={departments?.map((item) => ({ name: item.name, code: item.id }))}
                                                                                optionLabel="name"
                                                                                placeholder="Select Department" className="w-full md:w-21.5rem" />
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        departmentOptions?.length === 0 ? <></> : <div className="col-lg-4 col-sm-12 mb-2">
                                                                            <div className="local-forms">
                                                                                <label>
                                                                                    Department Option <span className="login-danger">*</span>
                                                                                </label>


                                                                                <Dropdown value={departmentOption} onChange={(e) => setdepartmentOption(e.value)}
                                                                                    options={departmentOptions?.map((item) => ({ name: item.name, code: item.id }))}
                                                                                    optionLabel="name"
                                                                                    placeholder="Select Department Options" className="w-full md:w-21.5rem" />
                                                                            </div>
                                                                        </div>

                                                                    }

                                                                    <div className="col-12">
                                                                        <div className="student-submit">

                                                                            {verifyingbutton == false ?
                                                                                <button type="button" className="btn btn-primary" onClick={() => generateInvoice()}>
                                                                                    Generate Invoice
                                                                                </button>
                                                                                :
                                                                                <button className="btn btn-primary" type="button" disabled>
                                                                                    <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                                                    Generating Invoice...
                                                                                </button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* </form> */}
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

            </Header>

        </>
    )
}
