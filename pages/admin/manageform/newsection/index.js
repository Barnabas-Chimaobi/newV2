import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { Chip } from "primereact/chip";

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import Form from "@/components/form";
import { Card } from "primereact/card";
import {
	SAVE_DYNAMIC_FORM_SETUP,
	SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
} from "../../../api/mutations/adminMutation";
import {
	ALL_PROGRAMME,
	GET_ALL_SESSION,
	GET_ALL_PAGES,
	GET_ALL_SET_UP_DONE,
} from "../../../api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";

import { Toast } from "primereact/toast";

export default function CreateSections() {
	const router = useRouter();
	const toast = useRef(null);
	const [pages, setpages] = useState([]);
	const [page, setpage] = useState("");
	const [section, setSection] = useState("");
	const [programme, setprogramme] = useState(1);
	const [session, setsession] = useState(32);
	const [availableForms, setavailableForms] = useState("");
	const [isLoading, setisLoading] = useState(true);
	let [formDesign, setformDesign] = useState({
		applicantForm: {
			mainPages: [],
			submitOlevelResult: [],
			personId: 33,
			personUrl: null,
		},
	});

	useEffect(() => {
		GetData();
	}, []);

	const [
		pagesDropDown,
		{
			loading: pagesDropDownLoad,
			error: pagesDropDownError,
			data: pagesDropDownData,
		},
	] = useLazyQuery(GET_ALL_PAGES);

	const GetData = async () => {
		const Response = await pagesDropDown({
			variables: {
				programmeId: 1,
				sessionId: 32,
			},
		});
		setpages(Response?.data?.allPages);
		console.log(Response, "data ...........");
		var PagesData = Response?.data?.allPages.map((item) => {
			return {
				pageId: 31,
				pageName: item?.pageName,
				programmeId: 1,
				programmeName: "Regular",
				sessionId: 32,
				sessionName: "2022/2023",
				sections: [
					{
						sectionId: 102,
						sectionName: "",
						fieldDetails: [
							{
								id: 122,
								input_type: "text",
								label: "Test Input",
								list: null,
								required: null,
								response: "",
								errorMessage: null,
								dynamicFormPageSectionSetupId: 37,
								isReadonly: false,
							},
						],
					},
				],
			};
		});

		console.log(PagesData, "page data aaaaaa");
		// var data = {
		//     "data": {
		//         "applicantForm": {
		//             "mainPages": [
		//                 PagesData.map((item) => {
		//                     return item;
		//                 })
		//             ],
		//             "submitOlevelResult": [],
		//             "personId": 33,
		//             "personUrl": null
		//         }
		//     }
		// };
		var data = {
			data: {
				applicantForm: {
					mainPages: [
						// {
						//     "pageId": 31,
						//     "pageName": "Page 1",
						//     "programmeId": 1,
						//     "programmeName": "Regular",
						//     "sessionId": 32,
						//     "sessionName": "2022/2023",
						//     "sections": [
						//         {
						//             "sectionId": 102,
						//             "sectionName": "",
						//             "fieldDetails": [{
						//                 "id": 122,
						//                 "input_type": "text",
						//                 "label": "Test Input",
						//                 "list": null,
						//                 "required": null,
						//                 "response": "",
						//                 "errorMessage": null,
						//                 "dynamicFormPageSectionSetupId": 37,
						//                 "isReadonly": false
						//             }]
						//         }
						//     ]
						// },
						// {
						//     "pageId": 34,
						//     "pageName": "Page 4",
						//     "programmeId": 1,
						//     "programmeName": "Regular",
						//     "sessionId": 32,
						//     "sessionName": "2022/2023",
						//     "sections": [
						//         {
						//             "sectionId": 122,
						//             "sectionName": "",
						//             "fieldDetails": [
						//                 {
						//                     "id": 122,
						//                     "input_type": "text",
						//                     "label": "Test Input",
						//                     "list": null,
						//                     "required": null,
						//                     "response": "",
						//                     "errorMessage": null,
						//                     "dynamicFormPageSectionSetupId": 37,
						//                     "isReadonly": false
						//                 }
						//             ]
						//         }
						//     ]
						// },
					],
					submitOlevelResult: [],
					personId: 33,
					personUrl: null,
				},
			},
		};
		var newdata = [data.data.applicantForm.mainPages, ...PagesData];
		data.data.applicantForm.mainPages = newdata;
		console.log(data, "test data formed");
		setformDesign(data.data);
	};

	return (
		<div>
			<Toast ref={toast} />
			<div className="page-wrapper">
				<div className="content container-fluid">
					<div class="row">
						<div class="col-sm-12">
							<div class="card card-table">
								<div class="card-body">
									<h4>Setup Forms</h4>

									<div className="row p-5 ms-auto ">
										<div
											style={{
												width: "65%",
												float: "left",
											}}>
											<div className="row ">
												<div className="col-lg-6 col-sm-12">
													<div className="local-forms form-group">
														<label>
															Pages
															<span className="login-danger">*</span>
														</label>
														<Dropdown
															value={page}
															options={pages}
															placeholder="select Page"
															onChange={(e) => setpage(e.target.value)}
															className="w-full md:w-21.5rem"
															optionLabel="pageName"
														/>
													</div>
												</div>

												<div className="col-lg-6 col-sm-12">
													<div className="local-forms form-group">
														<label>
															Section Name
															<span className="login-danger">*</span>
														</label>
														<InputText
															id="PageName"
															className="w-full md:w-21.5rem"
															value={section}
															onChange={(e) => setSection(e.target.value)}
														/>
													</div>
												</div>

												<div className="col-lg-6 col-sm-12 ">
													<div className="local-forms form-group">
														<Button
															label="Add"
															className="btn btn-outline-primary me-2"
															// onClick={AddPage}
														/>
													</div>
												</div>

												<div
													style={{
														display: "flex",
														flexWrap: "wrap",
														overflowX: "auto",
													}}></div>
											</div>
										</div>
										<div
											style={{
												width: "35%",
												float: "right",
											}}>
											<div></div>
										</div>
									</div>
								</div>
							</div>
							<div class="card card-table">
								<div class="card-body">
									<h4>Preview</h4>

									<Form data={formDesign} isPreview={true} />
									<div className="col-auto text-end float-end ms-auto download-grp">
										{/* {isSaving == false ? */}
										<Button
											label="Save Form"
											icon="pi pi-save"
											rounded
											severity="primary"
											className=""
											onClick={() => SaveForPages()}
										/>
										{/* :
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                                Saving.....
                                            </button> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
