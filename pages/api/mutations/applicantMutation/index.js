import { gql, useMutation } from "@apollo/client";

export const SUBMIT_APPLICANT_FORM = gql`
	mutation submitApplicationFormNewDto($model: SubmitFormDetailsInput!) {
		submitApplicationFormNewDto(model: $model) {
			id
			formNumber
		}
	}
`;

export const GENERATE_INVOICE = gql`
	mutation GenerateInvoice(
		$personId: Long!
		$levelId: Int!
		$sessionId: Int!
		$feetypeId: Int!
		$paymentMode: Int!
	) {
		generateInvoice(
			personId: $personId
			levelId: $levelId
			sessionId: $sessionId
			feetypeId: $feetypeId
			paymentMode: $paymentMode
		) {
			id
			personId
			paymentTypeId
			paymentModeId
			personTypeId
			feeDetailId
			paymentSerial
			invoiceNumber
			sessionId
			dateGenerated
			isPaid
			datePaid
			paymentGatewayId
			person {
				id
				personTypeId
				biodata {
					name
					key
				}
				passportUrl
			}
			feeDetail {
				id
				feeTypeId
				programmeId
				programme {
					id
					name
					description
					shortName
					activated
					activeForApllication
					slug
				}
				levelId
				level {
					id
					name
					description
				}
				paymentModeId
				departmentId
				department {
					id
					name
					code
					facultyId
					active
					slug
				}
				sessionId
				session {
					id
					name
					startDate
					endDate
					activated
					activeForResult
					activeForAllocation
					activeForApplication
					activeForHostel
					activeForFees
					slug
				}
				fees {
					id
					name
					amount
					description
				}
				active
			}
		}
	}
`;
