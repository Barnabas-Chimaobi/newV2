import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SAVE_DYNAMIC_FORM_SETUP,
	SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
	SAVE_FORM_SECTION,
} from "../../api/mutations/adminMutation";
import {
	ALL_PROGRAMME,
	GET_ALL_SESSION,
	GET_ALL_PAGES,
	GET_ALL_SECTIONS,
} from "../../api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import Loader from "../../../components/loader";
// import FormProperties from "./formProperties";
import { activeFormView } from "../../../redux/reducers/formReducers";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Spinner from "@/components/spinner";
// import Select from "react-select";

const pageDetails = {
	dataFormat: [
		{ name: "Section Name" },
		// { name: 'Action' }
	],
};

export default function FormSection(props) {
	const dispatch = useDispatch();
	const { router, isFallback } = useRouter();
	let [fieldname, setfieldname] = React.useState("");
	let [field_type, setfieldtype] = React.useState("");
	let [field_label, setfieldlabel] = React.useState("");
	let [programmeId, setProgrammeId] = React.useState(0);
	let [sessionId, setSessionId] = React.useState(0);
	let [formLists, setFormLists] = useState([]);
	let [pageId, setPageId] = useState(0);
	let [sectionName, setSectionName] = useState("");
	const [
		setupFormSection,
		{ loading: sectionLoading, error: sectionError, data: sectionpData },
	] = useMutation(SAVE_FORM_SECTION);
	const [sectionArr, setSectionArr] = useState([]);
	let [tabName, setTabName] = React.useState("");
	const [load, setLoad] = useState(false);
	const [stepOne, setStepone] = useState(false);

	const [
		lazyQueryPages,
		{ loading: pagesLoading, error: pagesError, data: pagesList },
	] = useLazyQuery(GET_ALL_PAGES);

	// console.log(pagesList, "pagesList");

	const [
		lazyQuerySections,
		{ loading: sectionsLoading, error: sectionsError, data: sectionList },
	] = useLazyQuery(GET_ALL_SECTIONS);

	const queryPages = async () => {
		try {
			let page = await lazyQueryPages({
				variables: {
					programmeId: parseInt(props.programmeId),
					sessionId: parseInt(props.sessionId),
				},
			});
		} catch (err) {
			toast.error(err.message);
		}
	};

	const querySection = async (value) => {
		try {
			let page = await lazyQuerySections({
				variables: {
					programmeId: parseInt(
						value?.key == "session" ? value.value : props.programmeId
					),
					sessionId: parseInt(
						value?.key == "session" ? value.value : props.sessionId
					),
				},
			});
			console.log(page, "section=====");
		} catch (err) {
			toast.error(err.message);
		}
	};

	const saveFormStepTwo = async () => {
		try {
			if (pageId == 0) {
				toast.warning("Please select tab before you proceed");
			} else {
				setLoad(true);
				console.log(
					{
						sectionArr,
					},
					"response====responsse====="
				);
				const response = await setupFormSection({
					variables: {
						model: {
							pageSectionDto: sectionArr,
						},
					},
				});
				console.log(response, "response");
				setLoad(false);
				dispatch(activeFormView("three"));
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const sectionObject = {
		pageId: tabName.Id,
		sectionName: sectionName,
	};

	const pushFormObject = () => {
		formLists.push(formObject), console.log(formLists, "formlist======");
	};

	const handleLabel = (event) => {
		const target = event.target.value;
		setfieldlabel(target);
		console.log(fieldname);
	};

	const handlePages = (event) => {
		// console.log(event, "event==sss===");
		console.log(event.value);
		const target = event.value.Id;
		setTabName(event.value);
		setPageId(target);
	};

	const handleAddSections = () => {
		sectionArr.push(sectionObject);
		let updatedList = sectionArr.filter((x) => {
			return x;
		});
		setSectionArr(updatedList);
		// document.getElementById("tab_name").value = "";
		console.log(updatedList, "updatedlist=====");
	};
	const removeTab = (data) => {
		let filteredItems = sectionArr.filter((x) => {
			return x != data;
		});
		setSectionArr(filteredItems);
	};
	useEffect(() => {
		queryPages(), querySection();
	}, []);

	const skipToNext = (item) => {
		dispatch(activeFormView(item));
	};

	const closeAllTabs = () => {
		console.log("consollleded======");
		querySection({
			key: "session",
			value: 0,
		});
	};

	const previous = (item) => {
		console.log(item, "item=====");
		dispatch(activeFormView(item));
	};

	const selectTabs =
		pagesList &&
		pagesList?.allPages?.map((x) => {
			return {
				Name: x.pageName,
				Id: x.pageId,
			};
		});

	if (isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{
				<div className="card card-body mt-6 mx-auto py-1 ">
					{load ? <Spinner /> : null}
					<ToastContainer />
					<div className=" py-2  ">
						<p class=" font-medium text-lg pb-4">Create Sections</p>

						<div className="row">
							{/* <div class=""> */}
							<div class="col-lg-4 mr-4">
								<div className="local-forms form-group">
									<label>
										pages
										<span className="login-danger">*</span>
									</label>
									<Dropdown
										value={tabName}
										options={selectTabs}
										placeholder="Select Tab"
										onChange={(e) => {
											handlePages(e);
											// setSessionId(e.target.value);
										}}
										className="w-full md:w-21.5rem"
										optionLabel="Name"
									/>
								</div>
								{/* </div> */}
							</div>
							{/* <div className="d-flex"> */}
							<div className="col-lg-4 col-sm-12 mr-4">
								<div className="local-forms form-group">
									<label>
										Section Name
										<span className="login-danger">*</span>
									</label>
									<InputText
										id="PageName"
										className="w-full md:w-21.5rem"
										value={sectionName}
										onChange={(e) => setSectionName(e.target.value)}
										placeholder="Enter Section Name"
									/>
								</div>
							</div>

							<div className="col-lg-2 col-sm-12 ">
								<div className="local-forms form-group">
									<Button
										label="Add"
										className="btn btn-outline-primary me-2"
										onClick={() => handleAddSections()}
									/>
								</div>
							</div>
							{/* </div> */}
						</div>

						{/* {sectionList && sectionList?.allSections?.length != 0 && (
							<div className="mt-8 flex flex-col">
								<div class="relative  flex mb-5">
									<div class=" absolute inset-y-0 right-0 content-end">
										<div className="mt-4">
											<button
												type="button"
												onClick={() => closeAllTabs()}
												className="bg-green-600 text-white rounded-md w-46 p-3">
												Close All Sections
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
													{sectionList?.allSections.map((page) => (
														<tr key={page.id}>
															<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																{page.sectionName}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						)} */}
						<br />
						<hr />
						<br />

						{/* <div
							class="columns-4 justify-items-center ..."
							style={{ marginTop: "60px" }}>
							{sectionArr.map((x) => {
								return (
									<div key={x}>
										<h1
											style={{ display: "flex", color: "#177d49" }}
											className="underline underline-offset-8 ...">
											{x.sectionName} &nbsp;
										
										</h1>
									</div>
								);
							})}
						</div> */}

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								overflowX: "auto",
							}}>
							{sectionArr?.map((item, index) => {
								return (
									<>
										<Button
											label={item.sectionName}
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
					</div>
					<div class="row">
						{/* <div class=""> */}
						<div className=" col-lg-1 mt-4 mb-4">
							<div>
								<button
									type="button"
									onClick={() => previous("one")}
									className="btn btn-primary">
									Previous
								</button>
							</div>
						</div>
						<div className="col-lg-3 mt-4">
							<button
								className=" btn btn-primary"
								type="button"
								onClick={() => {
									saveFormStepTwo();
								}}
								// className="bg-green-600 text-white rounded-md w-full p-3"
							>
								Save and proceed
							</button>
						</div>
						{/* </div> */}
					</div>
				</div>
			}
		</>
	);
}
