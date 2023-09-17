'use client'
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { TabView, TabPanel } from 'primereact/tabview';
import Formgroup from "./formgroup";
import { Calendar } from 'primereact/calendar';
import Header from "./header";
import { OLEVEL_GRADE, OLEVEL_SUBJECT, OLEVEL_TYPE } from '../pages/api/queries/applicant';
import { SUBMIT_APPLICANT_FORM } from "../pages/api/mutations/applicantMutation";
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import Spinner from './spinner'


export default function GenericForm({
    tableObjectBody,
    dropDownObjects,
}) {
    const [isLoading, setisLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(tableObjectBody);
    const [productObj, setproductObj] = useState(dropDownObjects);
    const [submitted, setSubmitted] = useState(false);
    const [content, setContent] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [nextactiveButton, setnextactiveButton] = useState(true);
    const [previousactiveButton, setpreviousactiveButton] = useState(false);
    const [totalIndex, settotalIndex] = useState(0);
    const [olevelSubjects, setolevelSubjects] = useState("");
    const [olevelGrades, setolevelGrades] = useState("");
    const [formSubmit, { formSubmiterror, formSubmitloading, formSubmitdata }] = useMutation(
        SUBMIT_APPLICANT_FORM
    );

    const [pictureUrl, setPictureUrl] = useState("");

    const [firstexamNumber, setfirstexamNumber] = useState();
    const [firstexamType, setfirstexamType] = useState();
    const [firstexamYear, setfirstexamYear] = useState();
    const [secondexamNumber, setsecondexamNumber] = useState();
    const [secondexamType, setsecondexamType] = useState();
    const [secondexamYear, setsecondexamYear] = useState();

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
    const [secondGrade5, setsecondGrade5] = useState("");
    const [secondGrade6, setsecondGrade6] = useState("");
    const [secondGrade7, setsecondGrade7] = useState("");
    const [secondGrade8, setsecondGrade8] = useState("");
    const [secondGrade9, setsecondGrade9] = useState("");

    const [OlevelGrade, { loading: OlevelGradeLoad, error: OlevelGradeError, data: OlevelGradeData }] = useLazyQuery(OLEVEL_GRADE);
    const [OlevelSubject, { loading: OlevelSubjectLoad, error: OlevelSubjectError, data: OlevelSubjectData }] = useLazyQuery(OLEVEL_SUBJECT);
    const [fields, setFields] = useState([]);

    const dropdowns = async () => {
        const subjects = await OlevelSubject();
        setolevelSubjects(subjects?.data?.gellAllOLevelSubject);
        const grades = await OlevelGrade();
        setolevelGrades(grades?.data?.gellAllOLevelGrade);
        const fieldDetails = [];
        const stateList = data?.data?.applicantForm?.mainPages.flatMap((item, index) =>
            item?.sections?.flatMap((item2, index2) =>
                item2.fieldDetails.map((item3, index3) => {
                    fieldDetails.push({ id: item3.id, response: item3.response });
                    return item3;
                })
            )
        );
        setFields(fieldDetails);
        console.log(fieldDetails, "Flat LIST")
        setisLoading(false)
    }

    useEffect(() => {
        dropdowns();
    }, []);

    var data = {
        "data": {
            "applicantForm": {
                "mainPages": [
                    {
                        "pageId": 31,
                        "pageName": "Page 1",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 102,
                                "sectionName": "Bio Data",
                                "fieldDetails": [
                                    {
                                        "id": 102,
                                        "input_type": "text",
                                        "label": "Surname",
                                        "list": null,
                                        "required": null,
                                        "response": "Obinna",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 103,
                                        "input_type": "text",
                                        "label": "First Name",
                                        "list": null,
                                        "required": null,
                                        "response": "Uche",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 104,
                                        "input_type": "text",
                                        "label": "Other Name",
                                        "list": null,
                                        "required": null,
                                        "response": "Emma",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 105,
                                        "input_type": "select",
                                        "label": "Sex",
                                        "list": [
                                            "Male",
                                            "Female"
                                        ],
                                        "required": null,
                                        "response": "Male",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 106,
                                        "input_type": "date",
                                        "label": "Date of Birth",
                                        "list": null,
                                        "required": null,
                                        "response": "04-10-1995",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 107,
                                        "input_type": "select",
                                        "label": "State",
                                        "list": [
                                            "ABIA",
                                            "ADAMAWA",
                                            "AKWA IBOM",
                                            "ANAMBRA",
                                            "BAUCHI",
                                            "BENUE",
                                            "BORNU",
                                            "BAYELSA",
                                            "CROSS RIVERS",
                                            "DELTA",
                                            "EBONYI",
                                            "EDO",
                                            "ENUGU",
                                            "EKITI",
                                            "FEDERAL CAPITAL",
                                            "GOMBE",
                                            "IMO",
                                            "JIGAWA",
                                            "KEBBI",
                                            "KADUNA",
                                            "KOGI",
                                            "KANO",
                                            "KATSINA",
                                            "KWARA",
                                            "LAGOS",
                                            "NIGER",
                                            "NASSARAWA",
                                            "ONDO",
                                            "OGUN",
                                            "OSUN",
                                            "NON-NIGERIAN",
                                            "OYO",
                                            "PLATEAU",
                                            "RIVERS",
                                            "SOKOTO",
                                            "TARABA",
                                            "YOBE"
                                        ],
                                        "required": null,
                                        "response": "EBONYI",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 108,
                                        "input_type": "select",
                                        "label": "Local government",
                                        "list": [
                                            "Abakaliki",
                                            "Afikpo-North",
                                            "Afikpo-South",
                                            "Aliero",
                                            "Arewa-Dandi",
                                            "Argungu",
                                            "Augie",
                                            "Bagudo",
                                            "Birnin-Kebbi",
                                            "Bunza",
                                            "Dandi",
                                            "Ebonyi Local Government Area",
                                            "Ezza-North",
                                            "Ezza-South",
                                            "Fakai",
                                            "Gwandu",
                                            "Ikwo",
                                            "Ishielu",
                                            "Ivo",
                                            "Izzi",
                                            "Jega",
                                            "Kalgo",
                                            "Koko/Besse",
                                            "Maiyama",
                                            "Ngaski",
                                            "Ohaozara",
                                            "Ohaukwu",
                                            "Onicha",
                                            "Sakaba",
                                            "Shanga",
                                            "Suru, Nigeria",
                                            "Wasagu/Danko",
                                            "Yauri, Nigeria",
                                            "Zuru"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 109,
                                        "input_type": "text",
                                        "label": "HomeTown",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 110,
                                        "input_type": "number",
                                        "label": "Mobile Phonee",
                                        "list": null,
                                        "required": null,
                                        "response": "09070899207334",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 111,
                                        "input_type": "text",
                                        "label": "Email",
                                        "list": null,
                                        "required": null,
                                        "response": "iknowyouarecomingcom",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": true
                                    },
                                    {
                                        "id": 112,
                                        "input_type": "select",
                                        "label": "Religion",
                                        "list": [
                                            "Christianity",
                                            "Islam",
                                            "Hinduism",
                                            "Buddhism",
                                            "Sikhism",
                                            "Judaism",
                                            "Bahá'í Faith",
                                            "Jainism",
                                            "Shinto",
                                            "Taoism",
                                            "Zoroastrianism",
                                            "Confucianism",
                                            "Animism",
                                            "African Traditional Religions",
                                            "Native American Religions",
                                            "Rastafari",
                                            "Scientism",
                                            "Atheism",
                                            "Agnosticism"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 113,
                                        "input_type": "text",
                                        "label": "Permanent Address",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 114,
                                        "input_type": "select",
                                        "label": "Disability",
                                        "list": [
                                            "None",
                                            "Other"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 115,
                                        "input_type": "text",
                                        "label": "If other Specify",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 116,
                                        "input_type": "text",
                                        "label": "Extra-Curricular Activities e.g (Sports/Hobbies)",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 34,
                                        "isReadonly": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "pageId": 32,
                        "pageName": "Page 2",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 117,
                                "sectionName": "Next of Kin",
                                "fieldDetails": [
                                    {
                                        "id": 117,
                                        "input_type": "text",
                                        "label": "Next of Kin's Name",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 35,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 118,
                                        "input_type": "text",
                                        "label": "Next of Kin's Address",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 35,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 119,
                                        "input_type": "select",
                                        "label": "Next of Kin's Relationship",
                                        "list": [
                                            "Father",
                                            "Mother",
                                            "Brother",
                                            "Sister",
                                            "Cousin",
                                            "Nephew",
                                            "Uncle",
                                            "Niece",
                                            "Aunt",
                                            "Grand Father",
                                            "Grand Mother",
                                            "Self",
                                            "Husband",
                                            "Wife",
                                            "Son",
                                            "Daughter"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 35,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 120,
                                        "input_type": "number",
                                        "label": "Next of Kin's Mobile Phone",
                                        "list": null,
                                        "required": null,
                                        "response": "09070899207334",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 35,
                                        "isReadonly": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "pageId": 33,
                        "pageName": "Page 3(O-level Result)",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 121,
                                "sectionName": "O-Level Result",
                                "fieldDetails": [
                                    {
                                        "id": 121,
                                        "input_type": "text",
                                        "label": "O-Level",
                                        "list": [
                                            "100 Level"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 36,
                                        "isReadonly": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "pageId": 34,
                        "pageName": "Page 4",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 122,
                                "sectionName": "UTME Details/Mode of Reference",
                                "fieldDetails": [
                                    {
                                        "id": 122,
                                        "input_type": "text",
                                        "label": "Jamb Registration No",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 123,
                                        "input_type": "text",
                                        "label": "Jamb Score",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 124,
                                        "input_type": "select",
                                        "label": "Choice",
                                        "list": [
                                            "First",
                                            "Second",
                                            "Third"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 125,
                                        "input_type": "select",
                                        "label": "First Subject",
                                        "list": [
                                            "English",
                                            "Mathematics",
                                            "Physics",
                                            "Chemistry",
                                            "Agriculture",
                                            "Biology",
                                            "Economics",
                                            "Food and Nutrition",
                                            "Commerce",
                                            "Government",
                                            "Insurance",
                                            "Christian Religious Knowledge",
                                            "Dying and Blishing",
                                            "Account",
                                            "Literature In English",
                                            "Integrated Science",
                                            "Civic Education",
                                            "Igbo Language",
                                            "French",
                                            "Home Economics",
                                            "Computer",
                                            "Creative and Cultural Art",
                                            "Intro Technology",
                                            "Music",
                                            "Social Studies",
                                            "Business Studies",
                                            "Basic Technology",
                                            "General Paper",
                                            "Basic Science",
                                            "Physical and Health Education",
                                            "Fine Arts",
                                            "Data Processing",
                                            "Financial Accounting",
                                            "Geography",
                                            "Painting and Decoration",
                                            "Catering Craft",
                                            "Moral Instruction",
                                            "Business Method",
                                            "Principles of Accounts",
                                            "Office Practice",
                                            "History",
                                            "Typewriting",
                                            "Shorthand",
                                            "Basic Electricity",
                                            "Technical Drawing",
                                            "Further Mathematics",
                                            "Book Keeping & Principles of Accounting",
                                            "Health Science",
                                            "Wood Work",
                                            "Basic Electronics",
                                            "Auto Mechanics",
                                            "Metal Work",
                                            "Home Management",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (INTRODUCTI",
                                            "BASKETRY",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (TRACTOR SY",
                                            "ANIMAL HUSBANDARY",
                                            "APPLIED ELECTRICITY",
                                            "APPLIED ELECTRICITY AND AUTOMOBILE",
                                            "ARABIC",
                                            "ARITHMETIC PROCESS",
                                            "AUTO ELECTRICAL WORKS",
                                            "AUTOMOBILE ELECTRICAL WORKS",
                                            "BLOCKLAYING, BRICKLAYING AND CONCRETING",
                                            "BUILDING CONSTRUCTION",
                                            "BUILDING/ENGINEERING DRAWING",
                                            "BUSINESS MANAGEMENT",
                                            "CARPENTRY AND JOINERY",
                                            "CERAMICS",
                                            "CERAMICS (CERAMICS DESIGN)",
                                            "CHRISTIAN RELIGIOUS STUDIES",
                                            "CIVIC EDUCATION",
                                            "CLERICAL OFFICE DUTIES",
                                            "CLOTHING AND TEXTILE",
                                            "COMPUTER CRAFT STUDIES",
                                            "COSMETOLOGY",
                                            "CROP HUSBANDARY AND HORTICULTURE",
                                            "DRAUGHTMANSHIP CRAFT PRACTICE (DRAUGHTMANSHIP)",
                                            "ELECTRICAL INSTALLATION AND MAINTENANCE WORK",
                                            "ELECTRONICS",
                                            "ELECTRONICS WORKS",
                                            "ENGINEERING SCIENCE",
                                            "FABRICATION AND WEILDING",
                                            "FISHERIES",
                                            "FITTING DRILLING AND GRINDING",
                                            "FORESTERY",
                                            "FOUNDRY CRAFT PRACTICE",
                                            "FURNITURE MAKING",
                                            "GENERAL METAL WORK",
                                            "GENERAL WOOD WORK",
                                            "GRAPHIC ART (GRAPHIC DESIGN)",
                                            "GRAPHIC DESIGN",
                                            "HAUSA LANGUAGE",
                                            "HISTORY",
                                            "INFORMATION COMMUNICATION TECHNOLOGY (ICT)",
                                            "INSTRUMENT MECHANICS WORKS",
                                            "INTRODUCTION TO BUILDING CONSTRUCTION",
                                            "ISLAMIC STUDIES",
                                            "JEWELLERY",
                                            "",
                                            "LADIES GARMENT MAKING (GARMENT CONSTRUCTION AND FI",
                                            "LEATHER TRADES (FOOTWEAR MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER GOODS MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER TRANNING)",
                                            "LEATHERWORK",
                                            "LIGHT VEHICLE BODY REPAIR WORKS",
                                            "MACHING WOOD WORKING",
                                            "MANAGEMENT IN-LIVING",
                                            "MARINE ENGINEERING CRAFT",
                                            "MARINE ENGINEERING CRAFT PRACTICE",
                                            "MECHANICAL ENGINEERING CRAFT PRACTICE",
                                            "MEDICAL ENGINEERING CRAFT PRACTICE",
                                            "MEN'S GARMENT MAKING (GARMENT CONSTRUCTION AND FIN",
                                            "MOTOR VEHICLE MECHANICS WORK",
                                            "PHOTOGRAPHIC PRACTICE",
                                            "PHYSICAL EDUCATION",
                                            "PICTURE MAKING",
                                            "PLUMBING AND PIPE FITTING",
                                            "PRATICAL TEACHING",
                                            "PRINCIPLE & PRACTICE OF  EDUCATION",
                                            "PRINCIPLES & PRACTICE OF EDUCATION",
                                            "PRINTING CRAFT PRACTICE",
                                            "REFRIGERATION AND AIR-CONDITIONING",
                                            "SALESMANSHIP",
                                            "SCULPTURE",
                                            "SECRETARIAL STUDIES",
                                            "SHIP CRAFT PRACTICE",
                                            "TEXTILE TRADE (BLEACHING, DYEING AND FINISHING)",
                                            "TEXTILE TRADE (SPINNING)",
                                            "TEXTILE TRADE (WEAVING)",
                                            "TEXTILE TRADES (SURFACE DESIGN AND TEXTILE PRINTIN",
                                            "TEXTILES",
                                            "TOURISM",
                                            "TURNING MILLING AND SHAPING",
                                            "VEHICLE BODY BUILDING",
                                            "VISUAL ART",
                                            "YORUBA LANGUAGE",
                                            "Marketing"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 126,
                                        "input_type": "select",
                                        "label": "Second Subject",
                                        "list": [
                                            "English",
                                            "Mathematics",
                                            "Physics",
                                            "Chemistry",
                                            "Agriculture",
                                            "Biology",
                                            "Economics",
                                            "Food and Nutrition",
                                            "Commerce",
                                            "Government",
                                            "Insurance",
                                            "Christian Religious Knowledge",
                                            "Dying and Blishing",
                                            "Account",
                                            "Literature In English",
                                            "Integrated Science",
                                            "Civic Education",
                                            "Igbo Language",
                                            "French",
                                            "Home Economics",
                                            "Computer",
                                            "Creative and Cultural Art",
                                            "Intro Technology",
                                            "Music",
                                            "Social Studies",
                                            "Business Studies",
                                            "Basic Technology",
                                            "General Paper",
                                            "Basic Science",
                                            "Physical and Health Education",
                                            "Fine Arts",
                                            "Data Processing",
                                            "Financial Accounting",
                                            "Geography",
                                            "Painting and Decoration",
                                            "Catering Craft",
                                            "Moral Instruction",
                                            "Business Method",
                                            "Principles of Accounts",
                                            "Office Practice",
                                            "History",
                                            "Typewriting",
                                            "Shorthand",
                                            "Basic Electricity",
                                            "Technical Drawing",
                                            "Further Mathematics",
                                            "Book Keeping & Principles of Accounting",
                                            "Health Science",
                                            "Wood Work",
                                            "Basic Electronics",
                                            "Auto Mechanics",
                                            "Metal Work",
                                            "Home Management",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (INTRODUCTI",
                                            "BASKETRY",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (TRACTOR SY",
                                            "ANIMAL HUSBANDARY",
                                            "APPLIED ELECTRICITY",
                                            "APPLIED ELECTRICITY AND AUTOMOBILE",
                                            "ARABIC",
                                            "ARITHMETIC PROCESS",
                                            "AUTO ELECTRICAL WORKS",
                                            "AUTOMOBILE ELECTRICAL WORKS",
                                            "BLOCKLAYING, BRICKLAYING AND CONCRETING",
                                            "BUILDING CONSTRUCTION",
                                            "BUILDING/ENGINEERING DRAWING",
                                            "BUSINESS MANAGEMENT",
                                            "CARPENTRY AND JOINERY",
                                            "CERAMICS",
                                            "CERAMICS (CERAMICS DESIGN)",
                                            "CHRISTIAN RELIGIOUS STUDIES",
                                            "CIVIC EDUCATION",
                                            "CLERICAL OFFICE DUTIES",
                                            "CLOTHING AND TEXTILE",
                                            "COMPUTER CRAFT STUDIES",
                                            "COSMETOLOGY",
                                            "CROP HUSBANDARY AND HORTICULTURE",
                                            "DRAUGHTMANSHIP CRAFT PRACTICE (DRAUGHTMANSHIP)",
                                            "ELECTRICAL INSTALLATION AND MAINTENANCE WORK",
                                            "ELECTRONICS",
                                            "ELECTRONICS WORKS",
                                            "ENGINEERING SCIENCE",
                                            "FABRICATION AND WEILDING",
                                            "FISHERIES",
                                            "FITTING DRILLING AND GRINDING",
                                            "FORESTERY",
                                            "FOUNDRY CRAFT PRACTICE",
                                            "FURNITURE MAKING",
                                            "GENERAL METAL WORK",
                                            "GENERAL WOOD WORK",
                                            "GRAPHIC ART (GRAPHIC DESIGN)",
                                            "GRAPHIC DESIGN",
                                            "HAUSA LANGUAGE",
                                            "HISTORY",
                                            "INFORMATION COMMUNICATION TECHNOLOGY (ICT)",
                                            "INSTRUMENT MECHANICS WORKS",
                                            "INTRODUCTION TO BUILDING CONSTRUCTION",
                                            "ISLAMIC STUDIES",
                                            "JEWELLERY",
                                            "",
                                            "LADIES GARMENT MAKING (GARMENT CONSTRUCTION AND FI",
                                            "LEATHER TRADES (FOOTWEAR MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER GOODS MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER TRANNING)",
                                            "LEATHERWORK",
                                            "LIGHT VEHICLE BODY REPAIR WORKS",
                                            "MACHING WOOD WORKING",
                                            "MANAGEMENT IN-LIVING",
                                            "MARINE ENGINEERING CRAFT",
                                            "MARINE ENGINEERING CRAFT PRACTICE",
                                            "MECHANICAL ENGINEERING CRAFT PRACTICE",
                                            "MEDICAL ENGINEERING CRAFT PRACTICE",
                                            "MEN'S GARMENT MAKING (GARMENT CONSTRUCTION AND FIN",
                                            "MOTOR VEHICLE MECHANICS WORK",
                                            "PHOTOGRAPHIC PRACTICE",
                                            "PHYSICAL EDUCATION",
                                            "PICTURE MAKING",
                                            "PLUMBING AND PIPE FITTING",
                                            "PRATICAL TEACHING",
                                            "PRINCIPLE & PRACTICE OF  EDUCATION",
                                            "PRINCIPLES & PRACTICE OF EDUCATION",
                                            "PRINTING CRAFT PRACTICE",
                                            "REFRIGERATION AND AIR-CONDITIONING",
                                            "SALESMANSHIP",
                                            "SCULPTURE",
                                            "SECRETARIAL STUDIES",
                                            "SHIP CRAFT PRACTICE",
                                            "TEXTILE TRADE (BLEACHING, DYEING AND FINISHING)",
                                            "TEXTILE TRADE (SPINNING)",
                                            "TEXTILE TRADE (WEAVING)",
                                            "TEXTILE TRADES (SURFACE DESIGN AND TEXTILE PRINTIN",
                                            "TEXTILES",
                                            "TOURISM",
                                            "TURNING MILLING AND SHAPING",
                                            "VEHICLE BODY BUILDING",
                                            "VISUAL ART",
                                            "YORUBA LANGUAGE",
                                            "Marketing"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 127,
                                        "input_type": "select",
                                        "label": "Third Subject",
                                        "list": [
                                            "English",
                                            "Mathematics",
                                            "Physics",
                                            "Chemistry",
                                            "Agriculture",
                                            "Biology",
                                            "Economics",
                                            "Food and Nutrition",
                                            "Commerce",
                                            "Government",
                                            "Insurance",
                                            "Christian Religious Knowledge",
                                            "Dying and Blishing",
                                            "Account",
                                            "Literature In English",
                                            "Integrated Science",
                                            "Civic Education",
                                            "Igbo Language",
                                            "French",
                                            "Home Economics",
                                            "Computer",
                                            "Creative and Cultural Art",
                                            "Intro Technology",
                                            "Music",
                                            "Social Studies",
                                            "Business Studies",
                                            "Basic Technology",
                                            "General Paper",
                                            "Basic Science",
                                            "Physical and Health Education",
                                            "Fine Arts",
                                            "Data Processing",
                                            "Financial Accounting",
                                            "Geography",
                                            "Painting and Decoration",
                                            "Catering Craft",
                                            "Moral Instruction",
                                            "Business Method",
                                            "Principles of Accounts",
                                            "Office Practice",
                                            "History",
                                            "Typewriting",
                                            "Shorthand",
                                            "Basic Electricity",
                                            "Technical Drawing",
                                            "Further Mathematics",
                                            "Book Keeping & Principles of Accounting",
                                            "Health Science",
                                            "Wood Work",
                                            "Basic Electronics",
                                            "Auto Mechanics",
                                            "Metal Work",
                                            "Home Management",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (INTRODUCTI",
                                            "BASKETRY",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (TRACTOR SY",
                                            "ANIMAL HUSBANDARY",
                                            "APPLIED ELECTRICITY",
                                            "APPLIED ELECTRICITY AND AUTOMOBILE",
                                            "ARABIC",
                                            "ARITHMETIC PROCESS",
                                            "AUTO ELECTRICAL WORKS",
                                            "AUTOMOBILE ELECTRICAL WORKS",
                                            "BLOCKLAYING, BRICKLAYING AND CONCRETING",
                                            "BUILDING CONSTRUCTION",
                                            "BUILDING/ENGINEERING DRAWING",
                                            "BUSINESS MANAGEMENT",
                                            "CARPENTRY AND JOINERY",
                                            "CERAMICS",
                                            "CERAMICS (CERAMICS DESIGN)",
                                            "CHRISTIAN RELIGIOUS STUDIES",
                                            "CIVIC EDUCATION",
                                            "CLERICAL OFFICE DUTIES",
                                            "CLOTHING AND TEXTILE",
                                            "COMPUTER CRAFT STUDIES",
                                            "COSMETOLOGY",
                                            "CROP HUSBANDARY AND HORTICULTURE",
                                            "DRAUGHTMANSHIP CRAFT PRACTICE (DRAUGHTMANSHIP)",
                                            "ELECTRICAL INSTALLATION AND MAINTENANCE WORK",
                                            "ELECTRONICS",
                                            "ELECTRONICS WORKS",
                                            "ENGINEERING SCIENCE",
                                            "FABRICATION AND WEILDING",
                                            "FISHERIES",
                                            "FITTING DRILLING AND GRINDING",
                                            "FORESTERY",
                                            "FOUNDRY CRAFT PRACTICE",
                                            "FURNITURE MAKING",
                                            "GENERAL METAL WORK",
                                            "GENERAL WOOD WORK",
                                            "GRAPHIC ART (GRAPHIC DESIGN)",
                                            "GRAPHIC DESIGN",
                                            "HAUSA LANGUAGE",
                                            "HISTORY",
                                            "INFORMATION COMMUNICATION TECHNOLOGY (ICT)",
                                            "INSTRUMENT MECHANICS WORKS",
                                            "INTRODUCTION TO BUILDING CONSTRUCTION",
                                            "ISLAMIC STUDIES",
                                            "JEWELLERY",
                                            "",
                                            "LADIES GARMENT MAKING (GARMENT CONSTRUCTION AND FI",
                                            "LEATHER TRADES (FOOTWEAR MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER GOODS MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER TRANNING)",
                                            "LEATHERWORK",
                                            "LIGHT VEHICLE BODY REPAIR WORKS",
                                            "MACHING WOOD WORKING",
                                            "MANAGEMENT IN-LIVING",
                                            "MARINE ENGINEERING CRAFT",
                                            "MARINE ENGINEERING CRAFT PRACTICE",
                                            "MECHANICAL ENGINEERING CRAFT PRACTICE",
                                            "MEDICAL ENGINEERING CRAFT PRACTICE",
                                            "MEN'S GARMENT MAKING (GARMENT CONSTRUCTION AND FIN",
                                            "MOTOR VEHICLE MECHANICS WORK",
                                            "PHOTOGRAPHIC PRACTICE",
                                            "PHYSICAL EDUCATION",
                                            "PICTURE MAKING",
                                            "PLUMBING AND PIPE FITTING",
                                            "PRATICAL TEACHING",
                                            "PRINCIPLE & PRACTICE OF  EDUCATION",
                                            "PRINCIPLES & PRACTICE OF EDUCATION",
                                            "PRINTING CRAFT PRACTICE",
                                            "REFRIGERATION AND AIR-CONDITIONING",
                                            "SALESMANSHIP",
                                            "SCULPTURE",
                                            "SECRETARIAL STUDIES",
                                            "SHIP CRAFT PRACTICE",
                                            "TEXTILE TRADE (BLEACHING, DYEING AND FINISHING)",
                                            "TEXTILE TRADE (SPINNING)",
                                            "TEXTILE TRADE (WEAVING)",
                                            "TEXTILE TRADES (SURFACE DESIGN AND TEXTILE PRINTIN",
                                            "TEXTILES",
                                            "TOURISM",
                                            "TURNING MILLING AND SHAPING",
                                            "VEHICLE BODY BUILDING",
                                            "VISUAL ART",
                                            "YORUBA LANGUAGE",
                                            "Marketing"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 128,
                                        "input_type": "select",
                                        "label": "Fourth Subject",
                                        "list": [
                                            "English",
                                            "Mathematics",
                                            "Physics",
                                            "Chemistry",
                                            "Agriculture",
                                            "Biology",
                                            "Economics",
                                            "Food and Nutrition",
                                            "Commerce",
                                            "Government",
                                            "Insurance",
                                            "Christian Religious Knowledge",
                                            "Dying and Blishing",
                                            "Account",
                                            "Literature In English",
                                            "Integrated Science",
                                            "Civic Education",
                                            "Igbo Language",
                                            "French",
                                            "Home Economics",
                                            "Computer",
                                            "Creative and Cultural Art",
                                            "Intro Technology",
                                            "Music",
                                            "Social Studies",
                                            "Business Studies",
                                            "Basic Technology",
                                            "General Paper",
                                            "Basic Science",
                                            "Physical and Health Education",
                                            "Fine Arts",
                                            "Data Processing",
                                            "Financial Accounting",
                                            "Geography",
                                            "Painting and Decoration",
                                            "Catering Craft",
                                            "Moral Instruction",
                                            "Business Method",
                                            "Principles of Accounts",
                                            "Office Practice",
                                            "History",
                                            "Typewriting",
                                            "Shorthand",
                                            "Basic Electricity",
                                            "Technical Drawing",
                                            "Further Mathematics",
                                            "Book Keeping & Principles of Accounting",
                                            "Health Science",
                                            "Wood Work",
                                            "Basic Electronics",
                                            "Auto Mechanics",
                                            "Metal Work",
                                            "Home Management",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (INTRODUCTI",
                                            "BASKETRY",
                                            "AGRICULTURAL EQUIPMENT MECHANICS WORKS (TRACTOR SY",
                                            "ANIMAL HUSBANDARY",
                                            "APPLIED ELECTRICITY",
                                            "APPLIED ELECTRICITY AND AUTOMOBILE",
                                            "ARABIC",
                                            "ARITHMETIC PROCESS",
                                            "AUTO ELECTRICAL WORKS",
                                            "AUTOMOBILE ELECTRICAL WORKS",
                                            "BLOCKLAYING, BRICKLAYING AND CONCRETING",
                                            "BUILDING CONSTRUCTION",
                                            "BUILDING/ENGINEERING DRAWING",
                                            "BUSINESS MANAGEMENT",
                                            "CARPENTRY AND JOINERY",
                                            "CERAMICS",
                                            "CERAMICS (CERAMICS DESIGN)",
                                            "CHRISTIAN RELIGIOUS STUDIES",
                                            "CIVIC EDUCATION",
                                            "CLERICAL OFFICE DUTIES",
                                            "CLOTHING AND TEXTILE",
                                            "COMPUTER CRAFT STUDIES",
                                            "COSMETOLOGY",
                                            "CROP HUSBANDARY AND HORTICULTURE",
                                            "DRAUGHTMANSHIP CRAFT PRACTICE (DRAUGHTMANSHIP)",
                                            "ELECTRICAL INSTALLATION AND MAINTENANCE WORK",
                                            "ELECTRONICS",
                                            "ELECTRONICS WORKS",
                                            "ENGINEERING SCIENCE",
                                            "FABRICATION AND WEILDING",
                                            "FISHERIES",
                                            "FITTING DRILLING AND GRINDING",
                                            "FORESTERY",
                                            "FOUNDRY CRAFT PRACTICE",
                                            "FURNITURE MAKING",
                                            "GENERAL METAL WORK",
                                            "GENERAL WOOD WORK",
                                            "GRAPHIC ART (GRAPHIC DESIGN)",
                                            "GRAPHIC DESIGN",
                                            "HAUSA LANGUAGE",
                                            "HISTORY",
                                            "INFORMATION COMMUNICATION TECHNOLOGY (ICT)",
                                            "INSTRUMENT MECHANICS WORKS",
                                            "INTRODUCTION TO BUILDING CONSTRUCTION",
                                            "ISLAMIC STUDIES",
                                            "JEWELLERY",
                                            "",
                                            "LADIES GARMENT MAKING (GARMENT CONSTRUCTION AND FI",
                                            "LEATHER TRADES (FOOTWEAR MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER GOODS MANUFACTURE)",
                                            "LEATHER TRADES (LEATHER TRANNING)",
                                            "LEATHERWORK",
                                            "LIGHT VEHICLE BODY REPAIR WORKS",
                                            "MACHING WOOD WORKING",
                                            "MANAGEMENT IN-LIVING",
                                            "MARINE ENGINEERING CRAFT",
                                            "MARINE ENGINEERING CRAFT PRACTICE",
                                            "MECHANICAL ENGINEERING CRAFT PRACTICE",
                                            "MEDICAL ENGINEERING CRAFT PRACTICE",
                                            "MEN'S GARMENT MAKING (GARMENT CONSTRUCTION AND FIN",
                                            "MOTOR VEHICLE MECHANICS WORK",
                                            "PHOTOGRAPHIC PRACTICE",
                                            "PHYSICAL EDUCATION",
                                            "PICTURE MAKING",
                                            "PLUMBING AND PIPE FITTING",
                                            "PRATICAL TEACHING",
                                            "PRINCIPLE & PRACTICE OF  EDUCATION",
                                            "PRINCIPLES & PRACTICE OF EDUCATION",
                                            "PRINTING CRAFT PRACTICE",
                                            "REFRIGERATION AND AIR-CONDITIONING",
                                            "SALESMANSHIP",
                                            "SCULPTURE",
                                            "SECRETARIAL STUDIES",
                                            "SHIP CRAFT PRACTICE",
                                            "TEXTILE TRADE (BLEACHING, DYEING AND FINISHING)",
                                            "TEXTILE TRADE (SPINNING)",
                                            "TEXTILE TRADE (WEAVING)",
                                            "TEXTILE TRADES (SURFACE DESIGN AND TEXTILE PRINTIN",
                                            "TEXTILES",
                                            "TOURISM",
                                            "TURNING MILLING AND SHAPING",
                                            "VEHICLE BODY BUILDING",
                                            "VISUAL ART",
                                            "YORUBA LANGUAGE",
                                            "Marketing"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 37,
                                        "isReadonly": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "pageId": 35,
                        "pageName": "Page 5",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 129,
                                "sectionName": "Academic Details",
                                "fieldDetails": [
                                    {
                                        "id": 129,
                                        "input_type": "text",
                                        "label": "Programme",
                                        "list": [
                                            "Regular",
                                            "ND part-time",
                                            "HND ",
                                            "HND MORNING",
                                            "",
                                            "test"
                                        ],
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 38,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 130,
                                        "input_type": "text",
                                        "label": "School",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 38,
                                        "isReadonly": false
                                    },
                                    {
                                        "id": 131,
                                        "input_type": "text",
                                        "label": "Course of Study",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 38,
                                        "isReadonly": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "pageId": 36,
                        "pageName": "Page 6(Passport)",
                        "programmeId": 1,
                        "programmeName": "Regular",
                        "sessionId": 32,
                        "sessionName": "2022/2023",
                        "sections": [
                            {
                                "sectionId": 132,
                                "sectionName": "Passport Photograph",
                                "fieldDetails": [
                                    {
                                        "id": 132,
                                        "input_type": "text",
                                        "label": "Passport Photograph",
                                        "list": null,
                                        "required": null,
                                        "response": "",
                                        "errorMessage": null,
                                        "dynamicFormPageSectionSetupId": 39,
                                        "isReadonly": false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "submitOlevelResult": [],
                "personId": 33,
                "personUrl": null
            }
        }
    };



    const submitFirstOlevelResult = [
        {
            "centerName": null,
            "examCode": null,
            "examNumber": firstexamNumber,
            "examYear": firstexamYear,
            "olevelResultsDto": [
                {
                    "grade": firstGrade1,
                    "subject": firstSub1
                },
                {
                    "grade": firstGrade2,
                    "subject": firstSub2
                },
                {
                    "grade": firstGrade3,
                    "subject": firstSub3
                },
                {
                    "grade": firstGrade4,
                    "subject": firstSub4
                },
                {
                    "grade": firstGrade5,
                    "subject": firstSub5
                },
                {
                    "grade": firstGrade6,
                    "subject": firstSub6
                },
                {
                    "grade": firstGrade7,
                    "subject": firstSub7
                },
                {
                    "grade": firstGrade8,
                    "subject": firstSub8
                },
                {
                    "grade": firstGrade9,
                    "subject": firstSub9
                }
            ],
            "olevelType": firstexamType,
            "sitting": 1
        }
    ]
    const submitSecondOlevelResult = [
        {
            "centerName": null,
            "examCode": null,
            "examNumber": secondexamNumber,
            "examYear": secondexamYear,
            "olevelResultsDto": [
                {
                    "grade": secondGrade1,
                    "subject": secondSub1
                },
                {
                    "grade": secondGrade2,
                    "subject": secondSub2
                },
                {
                    "grade": secondGrade3,
                    "subject": secondSub3
                },
                {
                    "grade": secondGrade4,
                    "subject": secondSub4
                },
                {
                    "grade": secondGrade5,
                    "subject": secondSub5
                },
                {
                    "grade": secondGrade6,
                    "subject": secondSub6
                },
                {
                    "grade": secondGrade7,
                    "subject": secondSub7
                }, {
                    "grade": secondGrade8,
                    "subject": secondSub8
                },
                {
                    "grade": secondGrade9,
                    "subject": secondSub9
                },
            ],
            "olevelType": secondexamType,
            "sitting": 2
        }
    ]

    const handleChange = (id, value) => {

        const updatedFields = fields.map((field) =>
            field.id === id ? { ...field, response: value } : field
        );
        setFields(updatedFields);

    };
    //console.log(fields, "feild valuesssss")
    const RenderInputs = (field) => {

        var selectedField = fields.find((fieldxx) => fieldxx.id === field.id);


        if (field.input_type === "select") {

            return (
                <div key={field.id} className="field">
                    <label className="font-bold">
                        {field.label}
                    </label>

                    <select class="form-control select"
                        value={selectedField?.response}
                        disabled={field?.isReadonly}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        name={field.id}>
                        <option>Select {field.label}</option>
                        {field?.list.map((x) => (
                            <option>{x}</option>
                        ))}
                    </select>
                </div>
            );
        }
        else {

            return (
                <div key={field.id} className="field">
                    <label className="font-bold">
                        {field.label}
                    </label>

                    <input
                        className="form-control dynamicForm"
                        placeholder={`Enter ${field.label}`}
                        value={selectedField?.response}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        disabled={field?.isReadonly}
                        type={field.input_type}
                        name={field.id}
                        autoComplete={field.label}
                        id={field.id}
                    />

                </div>
            );
        }



    };
    const RenderPreviewInputs = (field) => {

        var selectedField = fields.find((fieldxx) => fieldxx.id === field.id);


        if (field.input_type === "select") {

            return (
                <div key={field.id} className="field">
                    <label className="font-bold">
                        {field.label}
                    </label>

                    <select class="form-control select"
                        value={selectedField?.response}
                        disabled={true}

                        onChange={(e) => handleChange(field.id, e.target.value)}
                        name={field.id}>
                        <option>Select {field.label}</option>
                        {field?.list.map((x) => (
                            <option>{x}</option>
                        ))}
                    </select>
                </div>
            );
        }
        else {

            return (
                <div key={field.id} className="field">
                    <label className="font-bold">
                        {field.label}
                    </label>

                    <input
                        className="form-control dynamicForm"
                        placeholder={`Enter ${field.label}`}
                        value={selectedField?.response}
                        onChange={(e) => handleChange(field.id, e.target.value)}

                        type={field.input_type}
                        name={field.id}
                        autoComplete={field.label}
                        id={field.id}
                        disabled={true}
                    />

                </div>
            );
        }



    };




    const handleTabNavigation = (targetTabIndex) => {
        // console.log(data?.data?.applicantForm?.mainPages.length, "index lemgth")
        if (targetTabIndex >= 0 && targetTabIndex < data?.data?.applicantForm?.mainPages.length) {
            setActiveTabIndex(targetTabIndex);
            if (targetTabIndex == 0) {
                setpreviousactiveButton(false);
            } else {
                setpreviousactiveButton(true)
            }
            if (targetTabIndex == data?.data?.applicantForm?.mainPages?.length - 1) {
                setnextactiveButton(false)
            } else {
                setnextactiveButton(true)
            }
        }
        else {
            if (targetTabIndex < 0) {
                setpreviousactiveButton(false);
            }
            else {
                setnextactiveButton(false)
            }
        }
    };
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = async (e) => {
        console.log("Actual upload")
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });


        setTotalSize(_totalSize);
        console.log(e, "file now......")
        const formData = new FormData();

        // Append each selected file to the FormData object
        e.files.forEach((file) => {
            formData.append("file", file, file.name);
        });

        // Make an HTTP POST request to the API endpoint
        const response = await fetch("http://backendvirtualschoolv2.lloydant.com/api/Passport", {
            method: "POST",
            body: formData,
        });
        let data = await response.text();
        console.log(data, "passport images")
        setPictureUrl(data);
        if (response.ok) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        }
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };
    const previewheaderTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>

                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };



    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                {false ? <>
                    <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                    <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                        Drag and Drop Image Here
                    </span></> :
                    <img alt="Pictures" role="presentation" src="http://backendvirtualschoolv2.lloydant.com/Images/Pictures/9fec955a-dff4-4175-aadd-397351d467d95_92.PNG" width={200} />
                }
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };




    const NullChecker = () => {
        var check = true;
        var formsDto = fields.map((item) => {
            if (item.response === null || item.response === "") {
                setVisible(true)
                check = false;
            }
        });
        if (pictureUrl === null || pictureUrl === "") {
            check = false;
        }
        if (submitFirstOlevelResult?.examNumber === null || submitFirstOlevelResult?.examNumber === "") {
            check = false;
        }
        return check;
    }


    const submitForm = async () => {
        var checkNull = NullChecker();

        if (checkNull) {
            setTimeout(async () => {
                try {
                    var formsDto = fields.map((item) => {
                        return {
                            feildId: item.id,
                            response: item.response,
                        };
                    });
                    const forms = await formSubmit({
                        variables: {
                            model: {
                                personId: form?.applicantForm?.personId,
                                formDetails: formsDto,
                                submitOlevelResult: [submitFirstOlevelResult, submitSecondOlevelResult],
                                pictureUrl: pictureUrl,
                            },
                        },
                    });
                    setLoad(false);
                } catch (err) {
                    setLoad(false);
                    toast.error(err.message);
                }
            }, 3000);
        }
    };

    return (
        <>
            <Header>
                {isLoading ? <Spinner /> :
                    <div className="Homepage-wrapper">
                        <div className="content container-fluid">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">
                                    <div className="card bg-white">
                                        <div className="card-header">
                                            <h5 className="card-title">Application Form</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                                                {data?.data?.applicantForm?.mainPages.map((item0, index0) => (
                                                    < >
                                                        <li className="nav-item"><a className={`nav-link ${index0 === activeTabIndex ? 'active' : ''}`} href={`#solid-rounded-tab${index0 + 1}`}
                                                            data-bs-toggle="tab" onClick={() => handleTabNavigation(index0)}
                                                        >{item0.pageName}</a></li>
                                                    </>

                                                ))}
                                            </ul>
                                            <div className="tab-content">
                                                {data?.data?.applicantForm?.mainPages.map((item, index) => (
                                                    < >

                                                        <div key={index} className={`tab-pane ${index === activeTabIndex ? 'show active' : ''}`} id={`solid-rounded-tab${index + 1}`}>

                                                            {item?.pageName?.includes("O-level Result") ?
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
                                                                                                        <input type="text" className="form-control" onChange={(e) => setfirstexamNumber(e.target.value)} />
                                                                                                    </div>
                                                                                                    <div className="form-group">
                                                                                                        <label>Olevel Type</label>
                                                                                                        <input type="text" className="form-control" onChange={(e) => setfirstexamType(e.target.value)} />
                                                                                                    </div>
                                                                                                    <div className="form-group">
                                                                                                        <label>Exam Year</label>
                                                                                                        <input type="text" className="form-control" onChange={(e) => setfirstexamYear(e.target.value)} />
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
                                                                                                        <input type="text" className="form-control" onChange={(e) => setsecondexamNumber(e.target.value)} y />
                                                                                                    </div>
                                                                                                    <div className="form-group">
                                                                                                        <label>Olevel Type</label>
                                                                                                        <input type="text" className="form-control" onChange={(e) => setsecondexamType(e.target.value)} />
                                                                                                    </div>
                                                                                                    <div className="form-group">
                                                                                                        <label>Exam Year</label>
                                                                                                        <input type="text" className="form-control" onChange={(e) => setsecondexamYear(e.target.value)} />
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

                                                                                                </form>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : <></>}
                                                            {item?.pageName?.includes("Passport") ? <>
                                                                <div className="col-12">
                                                                    <h5 className="form-title">
                                                                        <span>Upload Passport</span>
                                                                    </h5>
                                                                </div>
                                                                <div className=" row col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">


                                                                    <div className="col-10">
                                                                        <Toast ref={toast}></Toast>

                                                                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                                                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                                                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                                                        <FileUpload ref={fileUploadRef} name="file" url="http://backendvirtualschoolv2.lloydant.com/api/Passport" multiple accept="image/*" maxFileSize={1000000}
                                                                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                                                    </div>

                                                                </div>
                                                            </> : <></>}
                                                            {item?.pageName?.includes("O-level Result") || item?.pageName?.includes("Passport") ? <></> :
                                                                item?.sections?.map((item2, index2) => (
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <h5 className="form-title">
                                                                                <span>{item2?.sectionName}</span>
                                                                            </h5>
                                                                        </div>
                                                                        <>
                                                                            {item2.fieldDetails.map((item3, index3) => (

                                                                                <>
                                                                                    <div className="col-lg-4 col-sm-12" key={index3}>
                                                                                        <div className="form-group local-forms">
                                                                                            {RenderInputs(item3)}
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            ))}
                                                                        </>
                                                                    </div>
                                                                ))}


                                                            <div className='col-auto text-end float-end ms-auto download-grp'>
                                                                {nextactiveButton === false ?
                                                                    <button
                                                                        className="btn btn-outline-primary me-2"
                                                                        onClick={() => submitForm()} // Navigate to the previous tab
                                                                    >
                                                                        <i className="fas fa-paper-plane"></i> Submit
                                                                    </button>
                                                                    :
                                                                    <button  {...(nextactiveButton === false ? { disabled: 'disabled' } : {})}
                                                                        className="btn btn-outline-primary me-2"
                                                                        onClick={() => handleTabNavigation(activeTabIndex + 1)} // Navigate to the next tab
                                                                    >
                                                                        Next <i className="fas fa-chevron-circle-right"></i>
                                                                    </button>
                                                                }
                                                            </div>
                                                            <div className='col-auto text-end float-end ms-auto download-grp'>

                                                                <button  {...(previousactiveButton === false ? { disabled: 'disabled' } : {})}
                                                                    className="btn btn-outline-primary me-2"
                                                                    onClick={() => handleTabNavigation(activeTabIndex - 1)} // Navigate to the previous tab
                                                                >
                                                                    <i className="fas fa-chevron-circle-left"></i> Previous
                                                                </button>

                                                            </div>
                                                        </div >

                                                    </>
                                                ))
                                                }
                                            </div>
                                        </div > </div > </div > </div > </div >
                    </div >
                }
            </Header >
            <Dialog header="Form Submission Error" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <p className="m-0">
                    We apologize, but your form cannot be submitted at this time because
                    some parts of the form have not been filled out completely. Please
                    review the form and complete all required fields.
                </p>
                <p className="m-0">
                    If you encounter any difficulties or have questions regarding specific
                    sections of the form, please don't hesitate to reach out to our support
                    team at support@lloydant.com/07088391544 or 090838920222.
                </p>
            </Dialog>
            <Dialog header="Preview" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div>
                    {data?.data?.applicantForm?.mainPages.map((item, index) => (
                        < >

                            <div key={index} >

                                {item?.pageName?.includes("O-level Result") ?
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <div className="card-header">
                                                    <h5 className="card-title">Preview Olevel Details</h5>
                                                </div>
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
                                                                            <input type="text" className="form-control" onChange={(e) => setfirstexamNumber(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Olevel Type</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setfirstexamType(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Exam Year</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setfirstexamYear(e.target.value)} />
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
                                                                            <input type="text" className="form-control" onChange={(e) => setsecondexamNumber(e.target.value)} y />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Olevel Type</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setsecondexamType(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Exam Year</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setsecondexamYear(e.target.value)} />
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

                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <></>}
                                {item?.pageName?.includes("Passport") ? <>
                                    <div className="col-12">
                                        <h5 className="form-title">
                                            <span>Preview Passport</span>
                                        </h5>
                                    </div>
                                    <div className=" row col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">


                                        <div className="col-10">
                                            <Toast ref={toast}></Toast>

                                            {/* <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" /> */}

                                            <FileUpload ref={fileUploadRef} name="file" url="http://backendvirtualschoolv2.lloydant.com/api/Passport" multiple accept="image/*"
                                                maxFileSize={1000000}
                                                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                headerTemplate={previewheaderTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                        </div>

                                    </div>
                                </> : <></>}
                                {item?.pageName?.includes("O-level Result") || item?.pageName?.includes("Passport") ? <></> :
                                    item?.sections?.map((item2, index2) => (
                                        <div className="row">
                                            <div className="col-12">
                                                <h5 className="form-title">
                                                    <span>Preview {item2?.sectionName}</span>
                                                </h5>
                                            </div>
                                            <>
                                                {item2.fieldDetails.map((item3, index3) => (

                                                    <>
                                                        <div className="col-lg-4 col-sm-12" key={index3}>
                                                            <div className="form-group local-forms">
                                                                {RenderPreviewInputs(item3)}
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                            </>
                                        </div>
                                    ))}




                            </div >

                        </>
                    ))
                    }
                    <div className='col-auto text-end float-end ms-auto download-grp pb-6'>

                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => submitForm()} // Navigate to the previous tab
                        >
                            <i className="fas fa-paper-plane"></i> Submit
                        </button>

                    </div>
                </div>
            </Dialog>
        </>
    );
}
