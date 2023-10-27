import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import {
  ADMITTED_RECORD_BY_APPLICATION_FORM_NUMBER,
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
} from "../api/queries/basicQueries";
import { CHANGE_PROGRAMME_OR_DEPARTMENT_ADMISSION } from "../api/mutations/adminMutation";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export default function changeDepartment() {
  const [formNumber, setFormNumber] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [visible, setVisible] = useState(false);
  const [department, setDepartment] = useState("");
  const [programme, setProgramme] = useState("");

  const [
    admittedRecordByFormNumber,
    {
      loading: admittedRecordLoading,
      error: admittedRecordError,
      data: admittedRecordData,
    },
  ] = useLazyQuery(ADMITTED_RECORD_BY_APPLICATION_FORM_NUMBER);

  const {
    loading: loadingProgramme,
    error: error,
    data: programmeList,
  } = useQuery(ALL_PROGRAMME);

  const {
    loading: departmentLoading,
    error: eRror,
    data: departmentData,
  } = useQuery(ALL_DEPARTMENT);

  const [
    changeProgrammeOrDepartment,
    { loading: changeLoading, error: changeError, data: changeData },
  ] = useMutation(CHANGE_PROGRAMME_OR_DEPARTMENT_ADMISSION);

  const admittedRecord = async () => {
    try {
      const record = await admittedRecordByFormNumber({
        variables: {
          formNumber: formNumber,
        },
      });
      setShowDetails(true);
      console.log(record, "looooooooooooooooooooookkkkkkk=====");
    } catch (err) {
      //   alert("jhgujfydgsfgdhjkl;");
      toast.error(err.message);
    }
  };

  let data = admittedRecordData?.admittedRecordByApplicationFormNumber;
  console.log(data, "dataaaa");

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const departmentList = departmentData?.allDepartment?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const updateProgDept = async () => {
    const update = await changeProgrammeOrDepartment({
      variables: {
        changeProgrammeOrDepartmentAdmissionId: data?.admissionListId,
        programmeId: programme?.Id,
        departmentId: department?.Id,
      },
    });
    console.log(changeData, "testttt454616");

    if (update) {
      toast.success("Student Department Updated");
      setShowChangeDepartmentModal(false);
    }
    console.log(update, "changeeeeeeeeeeeeeeeeeeeMeeeeeee");
  };

  return (
    <div>
      <div>
        <div className="flex p-3">
          <div>
            <InputText
              value={formNumber}
              placeholder="Application Number"
              onChange={(e) => setFormNumber(e.target.value)}
            />
          </div>
          <div className=" ml-3">
            <button
              className="btn btn-success"
              onClick={() => admittedRecord()}
            >
              View
            </button>
          </div>
        </div>
        <div>
          {showDetails ? (
            <div className="card flex flex-column md:flex-row gap-3 mt-5">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <p className="p-1"> {data?.personName}</p>
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  {/* <i className="pi pi-user"></i> */}
                </span>
                <p className="p-1"> {data?.programmeName}</p>
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  {/* <i className="pi pi-user"></i> */}
                </span>
                <p className="p-1"> {data?.departmentName}</p>
              </div>
              <div className="p-inputgroup flex-1">
                <button
                  className="btn btn-success"
                  onClick={() => setVisible(true)}
                >
                  Change Department
                </button>

                <Dialog
                  header="Change Department"
                  visible={visible}
                  style={{ width: "50vw" }}
                  onHide={() => setVisible(false)}
                >
                  <div className="m-0">
                    <div className="flex gap-3">
                      <Dropdown
                        value={department}
                        options={departmentList}
                        placeholder="Select Department"
                        onClick={(e) => setDepartment(e.target.value)}
                        className="w-full md:w-21.5rem"
                        optionLabel="Name"
                      />

                      <Dropdown
                        value={programme}
                        options={selectProgramme}
                        placeholder="Select Programme"
                        onClick={(e) => setProgramme(e.target.value)}
                        className="w-full md:w-21.5rem"
                        optionLabel="Name"
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateProgDept()}
                      >
                        {" "}
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
