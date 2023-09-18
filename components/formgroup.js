import React from 'react'

export default function Formgroup() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5 className="form-title">
                        <span>Basic Details</span>
                    </h5>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group local-forms">
                        <label>
                            Surname <span className="login-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group local-forms">
                        <label>
                            Firstname <span className="login-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group local-forms">
                        <label>
                            Othername <span className="login-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">

                    <div className="local-forms form-group">
                        <label>
                            Nationality <span className="login-danger">*</span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />

                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <div className="local-forms form-group">
                        <label>
                            State Of Origin <span className="login-danger">*</span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />

                    </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group local-forms">
                        <label>
                            Phone Number <span className="login-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"


                        />
                    </div>
                </div>


            </div>
        </>
    )
}
