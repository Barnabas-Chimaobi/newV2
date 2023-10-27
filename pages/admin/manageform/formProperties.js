import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SAVE_DYNAMIC_FORM_SETUP,
	SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
	SAVE_FORM_SECTION,
	SAVE_DYNAMIC_FORM_FiELD_DETAILS,
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
import Biodata from "../../../components/biodata";
// import { data } from "autoprefixer";
// import Loader from "../../../components/loader";
import { activeFormView } from "../../../redux/reducers/formReducers";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Spinner from "@/components/spinner";
// import Select from "react-select";

export default function FormProperties(props) {
	const { router, isFallback } = useRouter();
	const dispatch = useDispatch();
	let [fieldname, setfieldname] = React.useState("");
	let [field_type, setFieldType] = React.useState("");
	let [field_label, setFieldLabel] = React.useState("");
	let [programmeId, setProgrammeId] = React.useState(0);
	let [sessionId, setSessionId] = React.useState(0);
	let [formLists, setFormLists] = useState([]);
	let [pageId, setPageId] = useState(0);
	let [sectionName, setSectionName] = useState("");
	const [
		setupFormFields,
		{ loading: sectionLoading, error: sectionError, data: sectionpData },
	] = useMutation(SAVE_DYNAMIC_FORM_FiELD_DETAILS);
	const [sectionArr, setSectionArr] = useState([]);
	const [sectionObjArr, setSectionObjArr] = useState([]);
	let [formList, setFormList] = React.useState([]);
	let [mainArr, setMainArr] = React.useState([]);
	let [sectionHeadArr, setSectionHeadArr] = React.useState([]);
	let [load, setLoad] = useState(false);

	const [
		lazyQueryPages,
		{ loading: pagesLoading, error: pagesError, data: pagesList },
	] = useLazyQuery(GET_ALL_SECTIONS);

	// console.log(pagesList, "pagesList");

	const queryPages = async () => {
		let page = await lazyQueryPages({
			variables: {
				programmeId: parseInt(props.programmeId),
				sessionId: parseInt(props.sessionId),
			},
		});
		console.log(page.data, "pages===pages====");
	};

	const saveFormStepTwo = async () => {
		console.log(sectionObjArr, "post=======sssss=====");
		console.log(pageId, "post=======sssss=====");
		try {
			setLoad(true);
			const response = await setupFormFields({
				variables: {
					model: {
						fieldDetails: sectionObjArr,
					},
				},
			});
			toast.success(" Form created successfully");
			setFormList([]);
			setSectionObjArr([]);
			setLoad(false);
		} catch (err) {
			setLoad(false);
			toast.error(err.message);
		}
	};

	// const sectionObject = {
	// 	dynamicFormPageSectionSetupId: JSON.parse(pageId),
	// 	label: field_label,
	// 	input_type: field_type,
	// 	sectionName: sectionName,
	// };

	const handleSections = (event) => {
		console.log(event, "index=====");
		// let index = event.target.selectedIndex;
		// console.log(index, "index=====");
		// const target = event.target.value;
		setPageId(event.value);
		// let el = event.target.childNodes[index];
		// let option = el.getAttribute("id");
		// console.log("Name, Code ======", option, target);
		// setSectionName(option);
	};

	const handlefieldType = (event) => {
		const target = event.target.value;
		setFieldType(target);
		console.log(target, "target======");
	};

	const mapObjectToSection = () => {
		console.log(pageId, "page====id====");
		const headerObj = {
			name: sectionName,
			key: parseInt(pageId.Id),
		};

		var result = sectionHeadArr.filter((t) => t.key === headerObj.key);
		if (result.length === 0) {
			sectionHeadArr.push(headerObj);
			setSectionHeadArr(sectionHeadArr);
		}
		const mapOject = {
			dynamicFormPageSectionSetupId: parseInt(pageId.Id),
			label: field_label,
			input_type: field_type.Name,
			sectionName: sectionName,
		};

		sectionArr?.push(mapOject);
		let updatedMainArr = sectionArr.filter((x) => {
			return x;
		});
		setSectionArr(updatedMainArr);

		const remapObject = updatedMainArr?.map((item) => {
			return {
				dynamicFormPageSectionSetupId: item.dynamicFormPageSectionSetupId,
				label: item.label,
				input_type: item.input_type,
			};
		});

		console.log(remapObject, "remap====object=====");

		setSectionObjArr(remapObject);
		let array = [];
		var sectionid = 0;
		for (let i = 0; i < sectionHeadArr.length; i++) {
			var objectlist = sectionHeadArr;
			var hsectionid = objectlist[i];
			sectionid = hsectionid.key;
			const pagefillter = sectionArr.filter(FilterSections);
			var arrayobject = {
				sectionName: sectionHeadArr[i].name,
				fieldDetails: pagefillter,
			};
			array.push(arrayobject);
		}
		// document.getElementById("field_name").value = "";

		function FilterSections(section) {
			return section.dynamicFormPageSectionSetupId == sectionid;
		}
		setFormList(array);
	};

	// const handleAddSections = () => {
	// 	sectionArr.push(sectionObject);
	// 	let updatedList = sectionArr.filter((x) => {
	// 		return x;
	// 	});
	// 	setSectionArr(updatedList);
	// 	document.getElementById("tab_name").value = "";

	// 	const remapObject = updatedList?.map((item) => {
	// 		return {
	// 			dynamicFormPageSectionSetupId: item.dynamicFormPageSectionSetupId,
	// 			label: item.field_label,
	// 			input_type: item.field_type,
	// 		};
	// 	});

	// 	setSectionObjArr(remapObject);
	// };

	const removeTab = (data) => {
		let filteredItems = sectionArr.filter((x) => {
			return x != data;
		});
		setSectionArr(filteredItems);
	};

	useEffect(() => {
		setSectionObjArr([]);
		queryPages();
	}, []);

	const previous = (item) => {
		console.log(item, "item=====");
		dispatch(activeFormView(item));
	};

	if (isFallback) {
		return <div>Loading...</div>;
	}

	const selectSection =
		pagesList &&
		pagesList?.allSections?.map((item) => {
			return {
				label: item.sectionName,
				value: item.sectionId,
			};
		});

	const options = [
		{ value: "option1", label: "text" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
		{ value: "option4", label: "Option 4" },
	];

	const deleteField = (field) => {
		const section = sectionArr?.filter((x) => {
			return (
				x.label != field.label && {
					dynamicFormPageSectionSetupId: x.dynamicFormPageSectionSetupId,
					label: x.field_label,
					input_type: x.field_type,
					sectionName: x.sectionName,
				}
			);
		});
		console.log(section, "sectioooo====");
		setSectionArr(section);

		let filteredItems = formList?.map((item) => {
			const list = item?.fieldDetails?.filter((x) => {
				// console.log(x, "xxxx=====xxxx===");
				return x.label != field.label;
			});
			return {
				sectionName: item.sectionName,
				fieldDetails: list,
			};
		});
		console.log(filteredItems, "field======sss");
		setSectionObjArr(filteredItems);
		setFormList(filteredItems);
	};

	const sections = pagesList?.allSections?.map((item) => {
		return {
			Name: item.sectionName,
			Id: item.sectionId,
		};
	});

	const fieldType = [
		{ Id: 1, Name: "text" },
		{ Id: 2, Name: "number" },
		{ Id: 3, Name: "select" },
		{ Id: 4, Name: "date" },
	];

	return (
		<>
			{load ? <Spinner /> : null}
			<ToastContainer />
			<div className="card card-body mx-auto py-1 mt-5">
				<div className=" py-2 ">
					<p class=" font-medium text-lg pb-4">Create Field Properties</p>

					<div class="">
						<div class="">
							<div class="col-lg-4">
								<div className="local-forms form-group">
									<label>
										Sections
										<span className="login-danger">*</span>
									</label>
									<Dropdown
										value={pageId}
										options={sections}
										placeholder="Select Section"
										onChange={(e) => {
											handleSections(e);
											// setSessionId(e.target.value);
										}}
										className="w-full md:w-21.5rem"
										optionLabel="Name"
									/>
								</div>
							</div>
						</div>
					</div>
					<br />
					<hr />
					<br />

					<div class="row">
						{/* <div class=" "> */}
						<div class="col-lg-4 mr-4">
							<div className="local-forms form-group">
								<label>
									Field Type
									<span className="login-danger">*</span>
								</label>
								<Dropdown
									value={field_type}
									options={fieldType}
									placeholder="Select Field Type"
									onChange={(e) => {
										handlefieldType(e);
										// setSessionId(e.target.value);
									}}
									className="w-full md:w-21.5rem"
									optionLabel="Name"
								/>
							</div>
						</div>
						{/* </div> */}

						<div className="col-lg-4 col-sm-12 mr-4">
							<div className="local-forms form-group">
								<label>
									Field Name
									<span className="login-danger">*</span>
								</label>
								<InputText
									placeholder="Enter Field Name"
									id="PageName"
									className="w-full md:w-21.5rem"
									// value={page}
									onChange={(e) => setFieldLabel(e.target.value)}
								/>
							</div>
						</div>

						<div className="col-auto text-end download-grp mt-0">
							<div>
								<button
									type="button"
									onClick={mapObjectToSection}
									className="btn btn-primary"
									// type="button"
									// className="bg-green-600 text-white rounded-md w-46 p-3"
								>
									Add Field Property
								</button>
							</div>
						</div>
					</div>
					<Biodata func={deleteField} form={formList} />

					<div
						class="columns-4 justify-items-center ..."
						style={{ marginTop: "30px" }}></div>
				</div>

				<div class="row">
					<div className="col-lg-1 mb-4 mt-4">
						<div>
							<button
								type="button"
								onClick={() => previous("two")}
								className="btn btn-primary">
								Previous
							</button>
						</div>
					</div>
					<div className="col-lg-3 mt-4">
						<button
							type="button"
							onClick={() => {
								saveFormStepTwo();
							}}
							className=" btn btn-primary">
							Save and proceed
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
