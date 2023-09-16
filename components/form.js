
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
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { TabView, TabPanel } from 'primereact/tabview';
import Formgroup from "./formgroup";
import { Calendar } from 'primereact/calendar';
import Header from "./header";
import { OLEVEL_GRADE, OLEVEL_SUBJECT, OLEVEL_TYPE } from '../pages/api/queries/applicant';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';


export default function GenericForm({
    tableObjectBody,
    dropDownObjects,
}) {
    const router = useRouter();
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
    const [OlevelGrade, { loading: OlevelGradeLoad, error: OlevelGradeError, data: OlevelGradeData }] = useLazyQuery(OLEVEL_GRADE);
    const [OlevelSubject, { loading: OlevelSubjectLoad, error: OlevelSubjectError, data: OlevelSubjectData }] = useLazyQuery(OLEVEL_SUBJECT);


    const dropdowns = async () => {
        const subjects = await OlevelSubject();
        setolevelSubjects(subjects?.data?.gellAllOLevelSubject);
        const grades = await OlevelGrade();
        setolevelGrades(grades?.data?.gellAllOLevelGrade);
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


    const RenderInputs = (field) => {



        if (field.input_type === "select") {
            // Render a dropdown component
            return (
                <div key={field.label} className="field">
                    <label htmlFor={field.label} className="font-bold">
                        {field.label}
                    </label>
                    <Dropdown
                        value={field?.response}
                        // onChange={(e) => onSaveValueChange(fieldName, e.value)}
                        options={field?.list}
                        // optionLabel="Name"
                        placeholder={"Select " + field.label}
                        className="w-full md:w-21.5rem"
                        id={field?.id}
                    />
                </div>
            );
        }
        else if (field.input_type === "text") {
            // Render a text input component
            return (
                <div key={field.label} className="field">
                    <label htmlFor={field.label} className="font-bold">
                        {field.label}
                    </label>
                    <InputText
                        id={field?.id}
                        value={field?.response}
                        className="w-full md:w-21.5rem"
                    //onChange={(e) => onSaveValueChange(fieldName, e.target.value)}
                    />
                </div>
            );
        }
        else if (field.input_type === "date") {
            // Render a text input component
            return (
                <div key={field.label} className="field">
                    <label htmlFor={field.label} className="font-bold">
                        {field.label}
                    </label>

                    <Calendar value={field?.response} showIcon className="w-full md:w-21.5rem" />
                </div>
            );
        }
        else if (field.input_type === "number") {
            // Render a text input component
            return (
                <div key={field.label} className="field">
                    <label htmlFor={field.label} className="font-bold">
                        {field.label}
                    </label>

                    <InputNumber inputId="integeronly" value={field?.response} className="w-full md:w-21.5rem" />
                </div>
            );
        }



    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };


    const onSaveValueChange = (fieldName, value) => {
        setProduct((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };



    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };





    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    console.log(data?.data, "dataa tatat ")


    const toSentenceCase = (inputString) => {
        if (typeof inputString !== "string") {
            throw new Error("Input must be a string");
        }
        return (
            inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
        );
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

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
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
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    return (
        <>
            <Header>
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
                                                    <li className="nav-item"><a className={`nav-link ${index0 === activeTabIndex ? 'active' : ''}`} href={`#solid-rounded-tab${index0 + 1}`} data-bs-toggle="tab"
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
                                                                                                    <input type="text" className="form-control" disabled readOnly />
                                                                                                </div>
                                                                                                <div className="form-group">
                                                                                                    <label>Olevel Type</label>
                                                                                                    <input type="text" className="form-control" disabled readOnly />
                                                                                                </div>
                                                                                                <div className="form-group">
                                                                                                    <label>Exam Year</label>
                                                                                                    <input type="email" className="form-control" disabled readOnly />
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
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>2</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>3</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>4</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>5</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>6</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>7</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>8</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>9</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
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
                                                                                                    <input type="text" className="form-control" disabled readOnly />
                                                                                                </div>
                                                                                                <div className="form-group">
                                                                                                    <label>Olevel Type</label>
                                                                                                    <input type="text" className="form-control" disabled readOnly />
                                                                                                </div>
                                                                                                <div className="form-group">
                                                                                                    <label>Exam Year</label>
                                                                                                    <input type="email" className="form-control" disabled readOnly />
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
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>2</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>3</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>4</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>5</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>6</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>7</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>8</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
                                                                                                                            options={olevelGrades}
                                                                                                                            optionLabel="name"
                                                                                                                            placeholder="Select Your Grade" className="w-full md:w-21.5rem" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>9</td>
                                                                                                                    <td>   <Dropdown
                                                                                                                        options={olevelSubjects}
                                                                                                                        optionLabel="name"
                                                                                                                        placeholder="Select Your Subject" className="w-full md:w-21.5rem" />
                                                                                                                    </td>

                                                                                                                    <td>
                                                                                                                        <Dropdown
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
                                                        {item?.pageName?.includes("Passport") ?
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <h5 className="form-title">
                                                                        <span>Upload Passport</span>
                                                                    </h5>
                                                                </div>
                                                                <>
                                                                    <div className="col-10">
                                                                        <Toast ref={toast}></Toast>

                                                                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                                                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                                                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                                                        <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                                                                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                                                    </div>
                                                                </>
                                                            </div>
                                                            : <></>}
                                                        {item?.pageName?.includes("O-level Result") || item?.pageName?.includes("Passport") ? <></> : item?.sections?.map((item2, index2) => (
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
                                                            <button  {...(nextactiveButton === false ? { disabled: 'disabled' } : {})}
                                                                className="btn btn-outline-primary me-2"
                                                                onClick={() => handleTabNavigation(activeTabIndex + 1)} // Navigate to the next tab
                                                            >
                                                                <i className="fas fa-chevron-circle-right"></i> Next
                                                            </button>
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
            </Header >
        </>
    );
}
