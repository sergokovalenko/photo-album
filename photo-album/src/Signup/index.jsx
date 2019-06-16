import React from 'react';
import './index.scss';
import { Link } from "react-router-dom";

const Signup = (props) => {
    return (
        <main className="bg-img">
            <div className="container">
                <div className="row">
                    <div className="tableEmitator">
                        <div className="cellEmitator">
                            <div className="centeredBlock">
                                <div className="col-xs-10">
                                    <div className="tab">
                                        <form className="form-horizontal" id="form" action="/enter" method="post">
                                            <div className="form-group">
                                                <label htmlFor="firstName">Last Name</label>
                                                <input type="text" className="form-control" id="firstName" maxLength="35"
                                                    name="firstName" />
                                                <label id="login-error" className="invalid" htmlFor="firstName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" className="form-control" id="lastName" maxLength="35"
                                                    name="lastName" />
                                                <label id="login-error" className="invalid" htmlFor="lastName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nickname">Nickname</label>
                                                <input type="text" className="form-control" id="nickname" maxLength="35"
                                                    name="nickname" />
                                                <label id="login-error" className="invalid" htmlFor="nickname" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="birthDate">Birth Date</label>
                                                <input type="date" className="form-control" id="birthDate" maxLength="35"
                                                    name="birthDate" />
                                                <label id="login-error" className="invalid" htmlFor="birthDate" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control" id="email" maxLength="35"
                                                    name="email" />
                                                <label id="login-error" className="invalid" htmlFor="email" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password"
                                                    maxLength="20" name="password" />
                                                <input type="hidden" id="token" name="token" />
                                                <label id="password-error" className="invalid"
                                                    htmlFor="password" />
                                            </div>
                                            <div className="form-group">
                                                <Link type="submit" className="btn btn-default" to="/signin" value="Sign in" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
