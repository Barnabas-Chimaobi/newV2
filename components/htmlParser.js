import React, { useState } from "react";
const parseFieldSetting = (field, initialData) => {
	let names = {};
	let allName = [];
	// const [form, setForm] = useState({}

	if (field.input_type === "text" || field.input_type === "number") {
		// check if field is in initial data
		const fieldValue = initialData ? initialData[field.name] : null;
		return (
			<div key={field.name} className="sm:col-span-3 mx-8">
				<label
					htmlFor={field.name}
					className="block text-sm font-medium text-gray-700 capitalize">
					{field.label}
				</label>
				<div className="mt-1">
					<input
						className="dynamic_inputs"
						// onChange={handleChange}
						type="text"
						name={field.label}
						id={field.name}
						autoComplete={field.name}
						value={fieldValue}
						class="px-5 uppercase  focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 border h-10 rounded-md"
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
			<div key={field.name} className="sm:col-span-3 mx-8">
				<label
					htmlFor={field.name}
					className="block text-sm font-medium text-gray-700 capitalize">
					{field.label}
				</label>
				<div className="mt-1">
					<select
						name={field.name}
						id={field.name}
						autoComplete={field.name}
						className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border h-10 px-4 rounded-md">
						<option selected={true}>select</option>
						{options}
					</select>
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
			<div key={field.name} className="sm:col-span-3 mx-8">
				<label
					htmlFor={field.name}
					className="block text-sm font-medium text-gray-700 capitalize">
					{field.label}
				</label>
				<div className="mt-1">
					<input
						className="dynamic_inputs"
						// onChange={handleChange}
						type="date"
						name={field.label}
						id={field.name}
						autoComplete={field.name}
						value={fieldValue}
						class="px-5 uppercase  focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 border h-10 rounded-md"
					/>
				</div>
			</div>
		);
	}

	return <></>;
};

export { parseFieldSetting };
