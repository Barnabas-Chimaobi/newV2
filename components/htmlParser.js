import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const parseFieldSetting = (field, initialData) => {
	let names = {};
	let allName = [];
	// const [form, setForm] = useState({}

	if (field.input_type === "text" || field.input_type === "number") {
		// check if field is in initial data
		const fieldValue = initialData ? initialData[field.name] : null;
		return (
			<div className="mt-4">
				<div className="local-forms form-group">
					<label>
						{field.label}
						<span className="login-danger">*</span>
					</label>
					<InputText
						name={field.label}
						id={field.name}
						className="w-full md:w-21.5rem"
						value={fieldValue}
						// onChange={(e) => setSectionName(e.target.value)}
						placeholder="Type here"
					/>
				</div>
			</div>
		);
	}

	if (field.input_type === "select") {
		const fieldValue = initialData ? initialData[field.name] : null;
		const options = field?.list?.map((item) => (
			<option key={item.name} value={item.name}>
				{item.name}
			</option>
		));
		return (
			<div class="d-flex">
				<div class=" mt-4 mr-4">
					<div className="local-forms form-group">
						<label>
							{field.label}
							<span className="login-danger">*</span>
						</label>
						<Dropdown
							options={options}
							placeholder="Select value here........."
							onChange={(e) => {
								// handlefieldType(e);
								// setSessionId(e.target.value);
							}}
							className="w-full md:w-21.5rem"
							optionLabel="Name"
						/>
					</div>
				</div>
			</div>
		);
	}

	if (field.input_type === "date") {
		const fieldValue = initialData ? initialData[field.name] : null;
		const options = field?.list?.map((item) => (
			<option key={item.name} value={item.name}>
				{item.name}
			</option>
		));
		return (
			<div key={field.name}>
				<div class=" mt-4 mr-4">
					<div className="local-forms form-group">
						<label
							htmlFor={field.name}
							className="block text-sm font-medium text-gray-700 capitalize">
							{field.label}
						</label>
						<Calendar onChange={(e) => {}} showIcon />
					</div>
				</div>
			</div>
		);
	}

	return <></>;
};

export { parseFieldSetting };
