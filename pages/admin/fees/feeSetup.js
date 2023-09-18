import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Dropdown } from "primereact/dropdown";
import { PickList } from "primereact/picklist";
import {
  ALL_DEPT_FEE_SETUP,
  ALL_FEE,
  ALL_PROGRAMME,
  GET_ALL_SESSION,
  ALL_LEVEL,
  ALL_PAYMENT_MODE,
  ALL_FEE_TYPE,
} from "@/pages/api/queries/admin";
import { InputText } from "primereact/inputtext";
import { SAVE_FEE_DETAIL } from "@/pages/api/mutations/admin";

export default function feeSetup() {
  const [department, setDepartment] = useState([]);
  const [selectedDept, setSelectedDept] = useState([]);
  const [allfees, setAllFees] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [session, setSession] = useState("");
  const [programme, setProgramme] = useState("");
  const [feeType, setFeeType] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [level, setLevel] = useState("");
  const [feeSetupName, setFeeSetupName] = useState("");

  const [
    allDept,
    { loading: departmentLoad, error: deptError, data: deptData },
  ] = useLazyQuery(ALL_DEPT_FEE_SETUP);

  const [
    schoolFees,
    { loading: allFeeLoad, error: allFeeError, data: allFeeData },
  ] = useLazyQuery(ALL_FEE);

  const {
    loading: loadingProgramme,
    error: error,
    data: programmeList,
  } = useQuery(ALL_PROGRAMME);

  const {
    loading: sessionLoading,
    error: Error,
    data: sessionData,
  } = useQuery(GET_ALL_SESSION);

  const {
    loading: typeLoad,
    error: typeError,
    data: typeData,
  } = useQuery(ALL_FEE_TYPE);

  const {
    loading: paymentModeLoad,
    error: paymentModeError,
    data: paymentModeData,
  } = useQuery(ALL_PAYMENT_MODE);

  const {
    loading: levelLoad,
    error: levelError,
    data: levelData,
  } = useQuery(ALL_LEVEL);

  const [
    SavefeeDetails,
    {
      loading: SavedetailsLoad,
      eeror: SavedetailsError,
      data: SavedetailsData,
    },
  ] = useMutation(SAVE_FEE_DETAIL);

  const sessionList = sessionData?.allSession?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const selectProgramme = programmeList?.allProgramme?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const paymentModeList = paymentModeData?.allPaymentMode?.map((item) => {
    return {
      Name: item.payment_Mode_Name,
      Id: item.id,
    };
  });

  const feeTypeList = typeData?.allFeeType?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const levelList = levelData?.allLevel?.map((item) => {
    return {
      Name: item.name,
      Id: item.id,
    };
  });

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        {/* <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
          alt={item.name}
        /> */}
        <div className=" gap-2">
          <p className="font-bold">
            {item.name}
            <span className="font-bold ml-4">{item.amount}</span>
          </p>
        </div>
        {/* <span className="font-bold text-900">${item.price}</span> */}
      </div>
    );
  };

  const deptFunc = async () => {
    try {
      const deptResponse = await allDept();
      const deptArr = deptResponse?.data?.allDepartment;
      setDepartment(deptArr);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const feeFunc = async () => {
    try {
      const feePayload = await schoolFees();
      const feeArr = feePayload?.data?.allFee;
      setAllFees(feeArr);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    deptFunc();
    feeFunc();
  }, []);

  const onChange = (e) => {
    setDepartment(e.source);
    setSelectedDept(e.target);
  };

  const onSecondChange = (e) => {
    setAllFees(e.source);
    setSelectedFees(e.target);
  };

  const saveFeeDetailsFunc = async () => {
    console.log(
      {
        departmentIds: selectedDept,
        feeTypeId: feeType?.Id,
        fees: selectedFees,
        levelId: level?.Id,
        paymentModeId: paymentMode?.Id,
        programmeId: programme?.Id,
        sessionId: session?.Id,
        name: feeSetupName,
      },
      "Variables$$$$$$$"
    );
    try {
      const details = await SavefeeDetails({
        variables: {
          model: {
            departmentIds: selectedDept,
            feeTypeId: feeType?.Id,
            fees: selectedFees,
            levelId: level?.Id,
            paymentModeId: paymentMode?.Id,
            programmeId: programme?.Id,
            sessionId: session?.Id,
            name: feeSetupName,
          },
        },
      });
      console.log(details, "detailsssss");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setPaymentMode(e.target.value);
    console.log(paymentMode, "consoleeeeee");
  };

  return (
    <div>
      <ToastContainer />
      <div class="row">
        <div className="card">
          <div className="row p-5">
            <div className="col-lg-4 col-sm-12">
              <div className="local-forms form-group">
                <label>
                  Fee Type
                  <span className="login-danger">*</span>
                </label>
                <Dropdown
                  value={feeType}
                  options={feeTypeList}
                  placeholder="select Fee Type"
                  onChange={(e) => setFeeType(e.target.value)}
                  className="w-full md:w-21.5rem"
                  optionLabel="Name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="local-forms form-group">
                <label>
                  Level
                  <span className="login-danger">*</span>
                </label>
                <Dropdown
                  value={level}
                  options={levelList}
                  placeholder="select Level"
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full md:w-21.5rem"
                  optionLabel="Name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="form-group local-forms">
                <label>
                  Session <span className="login-danger">*</span>
                </label>
                <Dropdown
                  value={session}
                  options={sessionList}
                  placeholder="select Session"
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full md:w-21.5rem"
                  optionLabel="Name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="form-group local-forms">
                <label>
                  Programme <span className="login-danger">*</span>
                </label>
                <Dropdown
                  value={programme}
                  options={selectProgramme}
                  placeholder="select Programme"
                  onChange={(e) => setProgramme(e.target.value)}
                  className="w-full md:w-21.5rem"
                  optionLabel="Name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="form-group local-forms">
                <label>
                  Payment Mode <span className="login-danger">*</span>
                </label>
                <Dropdown
                  value={paymentMode}
                  options={paymentModeList}
                  placeholder="select Payment Mode"
                  onChange={(e) => handleChange(e)}
                  className="w-full md:w-21.5rem"
                  optionLabel="Name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="local-forms form-group">
                <label>
                  Fee Setup Name
                  <span className="login-danger">*</span>
                </label>
                <InputText
                  value={feeSetupName}
                  onChange={(e) => setFeeSetupName(e.target.value)}
                  optionLabel="Name"
                  placeholder="Fee Setup Name"
                />
              </div>
            </div>
          </div>
          <div>
            <PickList
              source={allfees}
              target={selectedFees}
              onChange={onSecondChange}
              itemTemplate={itemTemplate}
              breakpoint="1400px"
              sourceHeader="Available Fees"
              targetHeader="Selected Fees"
              sourceStyle={{ height: "30rem" }}
              targetStyle={{ height: "30rem" }}
            />
          </div>
          <div className="mt-5">
            <PickList
              source={department}
              target={selectedDept}
              onChange={onChange}
              itemTemplate={itemTemplate}
              breakpoint="1400px"
              sourceHeader="Available Department"
              targetHeader="Selected Department"
              sourceStyle={{ height: "30rem" }}
              targetStyle={{ height: "30rem" }}
            />
          </div>
          <div className="text-right px-5 w-30">
            <button
              className="btn btn-primary mt-5"
              onClick={() => saveFeeDetailsFunc()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
