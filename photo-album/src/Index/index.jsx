import React, {Component} from 'react';
import './index.scss';
import {Link, Redirect} from "react-router-dom";
import {restSettings} from "../constants";
import responseHandler from "../helpers/responseHandler";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            isLoginValid: true,
            isLogFromServer: true,
            loginErrorMessage: 'Login required, length => 4, letters and digits only',
            loginServerMessage: 'Login or email does not exist',
            password: '',
            isPasswordValid: true,
            passwordMessage: 'Password required, length 6 <= x <= 20',
            go: null
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

        if (val.length < 4) {
            return false;
        }

        return /^[-a-zA-Z0-9@.]+$/i.test(val);
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

        fetch(`${window.host}/loginAlreadyExists/${login}`, {
            ...restSettings
        }).then(res => responseHandler(res))
            .then((resp) => {
                if (resp.text === 'YES') {
                    this.authorize();
                } else {
                    this.setState({ isLogFromServer: false });
                }
            })
            .catch(() => {
                this.setState({ isLogFromServer: false });
                alert('Not implemented')
            });
    };

    authorize = () => {
        const { login, password } = this.state;
        fetch(`${window.host}/authorization/${login}/${password}`, {
            ...restSettings
        }).then(res => responseHandler(res))
            .then((res) => {
                this.props.authorize(res);
                localStorage.setItem("user", JSON.stringify(res));
                document.getElementById('token').value = res.token;
                this.setState({ go: res.id });
            })
            .catch(() => this.setState({ isLogFromServer: false }));
    };

    render() {
        const {
            login,
            isLoginValid,
            isLogFromServer,
            loginErrorMessage,
            loginServerMessage,
            password,
            isPasswordValid,
            passwordMessage,
            go
        } = this.state;

        return (
            !go ?
            <main className="bg-img">
                <div className="container">
                    <div className="row">
                        <div className="tableEmitator customForm">
                            <div className="cellEmitator">
                                <div className="centeredBlock">
                                    <div className="col-xs-12 col-sm-3 col-sm-offset-2">
                                        <h1>Photo album</h1>
                                        <ul>
                                            <li><Link to='/user/12'>user</Link></li>
                                            <li><Link to='/album/1'>album</Link></li>
                                            <li><Link to='/'>home</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-12 col-sm-5 col-sm-offset-2">
                                        <div className="tab">
                                            <form className="form-horizontal" id="form">
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
                                                    <button type="submit" className="d-none" id="submit"></button>
                                                    <button
                                                        className="btn btn-default send"
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
            </main> :
                <Redirect to={`/user/${go}`} />
        );
    }
}

export default Index;
