import React from 'react';
import './index.scss';

const Index = (props) => {
    return (
        <main className="bg-img">
            <div className="container">
                <div className="row">
                    <div className="tableEmitator">
                        <div className="cellEmitator">
                            <div className="centeredBlock">
                                <div className="col-xs-12 col-sm-3 col-sm-offset-2">
                                    <h1>Photo album</h1>
                                </div>
                                <div className="col-xs-12 col-sm-5 col-sm-offset-2">
                                    <div className="tab">
                                        <form className="form-horizontal" id="form" action="/enter" method="post">
                                            <div className="form-group">
                                                <label htmlFor="login">E-mail or Login</label>
                                                <input type="text" className="form-control" id="login" maxLength="35"
                                                       name="login"/>
                                                    <label id="login-error" className="invalid" htmlFor="login"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password"
                                                       maxLength="20" name="password"/>
                                                    <input type="hidden" id="token" name="token"/>
                                                        <label id="password-error" className="invalid"
                                                               htmlFor="password"/>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-default send" value="">Sign
                                                    In
                                                </button>
                                                <a href="\signup" className="btn btn-default">Sign up</a>
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

export default Index;
