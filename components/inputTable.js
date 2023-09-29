import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// import { ProductService } from './service/ProductService';

export default function RowEditingDemo({
  Data,
  triggerFunc,
  showDialog,
  dialogToggleFunc,
}) {
  const [products, setProducts] = useState(null);
  const [promptWindow, setPromptWindow] = useState(showDialog);
  const [checkSelections, setSelectionCheck] = useState([]);
  const [statuses, setstatuses] = useState([
    "COMPULSORY",
    "ELECTIVE",
    "REQUIRED",
    "GENERAL STUDIES",
    "CORE",
    "RESTRICTIVE",
    "PRINCIPAL",
  ]);

  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    Id: "",
    CourseName: "",
    CourseUnit: "",
    CourseType: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  const triggerDialog = () => {};
  useEffect(() => {
    console.log(Data, "77777777777777777777777777");
    setProducts(Data);
  }, []);

  function resolveCourseType(data) {
    switch (data) {
      case "COMPULSORY":
        return 1;
      case "ELECTIVE":
        return 2;
      case "REQUIRED":
        return 3;
      case "GENERAL STUDIES":
        return 4;
      case "CORE":
        return 5;
      case "RESTRICTIVE":
        return 6;
      case "PRINCIPAL":
        return 7;
      default:
        return 0;
    }
  }
  const onRowEditComplete = (e, setSelectionCheck) => {
    let newdata = e.newData;

    if (newdata?.CourseUnit == "" || newdata?.CourseType == "") return;

    let incomingData = {
      courseid: newdata.Id,
      courseunit: parseInt(newdata.CourseUnit),
      coursetype: resolveCourseType(newdata.CourseType),
    };
    let doesExist = selectedProducts.some((x) => x.courseid == newdata.Id);

    if (doesExist) {
      let filter = selectedProducts.filter((x) => x.courseid != newdata.Id);
      setSelectedProducts(filter);
      setSelectedProducts([...filter, incomingData]);
      return;
    }
    setSelectionCheck([...checkSelections, newdata]);
    setSelectedProducts([...selectedProducts, incomingData]);
    console.log(selectedProducts);
  };

  const handleCheckSelection = (selectedValues, setSelectionCheck) => {
    setSelectionCheck(selectedValues);
  };
  const confirmBtn = () => {
    setPromptWindow(false);
  };
  const transferSelectedItems = () => {
    triggerFunc(selectedProducts);
  };

  const toggleDialog = () => {
    dialogToggleFunc();
  };
  const confirmPrompt = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={() => toggleDialog()}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => transferSelectedItems()}
      />
    </React.Fragment>
  );

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const statusEditor = (options) => {
    return (
      <>
        <Dropdown
          value={options.value}
          options={statuses}
          // optionLabel="Name"
          onChange={(e) => options.editorCallback(e.value)}
          placeholder="Select Course Type"
          //   itemTemplate={(option) => {
          //     return <Tag value={option} severity={getSeverity(option)}></Tag>;
          //   }}
        />
      </>
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rowData.price);
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
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
  return (
    <div className="card p-fluid">
      {statuses?.length === 0 ? (
        <></>
      ) : (
        <DataTable
          value={products}
          editMode="row"
          dataKey="Id"
          onRowEditComplete={(e) => onRowEditComplete(e, setSelectionCheck)}
          tableStyle={{ minWidth: "50rem" }}
          selection={checkSelections}
          onSelectionChange={(e) =>
            handleCheckSelection(e.value, setSelectionCheck)
          }
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="Id" header="Id" style={{ display: "none" }} />
          <Column
            field="CourseName"
            header="CourseName"
            // editor={(options) => textEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="CourseUnit"
            header="Course Unit"
            editor={(options) => textEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="CourseType"
            header="Course Type"
            editor={(options) => statusEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      )}
      <Dialog
        visible={showDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={confirmPrompt}
        onHide={() => setPromptWindow(false)}
      >
        <div className="confirmation-content">
          <p>Do you want to continue?</p>
          {/* <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }} */}

          {/* {product && (
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
          )} */}
        </div>
      </Dialog>
    </div>
  );
}
