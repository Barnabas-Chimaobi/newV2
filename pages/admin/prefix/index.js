import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { isNullableType } from "graphql";
import Table from "../../../components/table";
import { CREATE_PREFIX } from "@/pages/api/mutations/admin";
import { VIEW_ALL_PREFIX, ALL_PROGRAMME } from "@/pages/api/queries/admin";

export default function index() {
	const [programmeState, setProgrammeState] = useState([]);
	const [
		createPrefix,
		{
			loading: createPrefixLoad,
			error: createPrefixError,
			data: createPrefixData,
		},
	] = useMutation(CREATE_PREFIX);
	const [
		viewPrefix,
		{ loading: viewPrefixLoad, error: viewPrefixError, data: viewPrefixData },
	] = useLazyQuery(VIEW_ALL_PREFIX);

	const [
		programme,
		{ loading: programmeloading, error: programmeerror, data: programmeList },
	] = useLazyQuery(ALL_PROGRAMME);

	const createPrefixFunc = async (data) => {
		const payload = await createPrefix({
			variables: {
				model: {
					applicationNumberPrefix: data?.ApplicationFormPrefix,
					programmeId: data?.Programme?.Id,
				},
			},
		});
	};

	const selectProgramme = programmeList?.allProgramme?.map((item) => {
		return {
			Name: item.name,
			Id: item.id,
		};
	});

	const ronProgramme = async () => {
		const prog = await programme();
		const newList = prog.data?.allProgramme?.map((item) => {
			return {
				Name: item.name,
				Id: item.id,
			};
		});
		console.log(newList, "programmmselect====sss====");

		setProgrammeState(newList);
	};

	useEffect(() => {
		ronProgramme();
		// programme();
	}, []);

	const headers = [
		{
			field: "ApplicationFormPrefix",
			header: "Application Form Prefix",
			sortable: true,
			style: { minWidth: "12rem", backgroundColor: "white" },
		},
		{
			field: "Programme",
			header: "Programme",
			sortable: true,
			style: { minWidth: "12rem", backgroundColor: "white" },
		},

		// Add more headers as needed
	];

	const generateColumnTemplates = (headers) => {
		return headers.map((header) => (
			<Column
				key={header.field}
				field={header.field}
				header={header.header}
				sortable={header.sortable}
				style={header.style}></Column>
		));
	};

	const tableRow = viewPrefixData?.viewAllApplicationFormNumberSetup?.map(
		(item, index) => {
			return {
				ApplicationFormPrefix: item?.applicationNumberPrefix,
				Programme: item?.programme?.name,
			};
		}
	);

	//   console.log(viewTimetableData, "viewww");

	const TableObj = {
		ApplicationFormPrefix: "",
		Programme: "",
		Id: "",
	};

	const DropDownObjects = [
		{
			Name: "ApplicationFormPrefix",
			Type: "Text",
			List: isNullableType,
			Description: "",
			Id: "",
		},

		{
			Name: "Programme",
			Type: "Dropdown",
			List: programmeState,
			Description: "",
			Id: "",
		},
	];
	return (
		<div>
			<div className="page-wrapper">
				<div className="content container-fluid">
					{programmeState?.length != 0 && (
						<div className="px-5 py-5">
							<Table
								saveFunc={createPrefixFunc}
								headers={headers}
								generateColumnTemplates={generateColumnTemplates}
								tableName={"Application Form Prefix"}
								allowEdit={true}
								allowApply={false}
								tableObjectBody={TableObj}
								showExport={false}
								showAddButton={true}
								variablesForQuery={{}}
								tableContent={tableRow}
								dropDownObjects={DropDownObjects}
								deleteFunc={{}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
