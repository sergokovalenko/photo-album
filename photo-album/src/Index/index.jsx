import React, {Component} from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import {restSettings} from "../constants";
import responseHandler from "../helpers/responseHandler";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            isLoginValid: true,
            isLogFromServer: true,
            loginErrorMessage: 'Login required, length => 6, letters and digits only',
            loginServerMessage: 'Login or email does not exist',
            password: '',
            isPasswordValid: true,
            passwordMessage: 'Password required, length 6 <= x <= 20'
        };
    }

    validatePassword = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        return val.length >= 6 && val.length <= 20;
    };

    onPasswordChange = (value) => {
        this.setState({
            password: value.trim(),
            isPasswordValid: this.validatePassword(value)
        });
    };

    validateLogin = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        if (val.length < 6) {
            return false;
        }

        return /^[-а-яА-Яa-zA-Z0-9@.]+$/i.test(val);
    };

    onLoginChange = (value) => {
        this.setState({
            login: value.trim(),
            isLoginValid: this.validateLogin(value),
            isLogFromServer: true
        });
    };

    onSignin = (e) => {
        e.preventDefault();
        const { login, password } = this.state;
        const isLoginValid = this.validateLogin(login);
        const isPasswordValid = this.validatePassword(password);

        if (!isPasswordValid || !isLoginValid) {
            this.setState({
                isLoginValid,
                isPasswordValid
            });
            return;
        }

        fetch(`${window.host}/loginAlreadyExists`, {
            ...restSettings,
            body: JSON.stringify({
                login
            })
        }).then(res => responseHandler(res))
            .then((resp) => {
                if (resp) {
                    // autorization request from messanger
                } else {
                    this.setState({ isLogFromServer: false });
                }
            })
            .catch(() => {
                this.setState({ isLogFromServer: false });
                alert('Not implemented')
            });
    }

    render() {
        const {
            login,
            isLoginValid,
            isLogFromServer,
            loginErrorMessage,
            loginServerMessage,
            password,
            isPasswordValid,
            passwordMessage
        } = this.state;

        return (
            <main className="bg-img">
                <div className="container">
                    <div className="row">
                        <div className="tableEmitator customForm">
                            <div className="cellEmitator">
                                <div className="centeredBlock">
                                    <div className="col-xs-12 col-sm-3 col-sm-offset-2">
                                        <h1>Photo album</h1>
                                        <ul>
                                            <li><Link to='/user/1'>user</Link></li>
                                            <li><Link to='/album/1'>album</Link></li>
                                            <li><Link to='/'>home</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-12 col-sm-5 col-sm-offset-2">
                                        <div className="tab">
                                            <form className="form-horizontal" id="form" action="/enter" method="post">
                                                <div className="form-group">
                                                    <label htmlFor="login">E-mail or Login</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${!isLoginValid || !isLogFromServer ? 'invalid' : ''}`}
                                                        id="login"
                                                        maxLength="35"
                                                        name="login"
                                                        value={login}
                                                        onChange={(event) => this.onLoginChange(event.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="login">
                                                        { isLogFromServer ? !isLoginValid ? loginErrorMessage : '' : loginServerMessage }
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${isPasswordValid ? '' : 'invalid'}`}
                                                        id="password"
                                                        maxLength="20"
                                                        name="password"
                                                        value={password}
                                                        onChange={(event) => this.onPasswordChange(event.target.value)}
                                                    />
                                                    <input type="hidden" id="token" name="token"/>
                                                    <label id="password-error" className="invalid" htmlFor="password">
                                                        { !isPasswordValid ? passwordMessage : '' }
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-default send"
                                                        value=""
                                                        onClick={(e) => this.onSignin(e)}
                                                    >Sign In</button>
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
    }
}

export default Index;
