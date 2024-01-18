import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { EXPECTED_FEES } from "@/pages/api/queries/applicant";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GENERATE_INVOICE } from "@/pages/api/mutations/applicant";
import { useRouter } from "next/router";
import Encrypt from "../../../components/encrypt";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import {
  ALL_FEE_TYPE,
  ALL_LEVEL,
  ALL_PAYMENT_MODE,
  GET_ALL_SESSION,
} from "@/pages/api/queries/basicQueries";
// import { toast, ToastContainer } from "react-toastify";

function index() {
  const toast = useRef(null);
  const router = useRouter();
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const {
    loading: loadingFees,
    error: error,
    data: feeList,
  } = useQuery(EXPECTED_FEES);
  const [invoice, { data: invoiceData, loading: invoiceLoading }] =
    useMutation(GENERATE_INVOICE);
  const { data: feeData, loading: feeLoading } = useQuery(ALL_FEE_TYPE);
  const { data: levelData, loading: levelLoading } = useQuery(ALL_LEVEL);
  const { data: modeData, loading: modeLoading } = useQuery(ALL_PAYMENT_MODE);
  const { data: sessionData, loading: sessionLoading } =
    useQuery(GET_ALL_SESSION);
  const [feeType, setFeeType] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [session, setSession] = useState("");

  const handleChange = (name, value) => {
    console.log(value, "name====");
    switch (name) {
      case "feetype":
        setFeeType(value);
        break;
      case "mode":
        setMode(value);
        break;
      case "level":
        setLevel(value);
        break;
      case "session":
        setSession(value);
        break;
      default:
        break;
    }
  };

  console.log(feeData, levelData, modeData, sessionData, "list====");

  const generateInvoice = async (item, item2) => {
    console.log(item, "item===sss===");
    const generate = await invoice({
      variables: {
        personId: item.personId,
        levelId: item.feeDetail.levelId,
        sessionId: item.feeDetail.sessionId,
        feetypeId: item2.id,
        paymentMode: item.paymentModeId,
      },
    });
    if (generate.data) {
      let newUrl = `../../common/invoice/ ${Encrypt(
        generate?.data?.generateInvoice?.invoiceNumber
      )}`;

      window.open(newUrl, "_blank");
    }
  };

  const generateOtherInvoice = async (item) => {
    try {
      if (level.id && session.id && feeType.id && mode.code != undefined) {
        const generate = await invoice({
          variables: {
            personId: item[0].payment.personId,
            levelId: level.id,
            sessionId: session.id,
            feetypeId: feeType.id,
            paymentMode: mode.code,
          },
        });
        if (generate.data) {
          let newUrl = `../../common/invoice/ ${Encrypt(
            generate?.data?.generateInvoice?.invoiceNumber
          )}`;
          window.open(newUrl, "_blank");
        }
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
      // alert(err.message);
    }
  };

  useEffect(() => {
    // getFees();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <p className="customer-text-one">Student's Fees</p>
          <div class="row">
            <div class="col-sm-12">
              <div class="card card-table">
                <div class="card-body">
                  <Accordion activeIndex={0}>
                    {feeList?.allStudentExpectedFees?.map((item, index) => {
                      return (
                        <AccordionTab
                          className="invoice-details invoice-details-two"
                          headerStyle={{}}
                          header={item.level.name}>
                          <div className="d-block d-md-flex d-lg-flex gap-2">
                            <div className="col-sm card shadow">
                              {item.listOfFees?.map((item) => {
                                console.log(item?.payment?.feeDetail?.fees);
                                return item?.payment?.feeDetail?.fees[0]
                                  ?.name === "" ? null : (
                                  <div className="d-flex flex-row justify-content-between m-3">
                                    <p className="m-0">
                                      {item?.payment?.feeDetail?.fees[0]?.name}
                                    </p>
                                    <button
                                      onClick={() =>
                                        generateInvoice(
                                          item?.payment,
                                          item.feeType
                                        )
                                      }
                                      type="button"
                                      class="btn btn-primary">
                                      Generate Invoice
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="card p-3 col-sm ml-0 mr-0 ml-lg-8 ml-md-8 flex justify-content-center">
                              <p className=" font-bold">Other Fees </p>
                              <Dropdown
                                // id={field.name}
                                value={feeType}
                                className="mt-2"
                                optionLabel="name"
                                placeholder="Select Fee Type"
                                options={feeData?.allFeeType}
                                // focusInputRef={field.ref}
                                onChange={(e) =>
                                  handleChange("feetype", e.value)
                                }
                              />
                              <Dropdown
                                value={mode}
                                className="mt-2"
                                optionLabel="name"
                                placeholder="Select Payment Mode"
                                options={modeData?.allPaymentMode?.map(
                                  (item) => {
                                    return {
                                      name: item.payment_Mode_Name,
                                      code: item.id,
                                    };
                                  }
                                )}
                                onChange={(e) => handleChange("mode", e.value)}
                              />
                              <Dropdown
                                // id={field.name}
                                value={level}
                                optionLabel="name"
                                placeholder="Select Level"
                                options={levelData?.allLevel}
                                // focusInputRef={field.ref}
                                // onChange={(e) => field.onChange(e.value)}
                                className="mt-3"
                                onChange={(e) => handleChange("level", e.value)}
                              />
                              <Dropdown
                                // id={field.name}
                                value={session}
                                optionLabel="name"
                                placeholder="Select Session"
                                options={sessionData?.allSession}
                                // focusInputRef={field.ref}
                                // onChange={(e) => field.onChange(e.value)}
                                className="mt-3"
                                onChange={(e) =>
                                  handleChange("session", e.value)
                                }
                              />
                              <div class="d-flex align-content-center mt-5">
                                <Button
                                  onClick={() =>
                                    generateOtherInvoice(item.listOfFees)
                                  }
                                  type="submit"
                                  label="Submit"
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionTab>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
