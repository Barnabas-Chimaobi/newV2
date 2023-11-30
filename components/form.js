"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
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
import { TabView, TabPanel } from "primereact/tabview";
import Formgroup from "./formgroup";
import { Calendar } from "primereact/calendar";
import Header from "./header";
import { SUBMIT_APPLICANT_FORM } from "../pages/api/mutations/applicantMutation";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import Spinner from "./spinner";
import { Constant } from "@/constant";

import { useRouter } from "next/router";

export default function GenericForm({
	data,
	olevelSubjectsData,
	olevelGradesData,
	isPreview,
	olevelTypes,
}) {
	console.log(data, "newdata=======sss====");
	const toasts = useRef(null);
	const router = useRouter();
	const [submittedResponse, setsubmittedResponse] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [isSaving, setisSaving] = useState(false);
	const [canSubmitForm, setcanSubmitForm] = useState(false);
	const [products, setProducts] = useState(null);
	const [productDialog, setProductDialog] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [content, setContent] = useState([]);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [nextactiveButton, setnextactiveButton] = useState(true);
	const [previousactiveButton, setpreviousactiveButton] = useState(false);
	const [totalIndex, settotalIndex] = useState(0);
	const [olevelSubjects, setolevelSubjects] = useState("");
	const [olevelGrades, setolevelGrades] = useState("");
	const [formpreview, setformpreview] = useState(false);
	const [formSubmit, { formSubmiterror, formSubmitloading, formSubmitdata }] =
		useMutation(SUBMIT_APPLICANT_FORM);

	const [olevelTypesList, setolevelTypesList] = useState("");
	const [yearsList, setyears] = useState("");
	const [pictureUrl, setPictureUrl] = useState("");

	const [firstexamNumber, setfirstexamNumber] = useState("");
	const [firstexamType, setfirstexamType] = useState("");
	const [firstexamYear, setfirstexamYear] = useState("");
	const [secondexamNumber, setsecondexamNumber] = useState("");
	const [secondexamType, setsecondexamType] = useState("");
	const [secondexamYear, setsecondexamYear] = useState("");

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

	const [fields, setFields] = useState([]);

	const dropdowns = async () => {
		const fieldDetails = [];
		console.log(data, "Dataaaaa tabkle");
		if (data?.applicantForm !== null) {
			const stateList = data?.applicantForm?.mainPages.flatMap((item, index) =>
				item?.sections?.flatMap((item2, index2) =>
					item2.fieldDetails.map((item3, index3) => {
						fieldDetails.push({
							id: item3.id,
							response: item3.response,
							required: item3.required,
						});
						return item3;
					})
				)
			);
			console.log(data?.applicantForm, "Picture   url....");
		}
		if (
			data?.applicantForm?.personUrl !== null &&
			data?.applicantForm?.personUrl !== "" &&
			data?.applicantForm?.personUrl !== "undefined"
		) {
			setPictureUrl(data?.applicantForm?.personUrl);
		}
		console.log(
			data?.applicantForm?.submitOlevelResult,
			"First sitting results"
		);
		if (data?.applicantForm?.submitOlevelResult?.length > 0) {
			var firstSitting = data?.applicantForm?.submitOlevelResult[0];

			if (
				firstSitting !== null &&
				firstSitting !== "" &&
				firstSitting !== "undefined"
			) {
				setfirstexamNumber(firstSitting?.examNumber);
				setfirstexamYear(firstSitting?.examYear);
				setfirstexamType(firstSitting?.olevelType);
				setfirstGrade1({ name: firstSitting?.olevelResultsDto[0]?.grade });
				setfirstSub1({ name: firstSitting?.olevelResultsDto[0]?.subject });
				setfirstGrade2({ name: firstSitting?.olevelResultsDto[1]?.grade });
				setfirstSub2({ name: firstSitting?.olevelResultsDto[1]?.subject });
				setfirstGrade3({ name: firstSitting?.olevelResultsDto[2]?.grade });
				setfirstSub3({ name: firstSitting?.olevelResultsDto[2]?.subject });
				setfirstGrade4({ name: firstSitting?.olevelResultsDto[3]?.grade });
				setfirstSub4({ name: firstSitting?.olevelResultsDto[3]?.subject });
				setfirstGrade5({ name: firstSitting?.olevelResultsDto[4]?.grade });
				setfirstSub5({ name: firstSitting?.olevelResultsDto[4]?.subject });
				setfirstGrade6({ name: firstSitting?.olevelResultsDto[5]?.grade });
				setfirstSub6({ name: firstSitting?.olevelResultsDto[5]?.subject });
				setfirstGrade7({ name: firstSitting?.olevelResultsDto[6]?.grade });
				setfirstSub7({ name: firstSitting?.olevelResultsDto[6]?.subject });
				setfirstGrade8({ name: firstSitting?.olevelResultsDto[7]?.grade });
				setfirstSub8({ name: firstSitting?.olevelResultsDto[7]?.subject });
				setfirstGrade9({ name: firstSitting?.olevelResultsDto[8]?.grade });
				setfirstSub9({ name: firstSitting?.olevelResultsDto[8]?.subject });
			}
			if (data?.applicantForm?.submitOlevelResult?.length > 1) {
				var secondSitting = data?.applicantForm?.submitOlevelResult[1];
				if (
					secondSitting !== null &&
					secondSitting !== "" &&
					secondSitting !== "undefined"
				) {
					setsecondexamNumber(secondSitting?.examNumber);
					setsecondexamYear(secondSitting?.examYear);
					setsecondexamType(secondSitting?.olevelType);
					setsecondGrade1({ name: secondSitting?.olevelResultsDto[0]?.grade });
					setsecondSub1({ name: secondSitting?.olevelResultsDto[0]?.subject });
					setsecondGrade2({ name: secondSitting?.olevelResultsDto[1]?.grade });
					setsecondSub2({ name: secondSitting?.olevelResultsDto[1]?.subject });
					setsecondGrade3({ name: secondSitting?.olevelResultsDto[2]?.grade });
					setsecondSub3({ name: secondSitting?.olevelResultsDto[2]?.subject });
					setsecondGrade4({ name: secondSitting?.olevelResultsDto[3]?.grade });
					setsecondSub4({ name: secondSitting?.olevelResultsDto[3]?.subject });
					setsecondGrade5({ name: secondSitting?.olevelResultsDto[4]?.grade });
					setsecondSub5({ name: secondSitting?.olevelResultsDto[4]?.subject });
					setsecondGrade6({ name: secondSitting?.olevelResultsDto[5]?.grade });
					setsecondSub6({ name: secondSitting?.olevelResultsDto[5]?.subject });
					setsecondGrade7({ name: secondSitting?.olevelResultsDto[6]?.grade });
					setsecondSub7({ name: secondSitting?.olevelResultsDto[6]?.subject });
					setsecondGrade8({ name: secondSitting?.olevelResultsDto[7]?.grade });
					setsecondSub8({ name: secondSitting?.olevelResultsDto[7]?.subject });
					setsecondGrade9({ name: secondSitting?.olevelResultsDto[8]?.grade });
					setsecondSub9({ name: secondSitting?.olevelResultsDto[8]?.subject });
				}
			}
		}

		setFields(fieldDetails);
		console.log(fieldDetails, "Flat LIST");
		setolevelSubjects(olevelSubjectsData);
		setolevelGrades(olevelGradesData);
		setisLoading(false);
		console.log(olevelTypes, "Olevele tyoess");
		setolevelTypesList(olevelTypes);
		GetYears();
	};

	const stateValuesSub1 = [
		firstSub1,
		firstSub2,
		firstSub3,
		firstSub4,
		firstSub5,
		firstSub6,
		firstSub7,
		firstSub8,
		firstSub9,
	];

	const stateValuesSub2 = [
		secondSub1,
		secondSub2,
		secondSub3,
		secondSub4,
		secondSub5,
		secondSub6,
		secondSub7,
		secondSub8,
		secondSub9,
	];
	const stateValuesGrade1 = [
		firstGrade1,
		firstGrade2,
		firstGrade3,
		firstGrade4,
		firstGrade5,
		firstGrade6,
		firstGrade7,
		firstGrade8,
		firstGrade9,
	];
	const stateValuesGrade2 = [
		secondGrade1,
		secondGrade2,
		secondGrade3,
		secondGrade4,
		secondGrade5,
		secondGrade6,
		secondGrade7,
		secondGrade8,
		secondGrade9,
	];

	const checkBeforeSubmit = (targetTabIndex) => {
		console.log(stateValuesSub1, stateValuesSub2);
		var valueArr = stateValuesSub1?.map(function (item) {
			return item.name;
		});
		// empty subject first
		var isEmptySubject1 = valueArr?.some(function (item, idx) {
			return item == undefined || item === "";
		});
		// duplicate subject first
		var isDuplicate = valueArr?.some(function (item, idx) {
			return valueArr?.indexOf(item) != idx;
		});
		console.log(isDuplicate, isEmptyString, "itemmmsss====");

		var valueGrade = stateValuesGrade1?.map(function (item) {
			return item.name;
		});
		// empty grade 1
		var isEmptyString = valueGrade?.some(function (item, idx) {
			return item == undefined || item === "";
		});

		console.log(isEmptyString, "itemmmsss====grade===1111");

		var valueArrSecond = stateValuesSub2?.map(function (item) {
			return item.name;
		});
		// empty subject second
		var isEmptySubjectSecond = valueArrSecond?.some(function (item, idx) {
			return item == undefined || item == null;
		});

		//duplicate subject second
		var isDuplicateSecond = valueArrSecond.some(function (item, idx) {
			return valueArrSecond.indexOf(item) != idx;
		});

		var valueGradeSecond = stateValuesGrade2?.map(function (item) {
			return item.name;
		});
		//empty grade 2
		var isEmptyStringSecond = valueGradeSecond?.some(function (item, idx) {
			return item == undefined || item == null;
		});

		// first sitting check
		let checkFirstSittingSelected = firstexamNumber?.length !== 0;
		let secondSittingSelected = secondexamNumber !== null;
		console.log(
			checkFirstSittingSelected,
			isEmptySubject1,
			secondSittingSelected,
			firstexamNumber,
			secondexamNumber,
			"hgfdsdfghjkssss====lectt===ed"
		);
		if (checkFirstSittingSelected && isEmptySubject1) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "Please ensure you have selected all 9  subjects",
			});
		} else if (
			checkFirstSittingSelected &&
			valueArr?.length !== 0 &&
			isDuplicate
		) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "You selected a Subjects more than once in a sitting",
			});
		} else if (
			checkFirstSittingSelected &&
			valueArr?.length !== 0 &&
			isEmptyString
		) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "Please ensure you choose grade for all selected subjects",
			});
		} else if (secondSittingSelected && isEmptySubjectSecond) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "Please ensure you have selected all 9  subjects",
			});
		} else if (
			secondSittingSelected &&
			valueArrSecond?.length !== 0 &&
			isDuplicateSecond
		) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "You selected a Subjects more than once in a sitting",
			});
		} else if (
			secondSittingSelected &&
			valueArrSecond?.length !== 0 &&
			isEmptyStringSecond
		) {
			console.log("hererrrrr===2222222");
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "Please ensure you choose grade for all selected subjects",
			});
		} else if (
			!checkFirstSittingSelected &&
			isEmptySubject1 &&
			!secondSittingSelected &&
			isEmptySubjectSecond
		) {
			toasts.current.show({
				severity: "info",
				summary: "Info",
				detail: "Please provide your O-Level details",
			});
		} else {
			console.log("jhgfdsfghjklkjhgfdghjk======");
			// if (isPreview === false) {
			setisSaving(true);
			setTimeout(async () => {
				try {
					var formsDto = fields.map((item) => {
						return {
							feildId: item.id,
							response: item.response,
						};
					});
					const formsApplicant = await formSubmit({
						variables: {
							model: {
								personId: data?.applicantForm?.personId,
								formDetails: formsDto,
								submitOlevelResult: [
									submitFirstOlevelResult,
									submitSecondOlevelResult,
								],
								pictureUrl: pictureUrl,
								canSubmit: canSubmitForm,
							},
						},
					});

					setsubmittedResponse(
						formsApplicant?.data?.submitApplicationFormNewDto?.id
					);
					if (sub === 1) {
						router.push(
							Constant.BASE_URL +
								`/common/acknowledgementslip/` +
								formsApplicant?.data?.submitApplicationFormNewDto?.id
						);
					}
					console.log(submittedResponse, "submitted response ....");
					setisSaving(false);
				} catch (err) {
					console.log(submittedResponse, "error==== response ....");
					setisSaving(false);
				}

				if (
					targetTabIndex >= 0 &&
					targetTabIndex < data?.applicantForm?.mainPages.length
				) {
					setActiveTabIndex(targetTabIndex);
					if (targetTabIndex == 0) {
						setpreviousactiveButton(false);
					} else {
						setpreviousactiveButton(true);
					}
					if (targetTabIndex == data?.applicantForm?.mainPages?.length - 1) {
						setnextactiveButton(false);
					} else {
						setnextactiveButton(true);
					}
				} else {
					if (targetTabIndex < 0) {
						setpreviousactiveButton(false);
					} else {
						setnextactiveButton(false);
					}
				}
			}, 3000);
			// }
		}
	};

	useEffect(() => {
		dropdowns();
	}, []);

	const GetYears = () => {
		// Get the current year
		const currentYear = new Date().getFullYear();

		// Create an array to store the years
		const years = [];

		// Generate years from 1999 to the current year
		for (let year = 1999; year <= currentYear; year++) {
			years.push(year);
		}
		console.log(years);
		console.log(olevelTypesList);
		setyears(years);
	};

	const submitFirstOlevelResult = {
		centerName: "",
		examCode: "",
		examNumber:
			firstexamNumber !== "" ||
			firstexamNumber !== "undefined" ||
			firstexamNumber !== ""
				? firstexamNumber
				: "",
		examYear: firstexamYear !== "" ? parseInt(firstexamYear) : null,
		olevelResultsDto: [
			{
				grade:
					firstGrade1 !== "" && firstGrade1 !== "undefined"
						? firstGrade1?.name
						: "",
				subject:
					firstSub1 !== "" && firstSub1 !== "undefined" ? firstSub1?.name : "",
			},
			{
				grade: firstGrade2 !== "" ? firstGrade2?.name : "",
				subject: firstSub2 !== "" ? firstSub2?.name : "",
			},
			{
				grade: firstGrade3 !== "" ? firstGrade3?.name : "",
				subject: firstSub3 !== "" ? firstSub3?.name : "",
			},
			{
				grade: firstGrade4 !== "" ? firstGrade4?.name : "",
				subject: firstSub4 !== "" ? firstSub4?.name : "",
			},
			{
				grade: firstGrade5 !== "" ? firstGrade5?.name : "",
				subject: firstSub5 !== "" ? firstSub5?.name : "",
			},
			{
				grade: firstGrade6 !== "" ? firstGrade6?.name : "",
				subject: firstSub6 !== "" ? firstSub6?.name : "",
			},
			{
				grade: firstGrade7 !== "" ? firstGrade7?.name : "",
				subject: firstSub7 !== "" ? firstSub7?.name : "",
			},
			{
				grade: firstGrade8 !== "" ? firstGrade8?.name : "",
				subject: firstSub8 !== "" ? firstSub8?.name : "",
			},
			{
				grade: firstGrade9 !== "" ? firstGrade9?.name : "",
				subject: firstSub9 !== "" ? firstSub9?.name : "",
			},
		],
		olevelType: firstexamType !== "" ? firstexamType : "",
		sitting: 1,
	};

	const submitSecondOlevelResult = {
		centerName: null,
		examCode: null,
		examNumber: secondexamNumber !== "" ? secondexamNumber : null,
		examYear: secondexamYear !== "" ? parseInt(secondexamYear) : null,
		olevelResultsDto: [
			{
				grade: secondGrade1 !== "" ? secondGrade1?.name : null,
				subject: secondSub1 !== "" ? secondSub1?.name : null,
			},
			{
				grade: secondGrade2 !== "" ? secondGrade2?.name : null,
				subject: secondSub2 !== "" ? secondSub2?.name : null,
			},
			{
				grade: secondGrade3 !== "" ? secondGrade3?.name : null,
				subject: secondSub3 !== "" ? secondSub3?.name : null,
			},
			{
				grade: secondGrade4 !== "" ? secondGrade4?.name : null,
				subject: secondSub4 !== "" ? secondSub4?.name : null,
			},
			{
				grade: secondGrade5 !== "" ? secondGrade5?.name : null,
				subject: secondSub5 !== "" ? secondSub5?.name : null,
			},
			{
				grade: secondGrade6 !== "" ? secondGrade6?.name : null,
				subject: secondSub6 !== "" ? secondSub6?.name : null,
			},
			{
				grade: secondGrade7 !== "" ? secondGrade7?.name : null,
				subject: secondSub7 !== "" ? secondSub7?.name : null,
			},
			{
				grade: secondGrade8 !== "" ? secondGrade8?.name : null,
				subject: secondSub8 !== "" ? secondSub8?.name : null,
			},
			{
				grade: secondGrade9 !== "" ? secondGrade9?.name : null,
				subject: secondSub9 !== "" ? secondSub9?.name : null,
			},
		],
		olevelType: secondexamType !== "" ? secondexamType : null,
		sitting: 2,
	};

	const handleChange = (id, value) => {
		const updatedFields = fields.map((field) =>
			field.id === id ? { ...field, response: value } : field
		);
		setFields(updatedFields);
	};
	//console.log(fields, "feild valuesssss")
	const RenderInputs = (field) => {
		console.log(field, "field=========");
		var selectedField = fields.find((fieldxx) => fieldxx.id === field.id);

		if (field.input_type === "select") {
			return (
				<div key={field.id} className="field">
					<label className="font-bold">
						{field.label}{" "}
						{field.required === "true" ? (
							<span className="login-danger">*</span>
						) : (
							<></>
						)}
					</label>

					<select
						class="form-control select"
						value={selectedField?.response}
						disabled={field?.isReadonly}
						onChange={(e) => handleChange(field.id, e.target.value)}
						name={field.id}>
						<option>Select {field.label}</option>
						{field?.list?.map((x) => (
							<option>{x}</option>
						))}
					</select>
				</div>
			);
		} else {
			return (
				<div key={field.id} className="field">
					<label className="font-bold">
						{field.label}{" "}
						{field.required === "true" ? (
							<span className="login-danger">*</span>
						) : (
							<></>
						)}
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
					<label className="font-bold">{field.label}</label>

					<select
						class="form-control select"
						value={selectedField?.response}
						disabled={true}
						onChange={(e) => handleChange(field.id, e.target.value)}
						name={field.id}>
						<option>Select {field.label}</option>
						{field?.list?.map((x) => (
							<option>{x}</option>
						))}
					</select>
				</div>
			);
		} else {
			return (
				<div key={field.id} className="field">
					<label className="font-bold">{field.label}</label>

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
		console.log(targetTabIndex, "tab====index=====");
		saveAndContinue();
		// console.log(data?.applicantForm?.mainPages.length, "index lemgth")
		if (
			targetTabIndex >= 0 &&
			targetTabIndex < data?.applicantForm?.mainPages.length
		) {
			setActiveTabIndex(targetTabIndex);
			if (targetTabIndex == 0) {
				setpreviousactiveButton(false);
			} else {
				setpreviousactiveButton(true);
			}
			if (targetTabIndex == data?.applicantForm?.mainPages?.length - 1) {
				setnextactiveButton(false);
			} else {
				setnextactiveButton(true);
			}
		} else {
			if (targetTabIndex < 0) {
				setpreviousactiveButton(false);
			} else {
				setnextactiveButton(false);
			}
		}
	};

	const toast = useRef(null);
	const [totalSize, setTotalSize] = useState(0);
	const fileUploadRef = useRef(null);

	const onTemplateSelect = (e) => {
		// console.log("kjhgfdsadfghjkl;========");
		let _totalSize = totalSize;
		let files = e.files;

		Object.keys(files).forEach((key) => {
			_totalSize += files[key].size || 0;
		});

		setTotalSize(_totalSize);
		onTemplateUpload(e);
	};

	const onTemplateUpload = async (e) => {
		console.log("Actual upload");
		let _totalSize = 0;

		e.files.forEach((file) => {
			_totalSize += file.size || 0;
		});

		setTotalSize(_totalSize);
		console.log(e, "file now......");
		const formData = new FormData();

		// Append each selected file to the FormData object
		e.files.forEach((file) => {
			formData.append("file", file, file.name);
		});

		// Make an HTTP POST request to the API endpoint
		const response = await fetch(`${Constant?.BACK_END_URL}/api/Passport`, {
			method: "POST",
			body: formData,
		});
		let data = await response.text();
		console.log(data, "passport images");
		setPictureUrl(data);
		if (response.ok) {
			// toast.current.show({
			// 	severity: "info",
			// 	summary: "Success",
			// 	detail: "File Uploaded",
			// });
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
		const formatedValue =
			fileUploadRef && fileUploadRef.current
				? fileUploadRef.current.formatSize(totalSize)
				: "0 B";

		return (
			<div
				className={className}
				style={{
					backgroundColor: "transparent",
					display: "flex",
					alignItems: "center",
				}}>
				{chooseButton}
				{uploadButton}
				{cancelButton}
				<div className="flex align-items-center gap-3 ml-auto">
					<span>{formatedValue} / 1 MB</span>
					<ProgressBar
						value={value}
						showValue={false}
						style={{ width: "10rem", height: "12px" }}></ProgressBar>
				</div>
			</div>
		);
	};

	const previewheaderTemplate = (options) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;
		const value = totalSize / 10000;
		const formatedValue =
			fileUploadRef && fileUploadRef.current
				? fileUploadRef.current.formatSize(totalSize)
				: "0 B";

		return (
			<div
				className={className}
				style={{
					backgroundColor: "transparent",
					display: "flex",
					alignItems: "center",
				}}>
				<div className="flex align-items-center gap-3 ml-auto">
					<span>{formatedValue} / 1 MB</span>
					<ProgressBar
						value={value}
						showValue={false}
						style={{ width: "10rem", height: "12px" }}></ProgressBar>
				</div>
			</div>
		);
	};

	const itemTemplate = (file, props) => {
		return (
			<div className="flex align-items-center flex-wrap">
				<div className="flex align-items-center" style={{ width: "40%" }}>
					<img
						alt={file.name}
						role="presentation"
						src={file.objectURL}
						width={100}
					/>
					<span className="flex flex-column text-left ml-3">
						{file.name}
						<small>{new Date().toLocaleDateString()}</small>
					</span>
				</div>
				<Tag
					value={props.formatSize}
					severity="warning"
					className="px-3 py-2"
				/>
				<Button
					type="button"
					icon="pi pi-times"
					className="p-button-outlined p-button-rounded p-button-danger ml-auto"
					onClick={() => onTemplateRemove(file, props.onRemove)}
				/>
			</div>
		);
	};

	const emptyTemplate = () => {
		return (
			<div className="flex align-items-center flex-column">
				{pictureUrl === null ||
				pictureUrl === "" ||
				pictureUrl === "undefined" ? (
					<>
						<i
							className="pi pi-image mt-3 p-5"
							style={{
								fontSize: "5em",
								borderRadius: "50%",
								backgroundColor: "var(--surface-b)",
								color: "var(--surface-d)",
							}}></i>
						<span
							style={{
								fontSize: "1.2em",
								color: "var(--text-color-secondary)",
							}}
							className="my-5">
							Drag and Drop Image Here
						</span>
					</>
				) : (
					<img
						alt="Pictures"
						role="presentation"
						src={`${Constant?.BACK_END_URL}/${pictureUrl}`}
						width={200}
					/>
				)}
			</div>
		);
	};

	const chooseOptions = {
		icon: "pi pi-fw pi-images",
		iconOnly: true,
		className: "custom-choose-btn p-button-rounded p-button-outlined",
	};
	const uploadOptions = {
		icon: "pi pi-fw pi-cloud-upload",
		iconOnly: true,
		className:
			"custom-upload-btn p-button-success p-button-rounded p-button-outlined",
	};
	const cancelOptions = {
		icon: "pi pi-fw pi-times",
		iconOnly: true,
		className:
			"custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
	};

	const NullChecker = () => {
		var check = 1;
		var formsDto = fields.map((item) => {
			if (
				(item.response === null || item.response === "") &&
				item?.required == true
			) {
				setVisible(true);
				check = 0;
			}
		});
		if (pictureUrl === null || pictureUrl === "") {
			check = 0;
		}
		if (
			submitFirstOlevelResult?.examNumber === null ||
			submitFirstOlevelResult?.examNumber === ""
		) {
			check = 0;
		}
		var setsubmitvalue = check == 1 ? true : false;
		setcanSubmitForm(setsubmitvalue);
		console.log(check, "check======");
		return check;
	};

	const submitForm = async () => {
		setisSaving(true);
		saveAndContinue(0);
		var checkNull = NullChecker();
		console.log(checkNull, "null check");
		if (checkNull === 1) {
			setformpreview(true);
		}
	};

	const submitAfterPreview = async () => {
		var checkNull = NullChecker();

		if (checkNull === 1) {
			await saveAndContinue(1);
		}
	};

	const saveAndContinue = async (sub) => {
		if (isPreview === false) {
			setisSaving(true);
			setTimeout(async () => {
				try {
					var formsDto = fields.map((item) => {
						return {
							feildId: item.id,
							response: item.response,
						};
					});
					const formsApplicant = await formSubmit({
						variables: {
							model: {
								personId: data?.applicantForm?.personId,
								formDetails: formsDto,
								submitOlevelResult: [
									submitFirstOlevelResult,
									submitSecondOlevelResult,
								],
								pictureUrl: pictureUrl,
								canSubmit: canSubmitForm,
							},
						},
					});
					console.log(
						{
							personId: data?.applicantForm?.personId,
							formDetails: formsDto,
							submitOlevelResult: [
								submitFirstOlevelResult,
								submitSecondOlevelResult,
							],
							pictureUrl: pictureUrl,
							canSubmit: canSubmitForm,
						},
						"data========"
					);
					setsubmittedResponse(
						formsApplicant?.data?.submitApplicationFormNewDto?.id
					);
					if (sub === 1) {
						router.push(
							Constant.BASE_URL +
								`/common/acknowledgementslip/` +
								formsApplicant?.data?.submitApplicationFormNewDto?.id
						);
					}
					console.log(submittedResponse, "submitted response ....");
					setisSaving(false);
				} catch (err) {
					setisSaving(false);
				}
			}, 3000);
		}
	};

	return (
		<>
			<Header>
				<Toast ref={toasts} />
				{isLoading ? (
					<Spinner />
				) : (
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
												{data?.applicantForm?.mainPages.map((item0, index0) => (
													<>
														<li className="nav-item">
															<a
																className={`nav-link ${
																	index0 === activeTabIndex ? "active" : ""
																}`}
																href={`#solid-rounded-tab${index0 + 1}`}
																data-bs-toggle="tab"
																onClick={() => handleTabNavigation(index0)}>
																{item0.pageName}
															</a>
														</li>
													</>
												))}
											</ul>
											<div className="tab-content">
												{data?.applicantForm?.mainPages.map((item, index) => (
													<>
														<div
															key={index}
															className={`tab-pane ${
																index === activeTabIndex ? "show active" : ""
															}`}
															id={`solid-rounded-tab${index + 1}`}>
															{item?.pageName?.includes("O-level Result") ? (
																<div className="row">
																	<div className="col-sm-12">
																		<div className="card">
																			<div className="card-body">
																				<div className="row">
																					<div className="col-md-6">
																						<div className="card">
																							<div className="card-header">
																								<h5 className="card-title">
																									First Sitting Olevel Details
																								</h5>
																							</div>
																							<div className="card-body">
																								<form action="#">
																									<div className="form-group">
																										<label>Exam Number</label>
																										<input
																											value={firstexamNumber}
																											type="text"
																											className="form-control"
																											onChange={(e) =>
																												setfirstexamNumber(
																													e.target.value
																												)
																											}
																										/>
																									</div>
																									<div className="form-group">
																										<label>Olevel Type</label>
																										<Dropdown
																											value={firstexamType}
																											onChange={(e) =>
																												setfirstexamType(
																													e.value
																												)
																											}
																											options={olevelTypesList}
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																										/>
																									</div>
																									<div className="form-group">
																										<label>Exam Year</label>
																										<Dropdown
																											value={firstexamYear}
																											onChange={(e) =>
																												setfirstexamYear(
																													e.value
																												)
																											}
																											options={yearsList}
																											placeholder="Select Year"
																											className="w-full md:w-21.5rem"
																										/>
																									</div>

																									{olevelSubjects === null &&
																									olevelGrades === null ? (
																										<></>
																									) : (
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
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub1
																																}
																																onChange={(e) =>
																																	setfirstSub1(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade1
																																}
																																onChange={(e) =>
																																	setfirstGrade1(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>2</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub2
																																}
																																onChange={(e) =>
																																	setfirstSub2(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade2
																																}
																																onChange={(e) =>
																																	setfirstGrade2(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>3</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub3
																																}
																																onChange={(e) =>
																																	setfirstSub3(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade3
																																}
																																onChange={(e) =>
																																	setfirstGrade3(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>4</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub4
																																}
																																onChange={(e) =>
																																	setfirstSub4(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade4
																																}
																																onChange={(e) =>
																																	setfirstGrade4(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>5</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub5
																																}
																																onChange={(e) =>
																																	setfirstSub5(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade5
																																}
																																onChange={(e) =>
																																	setfirstGrade5(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>6</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub6
																																}
																																onChange={(e) =>
																																	setfirstSub6(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade6
																																}
																																onChange={(e) =>
																																	setfirstGrade6(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>7</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub7
																																}
																																onChange={(e) =>
																																	setfirstSub7(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade7
																																}
																																onChange={(e) =>
																																	setfirstGrade7(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>8</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub8
																																}
																																onChange={(e) =>
																																	setfirstSub8(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade8
																																}
																																onChange={(e) =>
																																	setfirstGrade8(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>9</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	firstSub9
																																}
																																onChange={(e) =>
																																	setfirstSub9(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	firstGrade9
																																}
																																onChange={(e) =>
																																	setfirstGrade9(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																												</tbody>
																											</table>
																										</div>
																									)}
																								</form>
																							</div>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="card">
																							<div className="card-header">
																								<h5 className="card-title">
																									Second Sitting Olevel Details
																								</h5>
																							</div>
																							<div className="card-body">
																								<form action="#">
																									<div className="form-group">
																										<label>Exam Number</label>
																										<input
																											value={secondexamNumber}
																											type="text"
																											className="form-control"
																											onChange={(e) =>
																												setsecondexamNumber(
																													e.target.value
																												)
																											}
																											y
																										/>
																									</div>
																									<div className="form-group">
																										<label>Olevel Type</label>
																										<Dropdown
																											value={secondexamType}
																											onChange={(e) =>
																												setsecondexamType(
																													e.value
																												)
																											}
																											options={olevelTypesList}
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																										/>
																									</div>
																									<div className="form-group">
																										<label>Exam Year</label>
																										<Dropdown
																											value={secondexamYear}
																											onChange={(e) =>
																												setsecondexamYear(
																													e.value
																												)
																											}
																											options={yearsList}
																											placeholder="Select Year"
																											className="w-full md:w-21.5rem"
																										/>
																									</div>
																									{olevelSubjects === null &&
																									olevelGrades === null ? (
																										<></>
																									) : (
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
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub1
																																}
																																onChange={(e) =>
																																	setsecondSub1(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade1
																																}
																																onChange={(e) =>
																																	setsecondGrade1(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>2</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub2
																																}
																																onChange={(e) =>
																																	setsecondSub2(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade2
																																}
																																onChange={(e) =>
																																	setsecondGrade2(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>3</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub3
																																}
																																onChange={(e) =>
																																	setsecondSub3(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade3
																																}
																																onChange={(e) =>
																																	setsecondGrade3(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>4</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub4
																																}
																																onChange={(e) =>
																																	setsecondSub4(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade4
																																}
																																onChange={(e) =>
																																	setsecondGrade4(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>5</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub5
																																}
																																onChange={(e) =>
																																	setsecondSub5(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade5
																																}
																																onChange={(e) =>
																																	setsecondGrade5(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>6</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub6
																																}
																																onChange={(e) =>
																																	setsecondSub6(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade6
																																}
																																onChange={(e) =>
																																	setsecondGrade6(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>7</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub7
																																}
																																onChange={(e) =>
																																	setsecondSub7(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade7
																																}
																																onChange={(e) =>
																																	setsecondGrade7(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>8</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub8
																																}
																																onChange={(e) =>
																																	setsecondSub8(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade8
																																}
																																onChange={(e) =>
																																	setsecondGrade8(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																													<tr>
																														<td>9</td>
																														<td>
																															{" "}
																															<Dropdown
																																value={
																																	secondSub9
																																}
																																onChange={(e) =>
																																	setsecondSub9(
																																		e.value
																																	)
																																}
																																options={
																																	olevelSubjects
																																}
																																optionLabel="name"
																																placeholder="Select Your Subject"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>

																														<td>
																															<Dropdown
																																value={
																																	secondGrade9
																																}
																																onChange={(e) =>
																																	setsecondGrade9(
																																		e.value
																																	)
																																}
																																options={
																																	olevelGrades
																																}
																																optionLabel="name"
																																placeholder="Select Your Grade"
																																className="w-full md:w-21.5rem"
																															/>
																														</td>
																													</tr>
																												</tbody>
																											</table>
																										</div>
																									)}
																								</form>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															) : (
																<></>
															)}
															{item?.pageName?.includes("Passport") ? (
																<>
																	<div className="col-12">
																		<h5 className="form-title">
																			<span>Upload Passport</span>
																		</h5>
																	</div>
																	<div className=" row col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">
																		<div className="col-10">
																			<Toast ref={toast}></Toast>

																			<Tooltip
																				target=".custom-choose-btn"
																				content="Choose"
																				position="bottom"
																			/>
																			<Tooltip
																				target=".custom-upload-btn"
																				content="Upload"
																				position="bottom"
																			/>
																			<Tooltip
																				target=".custom-cancel-btn"
																				content="Clear"
																				position="bottom"
																			/>

																			<FileUpload
																				ref={fileUploadRef}
																				name="file"
																				url={
																					Constant?.BACK_END_URL +
																					"/api/Passport"
																				}
																				multiple
																				accept="image/*"
																				maxFileSize={1000000}
																				onUpload={onTemplateUpload}
																				onSelect={onTemplateSelect}
																				onError={onTemplateClear}
																				onClear={onTemplateClear}
																				headerTemplate={headerTemplate}
																				itemTemplate={itemTemplate}
																				emptyTemplate={emptyTemplate}
																				chooseOptions={chooseOptions}
																				uploadOptions={uploadOptions}
																				cancelOptions={cancelOptions}
																			/>
																		</div>
																	</div>
																</>
															) : (
																<></>
															)}
															{item?.pageName?.includes("O-level Result") ||
															item?.pageName?.includes("Passport") ? (
																<></>
															) : (
																item?.sections?.map(
																	(item2, index2) =>
																		index2 == activeTabIndex && (
																			// console.log(item2, "hgfghjkhgjk====="),
																			<div className="row">
																				<div className="col-12">
																					<h5 className="form-title">
																						<span>{item2?.sectionName}</span>
																					</h5>
																				</div>
																				<>
																					{item2.fieldDetails.map(
																						(item3, index3) => (
																							<>
																								<div
																									className="col-lg-4 col-sm-12"
																									key={index3}>
																									<div className="form-group local-forms">
																										{RenderInputs(item3)}
																									</div>
																								</div>
																							</>
																						)
																					)}
																				</>
																			</div>
																		)
																)
															)}

															<div className="col-auto text-end float-end ms-auto download-grp">
																{nextactiveButton === false ? (
																	<button
																		className="btn btn-outline-primary me-2"
																		onClick={() => submitForm()} // Navigate to the previous tab
																	>
																		<i className="fas fa-paper-plane"></i>{" "}
																		Submit
																	</button>
																) : (
																	<button
																		{...(nextactiveButton === false
																			? { disabled: "disabled" }
																			: {})}
																		className="btn btn-outline-primary me-2"
																		onClick={() => {
																			item?.pageName?.includes("page3(O-Level)")
																				? checkBeforeSubmit(activeTabIndex + 1)
																				: handleTabNavigation(
																						activeTabIndex + 1
																				  );
																		}} // Navigate to the next tab
																	>
																		Next{" "}
																		<i className="fas fa-chevron-circle-right"></i>
																	</button>
																)}
															</div>
															<div className="col-auto text-end float-end ms-auto download-grp">
																<button
																	{...(previousactiveButton === false
																		? { disabled: "disabled" }
																		: {})}
																	className="btn btn-outline-primary me-2"
																	onClick={() =>
																		handleTabNavigation(activeTabIndex - 1)
																	} // Navigate to the previous tab
																>
																	<i className="fas fa-chevron-circle-left"></i>{" "}
																	Previous
																</button>
															</div>
															{isSaving ? (
																<i
																	className="pi pi-spin pi-sync"
																	style={{ fontSize: "1rem" }}></i>
															) : (
																<></>
															)}
														</div>
													</>
												))}
											</div>
										</div>{" "}
									</div>{" "}
								</div>{" "}
							</div>{" "}
						</div>
					</div>
				)}
			</Header>
			<Dialog
				header="Form Submission Error"
				visible={visible}
				maximizable
				style={{ width: "50vw" }}
				onHide={() => setVisible(false)}>
				<p className="m-0">
					We apologize, but your form cannot be submitted at this time because
					some parts of the form have not been filled out completely. Please
					review the form and complete all required fields.
				</p>
				<p className="m-0">
					If you encounter any difficulties or have questions regarding specific
					sections of the form, please don't hesitate to reach out to our
					support team at support@lloydant.com/07088391544 or 090838920222.
				</p>
			</Dialog>
			<Dialog
				header="Preview"
				visible={formpreview}
				maximizable
				style={{ width: "50vw" }}
				onHide={() => setformpreview(false)}>
				<div>
					{data?.applicantForm?.mainPages.map(
						(item, index) => (
							console.log(item, "item========="),
							(
								<>
									<div key={index}>
										{item?.pageName?.includes("O-level Result") ? (
											<div className="row">
												<div className="col-sm-12">
													<div className="">
														<div className="card-header">
															<h5 className="card-title">
																Preview Olevel Details
															</h5>
														</div>
														<div className="card-body">
															<div className="row">
																<div className="col-md-6">
																	<div className="card">
																		<div className="card-header">
																			<h5 className="card-title">
																				First Sitting Olevel Details
																			</h5>
																		</div>
																		<div className="card-body">
																			<form action="#">
																				<div className="form-group">
																					<label>Exam Number</label>
																					<input
																						value={firstexamNumber}
																						type="text"
																						className="form-control"
																						onChange={(e) =>
																							setfirstexamNumber(e.target.value)
																						}
																						disabled
																					/>
																				</div>
																				<div className="form-group">
																					<label>Olevel Type</label>
																					<Dropdown
																						value={firstexamType}
																						onChange={(e) =>
																							setfirstexamType(e.value)
																						}
																						options={olevelTypesList}
																						placeholder="Select Your Subject"
																						className="w-full md:w-21.5rem"
																						disabled
																					/>
																				</div>
																				<div className="form-group">
																					<label>Exam Year</label>
																					<Dropdown
																						value={firstexamYear}
																						onChange={(e) =>
																							setfirstexamYear(e.value)
																						}
																						options={yearsList}
																						placeholder="Select Year"
																						className="w-full md:w-21.5rem"
																						disabled
																					/>
																				</div>

																				{olevelSubjects === null &&
																				olevelGrades === null ? (
																					<></>
																				) : (
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
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub1}
																											onChange={(e) =>
																												setfirstSub1(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade1}
																											onChange={(e) =>
																												setfirstGrade1(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>2</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub2}
																											onChange={(e) =>
																												setfirstSub2(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade2}
																											onChange={(e) =>
																												setfirstGrade2(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>3</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub3}
																											onChange={(e) =>
																												setfirstSub3(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade3}
																											onChange={(e) =>
																												setfirstGrade3(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>4</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub4}
																											onChange={(e) =>
																												setfirstSub4(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade4}
																											onChange={(e) =>
																												setfirstGrade4(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>5</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub5}
																											onChange={(e) =>
																												setfirstSub5(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade5}
																											onChange={(e) =>
																												setfirstGrade5(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>6</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub6}
																											onChange={(e) =>
																												setfirstSub6(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade6}
																											onChange={(e) =>
																												setfirstGrade6(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>7</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub7}
																											onChange={(e) =>
																												setfirstSub7(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade7}
																											onChange={(e) =>
																												setfirstGrade7(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>8</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub8}
																											onChange={(e) =>
																												setfirstSub8(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade8}
																											onChange={(e) =>
																												setfirstGrade8(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>9</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={firstSub9}
																											onChange={(e) =>
																												setfirstSub9(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={firstGrade9}
																											onChange={(e) =>
																												setfirstGrade9(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</div>
																				)}
																			</form>
																		</div>
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="card">
																		<div className="card-header">
																			<h5 className="card-title">
																				Second Sitting Olevel Details
																			</h5>
																		</div>
																		<div className="card-body">
																			<form action="#">
																				<div className="form-group">
																					<label>Exam Number</label>
																					<input
																						value={secondexamNumber}
																						type="text"
																						className="form-control"
																						onChange={(e) =>
																							setsecondexamNumber(
																								e.target.value
																							)
																						}
																						disabled
																					/>
																				</div>
																				<div className="form-group">
																					<label>Olevel Type</label>
																					<Dropdown
																						value={secondexamType}
																						onChange={(e) =>
																							setsecondexamType(e.value)
																						}
																						options={olevelTypesList}
																						placeholder="Select Your Subject"
																						className="w-full md:w-21.5rem"
																						disabled
																					/>
																				</div>
																				<div className="form-group">
																					<label>Exam Year</label>
																					<Dropdown
																						value={secondexamYear}
																						onChange={(e) =>
																							setsecondexamYear(e.value)
																						}
																						options={yearsList}
																						placeholder="Select Year"
																						className="w-full md:w-21.5rem"
																						disabled
																					/>
																				</div>
																				{olevelSubjects === null &&
																				olevelGrades === null ? (
																					<></>
																				) : (
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
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub1}
																											onChange={(e) =>
																												setsecondSub1(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade1}
																											onChange={(e) =>
																												setsecondGrade1(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>2</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub2}
																											onChange={(e) =>
																												setsecondSub2(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade2}
																											onChange={(e) =>
																												setsecondGrade2(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>3</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub3}
																											onChange={(e) =>
																												setsecondSub3(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade3}
																											onChange={(e) =>
																												setsecondGrade3(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>4</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub4}
																											onChange={(e) =>
																												setsecondSub4(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade4}
																											onChange={(e) =>
																												setsecondGrade4(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>5</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub5}
																											onChange={(e) =>
																												setsecondSub5(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade5}
																											onChange={(e) =>
																												setsecondGrade5(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>6</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub6}
																											onChange={(e) =>
																												setsecondSub6(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade6}
																											onChange={(e) =>
																												setsecondGrade6(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>7</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub7}
																											onChange={(e) =>
																												setsecondSub7(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade7}
																											onChange={(e) =>
																												setsecondGrade7(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>8</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub8}
																											onChange={(e) =>
																												setsecondSub8(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade8}
																											onChange={(e) =>
																												setsecondGrade8(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																								<tr>
																									<td>9</td>
																									<td>
																										{" "}
																										<Dropdown
																											value={secondSub9}
																											onChange={(e) =>
																												setsecondSub9(e.value)
																											}
																											options={olevelSubjects}
																											optionLabel="name"
																											placeholder="Select Your Subject"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>

																									<td>
																										<Dropdown
																											value={secondGrade9}
																											onChange={(e) =>
																												setsecondGrade9(e.value)
																											}
																											options={olevelGrades}
																											optionLabel="name"
																											placeholder="Select Your Grade"
																											className="w-full md:w-21.5rem"
																											disabled
																										/>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</div>
																				)}
																			</form>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										) : (
											<></>
										)}
										{item?.pageName?.includes("Passport") ? (
											<>
												<div className="col-12">
													<h5 className="form-title">
														<span>Preview Passport</span>
													</h5>
												</div>
												<div className=" row col-lg-10 offset-lg-1 col-sm-12 offset-sm-1">
													<div className="col-10">
														<Toast ref={toast}></Toast>

														<FileUpload
															ref={fileUploadRef}
															name="file"
															url={Constant?.BACK_END_URL + "/api/Passport"}
															multiple
															accept="image/*"
															maxFileSize={1000000}
															onUpload={onTemplateUpload}
															onSelect={onTemplateSelect}
															onError={onTemplateClear}
															onClear={onTemplateClear}
															headerTemplate={previewheaderTemplate}
															itemTemplate={itemTemplate}
															emptyTemplate={emptyTemplate}
															chooseOptions={chooseOptions}
															uploadOptions={uploadOptions}
															cancelOptions={cancelOptions}
														/>
													</div>
												</div>
											</>
										) : (
											<></>
										)}

										{item?.pageName?.includes("O-level Result") ||
										item?.pageName?.includes("Passport") ? (
											<></>
										) : (
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
																<div
																	className="col-lg-4 col-sm-12"
																	key={index3}>
																	<div className="form-group local-forms">
																		{RenderPreviewInputs(item3)}
																	</div>
																</div>
															</>
														))}
													</>
												</div>
											))
										)}
									</div>
								</>
							)
						)
					)}
					<div className="col-auto text-end float-end ms-auto download-grp pb-6">
						<button
							className="btn btn-outline-primary me-2"
							onClick={() => submitAfterPreview()} // Navigate to the previous tab
						>
							<i className="fas fa-paper-plane"></i> Submit
						</button>
					</div>
				</div>
			</Dialog>
		</>
	);
}
