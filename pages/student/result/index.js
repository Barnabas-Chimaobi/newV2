import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { STUDENT_COURSE_REG } from "@/pages/api/queries/basicQueries";

export default function index() {
	const [courses, setcourses] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const [selectedProducts, setSelectedProducts] = useState(null);
	const [sessionId, setsessionId] = useState("");
	const [semesterId, setsemesterId] = useState("");
	const [allData, setallData] = useState("");

	const [
		CourseRegDetails,
		{
			loading: CourseRegDetailsLoad,
			error: CourseRegDetailsError,
			data: CourseRegDetailsData,
		},
	] = useLazyQuery(STUDENT_COURSE_REG);

	const PullData = async () => {
		const regDetails = await CourseRegDetails();
		console.log(regDetails?.data?.courseRegisterForAll, "dataaaaaaaaaaaaa");
		setcourses(regDetails?.data?.courseRegisterForAll);
		console.log(courses, "coursesss  sss");
		setisLoading(false);
	};

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div>
			<div className="page-wrapper">
				<div className="content container-fluid">
					<div className="card">
						<div className="row gap-3">
							<div className="col-sm-12 col-lg-12">
								<Accordion
									activeIndex={
										courses?.activeIndex == null ? 0 : courses?.activeIndex
									}>
									{courses?.courseRegDatas?.map(
										(x, index) => (
											console.log(index, x, "indexxx...."),
											(
												<AccordionTab
													key={index}
													header={
														<div className="flex align-items-center">
															<i className="pi pi-calendar mr-2"></i>
															<div className="d-flex justify-between">
																<span className="vertical-align-middle mt-1">
																	Year {index + 1}{" "}
																</span>
																<span className="vertical-align-middle ml-3">
																	<Tag
																		severity={x?.isActive ? "success" : "info"}
																		value={x?.sessionName}></Tag>
																</span>
															</div>
														</div>
													}>
													<Accordion
														activeIndex={
															x?.activeIndex == null ? 0 : x?.activeIndex
														}>
														{x?.semesterCourseDisplayDtos?.map(
															(y, indexy) => (
																console.log(y.results, "results======"),
																(
																	<AccordionTab
																		header={
																			<div className="flex align-items-center">
																				<i className="pi pi-book mr-2"></i>
																				<span className="vertical-align-middle">
																					{y?.semesterName}
																				</span>
																			</div>
																		}>
																		<p className="m-0">
																			{/* First Semester content */}
																		</p>
																		<DataTable
																			value={y?.results}
																			tableStyle={{ minWidth: "50rem" }}
																			selection={selectedProducts}
																			onSelectionChange={(e) =>
																				setSelectedProducts(e.value)
																			}
																			dataKey="courseId"
																			emptyMessage="No result(s) available yet.">
																			<Column
																				field="courseId"
																				header="Id"
																				style={{ display: "none" }}></Column>
																			<Column
																				field="courseCode"
																				header="Course Code"
																				style={
																					y?.isCarryOver
																						? { backgroundColor: "orange" }
																						: null
																				}></Column>
																			<Column
																				field="courseName"
																				header="Course Name"></Column>
																			<Column
																				field="caScore"
																				header="CA"></Column>
																			<Column
																				field="examScore"
																				header="Exam"></Column>
																			<Column
																				field="score"
																				header="Total"></Column>

																			<Column
																				field="grade"
																				header="Grade"
																				// style={
																				//   x?.isResultAvailable
																				//     ? null
																				//     : { display: "none" }
																				// }
																			></Column>
																		</DataTable>
																		<div className="d-flex justify-between mt-3">
																			{/* <Button
                                    label="Reprint"
                                    icon="pi pi-print"
                                    className="mr-auto p2"
                                  /> */}
																			{/* <Button
                                    label="Preview"
                                    icon="pi pi-check"
                                    onClick={() =>
                                      SetSessionDetails(
                                        x?.sessionId,
                                        y?.semesterId,
                                        x?.levelId,
                                        x?.levelName,
                                        courses?.programmeId,
                                        courses?.programmeName,
                                        y?.semesterName,
                                        courses?.departmentId,
                                        courses?.departmentName
                                      )
                                    }
                                    className="ml-auto p2"
                                    style={
                                      x?.isActive ? null : { display: "none" }
                                    }
                                  /> */}
																		</div>
																	</AccordionTab>
																)
															)
														)}
													</Accordion>
													<p className="m-0">{/* Additional content */}</p>
												</AccordionTab>
											)
										)
									)}
								</Accordion>
							</div>
							{/* <div className="col-sm-12 col-lg-3">
                <Card
                  title="title"
                  subTitle="sub"
                  footer={null}
                  header="head"
                  className="md:w-25rem justify-center mx-auto"
                >
                  <p className="m-0">Current Semester: 2nd</p>
                </Card>
              </div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
