import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
// import { SUBMIT_APPLICANT_FORM } from "../api/mutations/applicantMutation";
import { parseFieldSetting } from "./htmlParser";
import { Button } from "primereact/button";
// import { TrashIcon } from "@heroicons/react/24/outline";

const Biodata = ({ form, initialData, func }) => {
	const [name, setName] = useState("");
	const renderedForm = form?.map((field) => {
		return parseFieldSetting(field, initialData);
	});

	const deleteField = (id) => {
		func(id);
	};

	useEffect(() => {
		console.log(name, "namee===mannnme====");
	}, [form]);

	return (
		<div>
			{form?.map((item) => {
				// console.log(item, "itemmmm=====ssss====");
				return (
					<div className="my-10">
						<h1 className="font-medium text-black text-md uppercase m-4 mx-8">
							{item?.sectionName}
						</h1>
						{/* <div>
							<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
								{item?.fieldDetails?.map((field) => {
									return parseFieldSetting(field);
								})}
							</div>
						</div> */}
						<div className="grid grid-cols-2 gap-y-6 gap-x-4 ml-2">
							{item?.fieldDetails?.map((field) => {
								return (
									<div className="d-flex justify-between">
										<div className=" w-full">{parseFieldSetting(field)}</div>
										{initialData != "error" ? (
											<Button
												// label={item.sectionName}
												icon="pi pi-times"
												rounded
												outlined
												severity="primary"
												className="ml-2 mr-6 mt-4"
												onClick={() => deleteField(field)}
											/>
										) : // <TrashIcon
										// 	onClick={() => deleteField(field)}
										// 	className=""
										// 	// onClick={() => removeTab(x)}
										// 	style={{ width: "20px", marginTop: 20 }}
										// />
										null}
									</div>
								);
							})}

							{/* {item?.fieldDetails} */}
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default Biodata;
