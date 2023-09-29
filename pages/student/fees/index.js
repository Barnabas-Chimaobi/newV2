import React, { useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { EXPECTED_FEES } from "@/pages/api/queries/applicant";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GENERATE_INVOICE } from "@/pages/api/mutations/applicant";
import { useRouter } from "next/router";
import Encrypt from "../../../components/encrypt";

function index() {
	const router = useRouter();
	const {
		loading: loadingFees,
		error: error,
		data: feeList,
	} = useQuery(EXPECTED_FEES);
	const [invoice, { data: invoiceData, loading: invoiceLoading }] =
		useMutation(GENERATE_INVOICE);

	// const getFees = async () => {
	// 	const fee = await fees();
	// 	console.log(fee, "feessss=======");
	// };

	console.log(feeList, "list====");

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
			router.push(
				`../../common/invoice/  ${Encrypt(
					generate?.data?.generateInvoice?.invoiceNumber
				)}`
			);
		}
		// console.log(generate.data, "jhgfxfghjkl;=====");
	};

	useEffect(() => {
		// getFees();
	}, []);

	return (
		<div>
			<div className="page-wrapper">
				<div className="content container-fluid">
					<p className="customer-text-one">Student's Fees</p>
					<div class="row">
						<div class="col-sm-12">
							<div class="card card-table">
								<div class="card-body">
									{feeList?.allStudentExpectedFees?.map((item) => {
										console.log(item);
										return (
											<Accordion activeIndex={0}>
												<AccordionTab
													className="invoice-details invoice-details-two"
													headerStyle={{}}
													header={item.level.name}>
													{item.listOfFees?.map((item) => {
														console.log(item?.payment?.feeDetail?.fees);
														return item?.payment?.feeDetail?.fees[0]?.name ===
															"" ? null : (
															<div className="d-flex flex-row justify-content-between m-3">
																<p className="m-0">
																	{item?.payment?.feeDetail?.fees[0]?.name}
																</p>
																<button
																	onClick={() =>
																		generateInvoice(item?.payment, item.feeType)
																	}
																	type="button"
																	class="btn btn-primary">
																	Generate Invoice
																</button>
															</div>
														);
													})}
												</AccordionTab>
											</Accordion>
										);
									})}
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
