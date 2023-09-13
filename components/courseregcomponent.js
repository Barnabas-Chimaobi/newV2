import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


export default function Courseregcomponent() {
    const [carryOvers, setcarryOvers] = useState([]);
    useEffect(() => {

    }, []);

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">ECE 101</div>

                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">1</span>
                                </span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">F</span>

                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <div>
                <div className="page-wrapper">
                    <div className="content container-fluid">

                        <div className="card">
                            <div className="row">
                                <div className="col-sm-12 col-lg-8">
                                    <Accordion activeIndex={0}>
                                        <AccordionTab
                                            header={
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-calendar mr-2"></i>
                                                    <span className="vertical-align-middle">Year I</span>
                                                </div>
                                            }
                                        >
                                            <Accordion activeIndex={0}>
                                                <AccordionTab
                                                    header={
                                                        <div className="flex align-items-center">
                                                            <i className="pi pi-user mr-2"></i>
                                                            <span className="vertical-align-middle">First Semester</span>
                                                        </div>
                                                    }
                                                >
                                                    <p className="m-0">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                                                    </p>
                                                </AccordionTab>
                                                <AccordionTab
                                                    header={
                                                        <div className="flex align-items-center">
                                                            <i className="pi pi-user mr-2"></i>
                                                            <span className="vertical-align-middle">Second Semester</span>
                                                        </div>
                                                    }
                                                >
                                                    <p className="m-0">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                                                    </p>
                                                </AccordionTab>

                                            </Accordion>
                                            <p className="m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                        </AccordionTab>
                                        <AccordionTab
                                            header={
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-user mr-2"></i>
                                                    <span className="vertical-align-middle">Year II</span>
                                                </div>
                                            }
                                        >
                                            <p className="m-0">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                                Consectetur, adipisci velit, sed quia non numquam eius modi.
                                            </p>
                                        </AccordionTab>
                                        <AccordionTab
                                            header={
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-search mr-2"></i>
                                                    <span className="vertical-align-middle">Year III</span>
                                                    <i className="pi pi-cog ml-2 ml-2"></i>
                                                </div>
                                            }
                                        >
                                            <p className="m-0">
                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                                                quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                                                mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                                            </p>
                                        </AccordionTab>
                                    </Accordion>
                                </div>
                                <div className="col-sm-12 col-lg-3">
                                    <div className="card flex justify-content-center">
                                        <Card title="Ogbo Chinedu" subTitle="Current Level: 200 Level" footer={null} header={header} className="md:w-25rem">
                                            <p className="m-0">
                                                Current Semester:  First Semester                  </p>
                                        </Card>
                                        <Card title="Carry Over" subTitle="" className="md:w-25rem">
                                            <DataView value={carryOvers} itemTemplate={itemTemplate} />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
