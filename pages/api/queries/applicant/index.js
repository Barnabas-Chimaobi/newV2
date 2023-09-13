import { gql, useQuery, useLazyQuery } from "@apollo/client";

export const GET_ALL_Forms = gql`
	query allDepartment {
		allDepartment {
			active
			code
			faculty {
				id
				name
			}
			name
			id
			slug
		}
	}
`;
export const ACKNOWLEDGEMENTPAGE = gql`
	query AcknowledgementPage($applicationformid: Long!) {
		acknowledgementPage(applicationformid: $applicationformid) {
			applicationFormId
			applicationFormNumber
			contactAddress
			departmentName
			email
			examNumber
			fullName
			lGA
			phone
			programmeName
			nextOfKinfullname
			nextOfKinRelationship
			nextOfKinPhoneNumber
			nextOfKinContactAddress
			relationship
			stateOfOrigin
			olevelResultCombination {
				olevelResultCombinationDetails {
					subject
					grade
				}
				examNumber
				olevelType
			}
			person {
				passportUrl
			}
		}
	}
`;
export const APPLICANT_FORM_BY_PERSONID = gql`
	query applicantForm($invoicenumber: String!) {
		applicantForm(invoicenumber: $invoicenumber) {
			mainPages {
				pageId
				pageName
				programmeId
				programmeName
				sessionId
				sessionName
				sections {
					sectionId
					sectionName
					fieldDetails {
						id
						input_type
						label
						list
						required
						response
						errorMessage
						dynamicFormPageSectionSetupId
						isReadonly
					}
				}
			}
			submitOlevelResult {
				examNumber
				examYear
				olevelType
				centerName
				examCode
				sitting
				olevelResultsDto {
					subject
					grade
				}
			}
			personId
			personUrl
		}
	}
`;

export const GET_INVOICE = gql`
	query invoice($invoicenumber: String!) {
		invoice(invoicenumber: $invoicenumber) {
			dateGenerated
			datePaid
			feeDetail {
				department {
					name
					id
				}
				programme {
					name
					id
				}
				session {
					name
					id
				}
				level {
					name
					id
				}
				fees {
					id
					name
					description
					amount
				}
			}
			feeDetailId
			id
			invoiceNumber
			isPaid
			paymentGatewayId
			paymentModeId
			paymentSerial
			paymentType: paymentTypeId
			person {
				id
				biodata {
					name
					key
				}
			}
			personId
			sessionId
			total
			total
			examNumber
			fullName
			phone
			email
			stateOfOrigin
			lGA
			programmeName
			departmentName
			nextOfKin
			relationship
			contactAddress
			paystackRedirectUrl
		}
	}
`;

export const GET_SLIP = gql`
 query abiityById ($id: Int!, $examNumber: String!){
     abilityById(id: $id, examNumber: $examNumber) {
        id,
        applicationNumberPrefix,
        programmeId,
     }
 }
`

export const VALIDATE_EMAIL = gql`
query ValidateEmail($email: String!) {
	validateEmail(email: $email) {
	  person {
		email
		firstName
		otherName
		lastName
		phoneNumber
		state
		nationality
	  }
	  isVerified
	  message
	}
  }
`
export const GET_NATIONALITY = gql`
query Query {
  nationality
}`;
export const GET_STATE_BY_COUNTRY = gql`
query StateByCountry($country: String!) {
  stateByCountry(country: $country) {
    name
    id
    nationality
  }
}`
	;
export const PREVIOUS_APPLICATIONS = gql`query AllApplications($email: String!) {
  allApplications(email: $email) {
    sessionName
    departmentName
    programmeName
    status
    invoiceNumber
  }
}`;
export const PROGRAMME_ON_SALE_DROP_DOWN = gql`query AllProgrammeOnSale {
  allProgrammeOnSale {
    id
    name
  }
}`;
export const DEPARTMENT_DROP_DOWN = gql`query DepartmentByProgramme($programmeId: Int!) {
  departmentByProgramme(programmeId: $programmeId) {
    id
    name
  }
}`;
export const FEE_AMOUNT_FORM = gql`query Query($programmeId: Int!, $departmentId: Int!) {
  amountForProgrammeDept(programmeId: $programmeId, departmentId: $departmentId)
}`;
export const DEPARTMENT_OPTION_DROP_DOWN = gql`query AllProgrammeDepartmentOptionByProgrammeAndDepartment($departmentid: Int!, $programmeid: Int!) {
  allProgrammeDepartmentOptionByProgrammeAndDepartment(departmentid: $departmentid, programmeid: $programmeid) {
    departmentOption {
      id
      name
    }
  }
}`;
export const GENERATE_APPLICATION_FORM_INVOICE = gql`mutation GenerateApplicationInvoice($programmeId: Int!, $departmentId: Int!, $formtypeid: Int!, $personid: Int!, $departmentOptions: Int) {
  generateApplicationInvoice(programmeId: $programmeId, departmentId: $departmentId, formtypeid: $formtypeid, personid: $personid, departmentOptions: $departmentOptions)
}`;


export const CHECK_ADMISSION_STATUS = gql`query CheckAdmissionStatus($applicationformnumber: String!) {
  checkAdmissionStatus(applicationformnumber: $applicationformnumber) {
    applicantStatus
    applicantStatusId
    applicationFormNumber
    courseOfStudy
    courseOption
    faculty
    fullName
    matricNumber
    payments {
      invoiceNumber
      id
      feeDetail {
        feeType {
          name
          id
        }
      }
    }
    programmeName
    session
    status
    applicationForm {
      applicationFormFullResponse {
        submitOlevelResult {
          centerName
          examCode
          examNumber
          examYear
          olevelType
          sitting
          olevelResultsDto {
            grade
            subject
          }
        }
      }
	  applicantAppliedCourse {
        personId
      }
    }
  }
}`;
export const OLEVEL_GRADE = gql`query GellAllOLevelGrade {
  gellAllOLevelGrade {
    name
  }
}`;
export const OLEVEL_SUBJECT = gql`query GellAllOLevelSubject {
  gellAllOLevelSubject {

    name
  }
}`;
export const OLEVEL_TYPE = gql`query GellAllOLevelType {
  gellAllOLevelType {
    name
    id
  }
}`;
export const ADMISSION_LETTER = gql`query AdmissionLetterDetails($applicationformnumber: String!) {
  admissionLetterDetails(applicationformnumber: $applicationformnumber) {
    applicantStatusId
    departmentName
    facultyName
    fullName
    passportUrl
    programmeName
    registrarName
    session
    applicantStatus
  }
}`;