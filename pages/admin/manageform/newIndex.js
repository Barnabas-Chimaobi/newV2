import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SAVE_DYNAMIC_FORM_SETUP,
	SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
} from "../../api/mutations/adminMutation";
import {
	ALL_PROGRAMME,
	GET_ALL_SESSION,
	GET_ALL_PAGES,
} from "../../api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
// import { TrashIcon } from "@heroicons/react/24/outline";
import FormSection from "./formSection";
import FormProperties from "./formProperties";
// import Loader from "../../../components/loader";
// import Info from "../../../components/info";
import { activeFormView } from "../../../redux/reducers/formReducers";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Spinner from "@/components/spinner";
// import Select from "react-select";

const pageDetails = {
	dataFormat: [{ name: "Page Name" }, { name: "Action" }],
};

export default function index() {
	const { router, isFallback } = useRouter();
	const dispatch = useDispatch();
	const formViewCondition = useSelector((state) => state.form.activeFormView);
	let [fieldname, setfieldname] = React.useState("");
	let [field_type, setfieldtype] = React.useState("");
	let [field_label, setfieldlabel] = React.useState("");
	let [section, setSection] = React.useState("");
	let [sessions, setSession] = React.useState("");
	let [programmes, setProgramme] = React.useState("");
	let [programmeId, setProgrammeId] = React.useState(0);
	let [sessionId, setSessionId] = React.useState(0);
	let [formList, setFormList] = React.useState([]);
	let [completeFormList, setCompleteFormList] = React.useState({});
	let [error, setError] = useState("");
	let [errorModal, setErrorModal] = useState(false);
	let [showSucess, setShowSuccess] = useState(false);
	let [formLists, setFormLists] = useState([]);
	let [isSSR, setIsSSr] = useState(true);
	const programme = useSelector((state) => state.schoolSetup.programme);
	const session = useSelector((state) => state.schoolSetup.session);
	const faculty = useSelector((state) => state.schoolSetup.faculty);
	const user = useSelector((state) => state.user.userDetails);
	const [
		setupForm,
		{ loading: setupLoading, error: setupError, data: setupData },
	] = useMutation(SAVE_DYNAMIC_PROGRAMME_AND_SESSION);
	const [tabArr, setTabArr] = useState([]);
	let [tabName, setTabName] = React.useState("");
	const [stepone, setStepone] = useState(false);
	const [steptwo, setSteptwo] = useState(false);
	const [load, setload] = useState(false);
	const [showInfo, setShowInfo] = useState();
	const stepsView = () => setStepone((prev) => !prev);

	const {
		loading: sessionLoading,
		error: sessionError,
		data: sessionList,
	} = useQuery(GET_ALL_SESSION);

	const {
		loading: programmeLoading,
		error: programmeError,
		data: programmeList,
	} = useQuery(ALL_PROGRAMME);
	console.log(programmeList, "programmeList");

	const [
		lazyQueryPages,
		{ loading: pagesLoading, error: pagesError, data: pagesList },
	] = useLazyQuery(GET_ALL_PAGES);

	const queryPages = async (value) => {
		try {
			let page = await lazyQueryPages({
				variables: {
					programmeId: parseInt(
						value?.key == "programme" ? value.value : programmeId
					),
					sessionId: parseInt(
						value?.key == "session" ? value.value : sessionId
					),
				},
			});
		} catch (err) {
			toast.error(err.message);
		}
	};

	const saveFormStepOne = async () => {
		try {
			if (programmeId == 0 || sessionId == 0) {
				setShowInfo(true);
				toast.warn("Please select session and programme to proceed");
			} else {
				setload(true);
				console.log(
					{
						programmeId: programmeId,
						sessionId: sessionId,
						pageName: tabArr,
					},
					"response====responsse====="
				);
				const response = await setupForm({
					variables: {
						model: {
							programmeId: programmeId.Id,
							sessionId: sessionId.Id,
							pageName: tabArr,
						},
					},
				});
				dispatch(activeFormView("two"));
				console.log(response, "response");
				setload(false);
				setStepone(true);
				setTabArr([]);
			}
		} catch (err) {
			toast.error(err.message);
			setTabArr([]);
		}
	};

	const formObject = {
		fieldName: field_label,
		fieldType: field_type,
		fieldSection: section,
	};

	const handleSession = (event) => {
		const target = event.target.value;
		console.log(target, "target===targetss====");
		setSessionId(target);
		queryPages({
			key: "session",
			value: target,
		});
	};

	const handleProgramme = (event) => {
		const target = event.target.value;
		console.log(target, "target===targetss====");
		setProgrammeId(target);
		queryPages({
			key: "programme",
			value: target,
		});
	};

	const handleAddTabs = () => {
		tabArr.push(tabName);
		let updatedList = tabArr.filter((x) => {
			return x;
		});
		setTabArr(updatedList);
		setTabName("");
		// document.getElementById("tab_name").value = "";
	};
	const removeTab = (data) => {
		let filteredItems = tabArr.filter((x) => {
			return x != data;
		});
		setTabArr(filteredItems);
	};

	const closeAllTabs = () => {
		queryPages({
			key: "session",
			value: 0,
		});
	};
	const dispatView = (item) => {
		dispatch(activeFormView(item));
	};
	const skipToNext = (item) => {
		dispatView(item);
	};

	const selectSession = sessionList?.allSession?.map((item) => {
		return {
			Id: item.id,
			Name: item.name,
		};
	});

	const selectProgramme = programmeList?.allProgramme?.map((item) => {
		return {
			Id: item.id,
			Name: item.name,
		};
	});

	useEffect(() => {
		// dispatch(activeFormView("one"));
		setIsSSr(false);
	}, []);

	if (isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{/* {load ? <Loader /> : null} */}
			<ToastContainer />
			{!isSSR && (
				<div className="page-wrapper">
					{/* <h2 className="font-semibold py-10 text-center text-xl">
						Dynamic Application Form Setup
					</h2> */}
					{load && <Spinner />}
					<div className="mx-auto py-12 bg-white-200 rounded-md max-w-7xl lg:px-8 shadow-2xl">
						{formViewCondition == "one" ? (
							<div class="card card-body mt-6">
								<p class=" font-medium text-lg py-4 pl-3">Create Pages</p>
								<div class="row">
									<div class="row col-lg-8 ">
										<div class="col-lg-5  mr-4">
											{/* <div className="col-lg-4 col-sm-12"> */}
											<div className="local-forms form-group">
												<label>
													Programme
													<span className="login-danger">*</span>
												</label>
												<Dropdown
													value={programmeId}
													options={selectProgramme}
													placeholder="Select Programme"
													onChange={(e) => {
														setProgrammeId(e.target.value);
													}}
													className="w-full md:w-21.5rem"
													optionLabel="Name"
												/>
											</div>
										</div>
										<div class=" col-lg-5">
											<div class="">
												<div className="local-forms form-group">
													<label>
														Session
														<span className="login-danger">*</span>
													</label>
													<Dropdown
														value={sessionId}
														options={selectSession}
														placeholder="Select Session"
														onChange={(e) => {
															setSessionId(e.target.value);
														}}
														className="w-full md:w-21.5rem"
														optionLabel="Name"
													/>
												</div>
											</div>
										</div>
									</div>
									<div
										className="col-lg-4 mt-lg-0 mt-2 "
										style={
											{
												// marginTop: -70,
											}
										}>
										<div>
											<Card title=" Instructions">
												<p className="m-0">
													1. To create an O-Level Page, the page name should
													include "O-Level" in brackets, like Page3 (O-Level).
												</p>
												<p className="m-0">
													2. To create a Passport Page, the page name should
													include "Passport" in brackets, like Page3 (Passport).
												</p>
												<p className="m-0">3. Check The Preview Below</p>
												<p className="m-0">4. Save</p>
											</Card>
										</div>
									</div>
								</div>
								<br />
								<hr />
								{pagesList && pagesList?.allPages?.length != 0 && (
									<div className="mt-8 flex flex-col">
										<div class="relative  flex mb-5">
											<div class=" absolute inset-y-0 right-0 content-end">
												<div className="mt-4">
													<button
														type="button"
														onClick={() => closeAllTabs()}
														className="bg-green-600 text-white rounded-md w-46 p-3">
														Close All Tabs
													</button>
												</div>
											</div>
										</div>
										<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
											<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
												<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
													<table className="min-w-full divide-y divide-gray-300">
														<thead className="bg-gray-50">
															<tr>
																{pageDetails.dataFormat.map((item, index) => (
																	<th
																		key={index.toString()}
																		scope="col"
																		className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
																		{item.name}
																	</th>
																))}
															</tr>
														</thead>
														<tbody className="divide-y divide-gray-200 bg-white">
															{pagesList?.allPages.map((page) => (
																<tr key={faculty.id}>
																	<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																		{page.pageName}
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}
								<br />

								<div className="row ">
									<div className="col-lg-4 col-sm-12 ml-2">
										<div className="local-forms form-group">
											<label>
												Page Name
												<span className="login-danger">*</span>
											</label>
											<InputText
												id="PageName"
												className="w-full md:w-21.5rem"
												value={tabName}
												onChange={(e) => setTabName(e.target.value)}
											/>
										</div>
									</div>

									<div className="col-lg-1 col-sm-12 ">
										<div className="local-forms form-group">
											<Button
												label="Add"
												className="btn btn-outline-primary me-2"
												onClick={() => handleAddTabs()}
											/>
										</div>
									</div>
									<div class="col-lg-3">
										<div className="">
											<button
												className=" btn btn-primary"
												type="button"
												onClick={() => {
													saveFormStepOne();
												}}
												// className="bg-green-600 text-white rounded-md w-full p-3"
											>
												Save and proceed
											</button>
										</div>
									</div>
								</div>
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										overflowX: "auto",
									}}>
									{tabArr?.map((item, index) => {
										return (
											<>
												<Button
													label={item}
													icon="pi pi-times"
													rounded
													outlined
													severity="primary"
													className="ml-2"
													onClick={() => removeTab(item)}
												/>
											</>
										);
									})}
								</div>
								{/* <div class="flex ...">
									<div
										class="columns-4 justify-items-center ..."
										style={{ marginTop: "60px" }}>
										{tabArr.map((x) => {
											return (
												<div key={x}>
													<h6
														// style={{ display: "flex", color: "#177d49" }}
														className="underline underline-offset-8 ...">
														{x} &nbsp;
														<TrashIcon
															onClick={() => removeTab(x)}
															style={{ width: "20px" }}
														/>
													</h6>
												</div>
											);
										})}
									</div>
								</div> */}

								{/* <div class="w-full ..." style={{ marginTop: "60px" }}>
									<div className="mt-4">
										<button
											className=" col-12 btn btn-primary"
											type="button"
											onClick={() => {
												saveFormStepOne();
											}}
										>
											Save and proceed
										</button>
									</div>
								</div> */}
							</div>
						) : formViewCondition == "two" ? (
							<FormSection
								programmeId={programmeId.Id}
								sessionId={sessionId.Id}
							/>
						) : (
							<FormProperties
								programmeId={programmeId.Id}
								sessionId={sessionId.Id}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
