import { Toolbar } from "primereact/toolbar";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
// import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { SAVE_FACULTY } from "../pages/api/mutations/admin";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Constant } from "../constant";
import { Chip } from "primereact/chip";
import Decrypt from "./decrypt";
import Encrypt from "./encrypt";
import Link from "next/link";
import { PREVIEW } from "../pages/api/queries/basicQueries";
import Form from "@/components/formPreview";

export default function GenericTable({
	headers,
	generateColumnTemplates,
	tableName,
	allowEdit,
	allowApply,
	tableObjectBody,
	showExport,
	exportPdf,
	showAddButton,
	variablesForQuery,
	tableContent,
	saveFunc,
	deleteFunc,
	editFunc,
	dropDownObjects,
	showInvoiceButton,
	fillApplicationForm,
	showCheckBox,
	showAdmitButton,
	showManageButton,
	showOnlyDeleteButton,
	allowPreview,
	showAddPages,
	applyForm,
	saveAdmission,
	admissionType,
	isAdmission,
	passValue,
	refetch,
}) {
	const router = useRouter();

	useEffect(() => {
		setContent(tableContent);
	});

	let emptyProduct = tableObjectBody;
	const toolbarStyle = {
		backgroundColor: "white",
		border: "none",
		// Add any other CSS properties you need
	};

	const dataTableStyle = {
		backgroundColor: "white",
		// Add any other CSS properties you need
	};
	const [selectedProducts, setSelectedProducts] = useState([]);
	const toast = useRef(null);
	const dt = useRef(null);
	const [globalFilter, setGlobalFilter] = useState(null);
	const [products, setProducts] = useState(null);
	const [productDialog, setProductDialog] = useState(false);
	const [deleteProductDialog, setDeleteProductDialog] = useState(false);
	const [applyFormDialog, setApplyFormDialog] = useState(false);
	const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
	const [product, setProduct] = useState(tableObjectBody);
	const [productObj, setproductObj] = useState(dropDownObjects);
	const [submitted, setSubmitted] = useState(false);
	// console.log(selectedProducts, "selected products");
	const [content, setContent] = useState([]);
	const [checked, setChecked] = useState(false);
	const [formObj, setFormObj] = useState({});
	const [preview, setPreview] = useState(false);
	const [formHeader, setFormHeader] = useState("");
	const [formId, setFormId] = useState("");
	const [
		saveFaculty,
		{ loading: facultyLoad, error: facultyError, data: facultyData },
	] = useMutation(SAVE_FACULTY);

	const [
		lazyLoadPreview,
		{ loading: previewLoad, error: previewError, data: previewData },
	] = useLazyQuery(PREVIEW);

	const handlePreview = async (data) => {
		// console.log(data, "data=====");
		setFormHeader(data);
		try {
			try {
				const payload = {
					programmeId: parseInt(data.programmeId),
					sessionId: parseInt(data.sessionId),
				};
				let response = await lazyLoadPreview({ variables: payload });
				// console.log(response, payload, "response");
				setFormObj(response.data.preview);
				if (response != undefined) {
					setPreview(true);
				}
			} catch (err) {
				// toast.error(err.message);
			}
		} catch (err) {
			// toast.error(err.message);
		}
	};

	const formatCurrency = (value) => {
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};
	const testHand = (e) => {
		setSelectedProducts(e);
		// checkFunction();
	};
	const handleReloadPage = () => {
		router.reload(); // This reloads the current page
	};

	const RenderInputs = () => {
		//console.log(productObj, "Drop down List");
		return Object.keys(product).map((fieldName) => {
			// console.log(fieldName, "ppppppppp");
			if (fieldName === "id") {
				// console.log(fieldName, "changing id values");
				// if (e.target.value !== null && e.target.value > 0) {
				//   onSaveValueChange(fieldName, e.target.value);
				// }
			} else {
				const dropDownObject = productObj?.find(
					(obj) => obj.Name === fieldName
				);

				//  console.log(dropDownObject, "drop down object")
				if (!dropDownObject) {
					// Handle the case where there's no corresponding definition in DropDownObjects
					return null;
				}

				if (dropDownObject.Type === "Dropdown") {
					// Render a dropdown component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<Dropdown
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.value)}
								options={dropDownObject?.List}
								optionLabel="Name"
								placeholder={"Select " + fieldName}
								className="w-full md:w-21.5rem"
							/>
						</div>
					);
				} else if (dropDownObject.Type === "Switch") {
					return (
						<div key={fieldName} className="field">
							<div className="flex items-center">
								<label htmlFor={fieldName} className="font-bold">
									{toSentenceCase(fieldName)}
								</label>

								<InputSwitch
									checked={product[fieldName]}
									onChange={(e) => onSaveValueChange(fieldName, e.target.value)}
									className="ml-2"
								/>
							</div>
						</div>
					);
				} else if (dropDownObject.Type === "Text") {
					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<InputText
								id={fieldName}
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.target.value)}
							/>
						</div>
					);
				} else if (dropDownObject.Type === "Number") {
					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<InputNumber
								id={fieldName}
								value={product[fieldName]}
								onValueChange={(e) => onSaveValueChange(fieldName, e.value)}
							/>
						</div>
					);
				} else if (dropDownObject.Type === "TextArea") {
					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<InputTextarea
								id={fieldName}
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.target.value)}
								rows={5}
								cols={30}
							/>
						</div>
					);
				} else if (dropDownObject.Type === "Date") {
					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<Calendar
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.value)}
							/>
						</div>
					);
				} else if (dropDownObject.Type === "Time") {
					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<Calendar
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.value)}
								showTime
								hourFormat="12"
							/>
						</div>
					);
				} else if (dropDownObject.Type === "Day") {
					const today = new Date();
					const minDay = new Date(today);
					minDay.setDate(today.getDate() - today.getDay()); // Sunday
					const maxDay = new Date(today);
					maxDay.setDate(today.getDate() + (6 - today.getDay())); // Saturday

					// Render a text input component
					return (
						<div key={fieldName} className="field">
							<label htmlFor={fieldName} className="font-bold">
								{toSentenceCase(fieldName)}
							</label>
							<Calendar
								value={product[fieldName]}
								onChange={(e) => onSaveValueChange(fieldName, e.value)}
								minDate={minDay}
								maxDate={maxDay}
							/>
						</div>
					);
				}
			}
			return null;
		});
	};

	const openNew = () => {
		setProduct(emptyProduct);
		setSubmitted(false);
		setProductDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setProductDialog(false);
	};
	const handleCheck = (e) => {
		console.log(e);
	};
	const hideDeleteProductDialog = () => {
		setDeleteProductDialog(false);
	};

	const hideApplyFormDialog = () => {
		setApplyFormDialog(false);
	};

	const hideDeleteProductsDialog = () => {
		setDeleteProductsDialog(false);
	};
	const onSaveValueChange = (fieldName, value) => {
		setProduct((prevState) => ({
			...prevState,
			[fieldName]: value,
		}));
	};
	const saveProduct = () => {
		// console.log(product, "Test edit values");
		setSubmitted(true);

		var status = false;
		if (product.Id === null || product.Id === "") {
			status = saveFunc(product, formId);
			// console.log(status, "tableeeeeeee save");
			toast.current.show({
				severity: "success",
				summary: "Successful",
				detail: "Item Created",
				life: 3000,
			});
			setProductDialog(false);
		} else {
			status = editFunc(product);
			toast.current.show({
				severity: "success",
				summary: "Successful",
				detail: "Item Created",
				life: 3000,
			});
			setProductDialog(false);
		}
	};

	const editProduct = (product) => {
		setProduct({ ...product });
		setProductDialog(true);
	};

	const confirmDeleteProduct = (product) => {
		setProduct(product);
		setDeleteProductDialog(true);
	};

	const deleteProduct = () => {
		var status = deleteFunc(product);

		console.log(status, "statussss");
		toast.current.show({
			severity: "success",
			summary: "Successful",
			detail: "Item Deleted",
			life: 3000,
		});
		setDeleteProductDialog(false);
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

	const deleteSelectedProducts = () => {
		console.log(products);

		toast.current.show({
			severity: "success",
			summary: "Successful",
			detail: "Products Deleted",
			life: 3000,
		});
	};
	const admitSelectedProducts = () => {
		console.log(products);
		if (selectedProducts.length > 0) {
			saveFunc(selectedProducts);
		} else {
			saveFunc(products);
		}
		toast.current.show({
			severity: "success",
			summary: "Successful",
			detail: "Saved",
			life: 3000,
		});
	};

	const onCategoryChange = (e) => {
		let _product = { ...product };

		_product["category"] = e.value;
		setProduct(_product);
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

	const priceBodyTemplate = (rowData) => {
		return formatCurrency(rowData.price);
	};

	const ratingBodyTemplate = (rowData) => {
		return <Rating value={rowData.rating} readOnly cancel={false} />;
	};

	const statusBodyTemplate = (rowData) => {
		return (
			<Tag
				value={rowData.inventoryStatus}
				severity={getSeverity(rowData)}></Tag>
		);
	};

	const header = (
		<div className="flex flex-wrap gap-2 align-items-center justify-content-between">
			<h4 className="m-0">Manage {tableName}</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					type="search"
					onInput={(e) => setGlobalFilter(e.target.value)}
					placeholder="Search..."
				/>
			</span>
		</div>
	);

	const productDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" onClick={saveProduct} />
		</React.Fragment>
	);
	const deleteProductDialogFooter = (
		<React.Fragment>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteProductDialog}
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				severity="danger"
				onClick={deleteProduct}
			/>
		</React.Fragment>
	);
	const deleteProductsDialogFooter = (
		<React.Fragment>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteProductsDialog}
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				severity="danger"
				onClick={deleteSelectedProducts}
			/>
		</React.Fragment>
	);

	const exportCSV = () => {
		dt.current.exportCSV();
	};

	const leftToolbarTemplate = () => {
		return (
			<div className="flex flex-wrap gap-2">
				{allowApply ? (
					<Button
						label="Print Invoice"
						icon="pi pi-plus"
						className="btn btn-outline-primary me-2"
						onClick={openNew}
					/>
				) : (
					<></>
				)}
				{showAddButton ? (
					<Button
						label="New"
						icon="pi pi-plus"
						severity="success"
						onClick={openNew}
					/>
				) : (
					<></>
				)}
				{showExport ? (
					<Button
						label="Export"
						icon="pi pi-upload"
						className="btn btn-outline-primary me-2"
						onClick={exportCSV}
					/>
				) : (
					<></>
				)}
				{exportPdf ? (
					<Link>
						<Button
							label="PDF"
							icon="pi-file"
							className="btn btn-outline-primary me-2"
						/>
					</Link>
				) : (
					<></>
				)}
				{showAdmitButton ? (
					<Button
						label="Admit"
						icon="pi pi-upload"
						className="btn btn-outline-primary me-2"
						onClick={admitSelectedProducts}
					/>
				) : (
					<></>
				)}
				{showAddPages ? (
					<Button
						label="Start Form"
						icon="pi pi-arrow-up-right"
						className="btn btn-outline-primary me-2"
						onClick={() => {
							router.push("/admin/manageform/newIndex");
							// const url = Constant.BASE_URL + `/admin/manageform/newIndex`;
							// window.open(url, "_blank");
						}}
					/>
				) : (
					<></>
				)}
			</div>
		);
	};

	const rightToolbarTemplate = () => {
		return "";
	};

	const actionBodyTemplate = (rowData) => {
		// console.log(rowData, "rowdata=====");
		if (showOnlyDeleteButton) {
			return (
				<React.Fragment>
					<Button
						icon="pi pi-trash"
						rounded
						outlined
						severity="danger"
						className="ml-2"
						onClick={() => confirmDeleteProduct(rowData)}
					/>
				</React.Fragment>
			);
		}
		if (showManageButton) {
			return (
				<React.Fragment>
					<Button
						label="Manage"
						rounded
						outlined
						severity="outline-primary"
						onClick={() => {
							const url =
								Constant.BASE_URL +
								`/admin/programme/manageprogramme/` +
								rowData?.Id;
							window.open(url, "_blank");
						}}
					/>
					<Button
						icon="pi pi-trash"
						rounded
						outlined
						severity="danger"
						className="ml-2"
						onClick={() => confirmDeleteProduct(rowData)}
					/>
				</React.Fragment>
			);
		}

		if (allowEdit) {
			return (
				<React.Fragment>
					{allowPreview ? (
						<Button
							label="Preview"
							// icon="pi pi-trash"
							rounded
							outlined
							// severity="danger"
							onClick={() => handlePreview(rowData)}
							className="mr-2"
						/>
					) : null}
					{applyForm ? (
						<React.Fragment>
							<Button
								label="Apply Form"
								className="mr-2"
								rounded
								outlined
								severity="outline-primary"
								onClick={() => {
									setFormId(rowData);
									// passValue(rowData);
									//   console.log(rowData, "jhgfdsfghjkl;d====dsta======");
									setProductDialog(true);
								}}
							/>
							<Dialog
								visible={productDialog}
								style={{ width: "32rem" }}
								breakpoints={{ "960px": "75vw", "641px": "90vw" }}
								header="Details"
								modal
								className="p-fluid"
								footer={productDialogFooter}
								onHide={hideDialog}>
								{RenderInputs()}
							</Dialog>
						</React.Fragment>
					) : null}
					<Button
						icon="pi pi-pencil"
						rounded
						outlined
						className="mr-2"
						onClick={() => editProduct(rowData)}
					/>
					<Button
						icon="pi pi-trash"
						rounded
						outlined
						severity="danger"
						onClick={() => confirmDeleteProduct(rowData)}
					/>
				</React.Fragment>
			);
		}

		if (showInvoiceButton && rowData?.Status === 1) {
			return (
				<React.Fragment>
					<Button
						label="Print Invoice"
						rounded
						outlined
						severity="outline-primary"
						onClick={() => {
							const url =
								Constant.BASE_URL +
								`/common/invoice/` +
								Encrypt(rowData?.InvoiceNumber);
							window.open(url, "_blank");
						}}
					/>
					<Button
						label="Print Receipt"
						rounded
						outlined
						severity="outline-success"
						onClick={() => {
							const url =
								Constant.BASE_URL +
								`/common/receipt/` +
								Encrypt(rowData?.InvoiceNumber);
							window.open(url, "_blank"),
								setTimeout(() => {
									refetch();
								}, 5000);
						}}
					/>
				</React.Fragment>
			);
		}

		if (fillApplicationForm && rowData?.Status > 1) {
			return (
				<React.Fragment>
					<Button
						label="Fill Form"
						rounded
						outlined
						severity="outline-success"
						onClick={() => {
							const url =
								Constant.BASE_URL +
								`/applicant/fillform/` +
								rowData?.InvoiceNumber;
							window.open(url, "_blank");
						}}
					/>
					{rowData?.IsAdmitted ? (
						<Button
							label="Access Admission"
							rounded
							outlined
							severity="outline-success"
							onClick={() => {
								const url =
									Constant.BASE_URL +
									`/applicant/admittedstudent/` +
									rowData?.Id;
								window.open(url, "_blank");
							}}
						/>
					) : (
						<>
							<div className="ml-3">
								<Chip label="No Admission Offered" />
							</div>
						</>
					)}
				</React.Fragment>
			);
		}
	};

	const toSentenceCase = (inputString) => {
		if (typeof inputString !== "string") {
			throw new Error("Input must be a string");
		}
		return (
			inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
		);
	};

	return (
		<div className="p-3">
			<Toast ref={toast} />
			<div className="card" style={dataTableStyle}>
				{allowApply || showExport || showAddButton || showAdmitButton ? (
					<Toolbar
						className="p-1 mb-3"
						left={rightToolbarTemplate}
						right={leftToolbarTemplate}
						style={toolbarStyle}></Toolbar>
				) : (
					<></>
				)}
				<Dialog
					onHide={() => setPreview(false)}
					header={`${formHeader.sessionName} ${formHeader.programmeName}`}
					visible={preview}
					style={{ width: "70vw", marginTop: 40 }}>
					<Form data={formObj} isPreview={preview} />
				</Dialog>
				<DataTable
					style={dataTableStyle}
					ref={dt}
					value={content}
					selection={selectedProducts}
					onSelectionChange={(e) => testHand(e.value)}
					dataKey="Id"
					paginator
					rows={10}
					rowsPerPageOptions={[5, 10, 25]}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					currentPageReportTemplate={
						`Showing {first} to {last} of {totalRecords} ` + tableName
					}
					globalFilter={globalFilter}
					header={header}>
					<Column
						selectionMode="multiple"
						exportable={false}
						style={showCheckBox ? null : { display: "none" }}></Column>

					<Column field="Id" header="Id" style={{ display: "none" }} />
					<Column exportable={false} style={dataTableStyle}></Column>
					{generateColumnTemplates(headers)}
					<Column
						body={actionBodyTemplate}
						exportable={false}
						style={{ minWidth: "12rem", backgroundColor: "white" }}></Column>
				</DataTable>
			</div>

			<Dialog
				visible={productDialog}
				style={{ width: "32rem" }}
				breakpoints={{ "960px": "75vw", "641px": "90vw" }}
				header="Details"
				modal
				className="p-fluid"
				footer={productDialogFooter}
				onHide={hideDialog}>
				{RenderInputs()}
			</Dialog>

			<Dialog
				visible={deleteProductDialog}
				style={{ width: "32rem" }}
				breakpoints={{ "960px": "75vw", "641px": "90vw" }}
				header="Confirm"
				modal
				footer={deleteProductDialogFooter}
				onHide={hideDeleteProductDialog}>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: "2rem" }}
					/>
					{product && (
						<span>
							Are you sure you want to delete{" "}
							<b>
								{Object.keys(product).map((field) =>
									field !== "Id" ? (
										<div key={field} className="field">
											<label htmlFor={field} className="font-bold">
												{toSentenceCase(field)} : {product[field]}
											</label>
										</div>
									) : (
										<></>
									)
								)}
							</b>
						</span>
					)}
				</div>
			</Dialog>
		</div>
	);
}
