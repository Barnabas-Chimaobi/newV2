import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  ADMITTED_RECORD_BY_APPLICATION_FORM_NUMBER,
  ALL_DEPARTMENT,
  ALL_PROGRAMME,
} from "../api/queries/basicQueries";

export default function revokeAdmission() {
  const [formNumber, setFormNumber] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const deleteAdmission = async (id) => {
    const revoke = await disableAdmission({
      variables: {
        disableAdmissionId: data?.admissionListId,
      },
    });
    if (revoke) {
      setShowRevokeAdmissionModal(false);
      admittedRecord();
      // window.location.reload(true);
    }
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
                    <p>
                      Please Note that By Clicking on the OK Button, You are
                      revoking the Admission status of this Student
                    </p>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteAdmission()}
                      >
                        {" "}
                        OK
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
