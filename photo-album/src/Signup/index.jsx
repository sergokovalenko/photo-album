import React, {Component} from 'react';
import './index.scss';
import {Link} from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            isNicknameValid: true,
            isNicknameFromServer: true,
            nicknameErrorMessage: 'Login required, length => 6, letters and digits only',
            nicknameServerMessage: 'Login or email does not exist',
            email: '',
            isEmailValid: true,
            emailErrorMessage: 'Invalid email',
            password: '',
            isPasswordValid: true,
            passwordMessage: 'Password required, length 6 <= x <= 20',
            name: '',
            isNameValid: true,
            nameErrorMessage: 'Invalid name',
            surname: '',
            isSurnameValid: true,
            surnameErrorMessage: 'Invalid surname'
        };
    }

    validateName = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        if (val.length < 3) {
            return false;
        }

        return /^[\-а-яА-Яa-zA-Z]+$/i.test(val);
    };

    validateNick = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        if (val.length < 3) {
            return false;
        }

        return /^[\-а-яА-Яa-zA-Z0-9]+$/i.test(val);
    };

    onNickChange = (value) => {
        this.setState({
            nickname: value.trim(),
            isNicknameValid: this.validateNick(value)
        });
    };

    onNameChange = (value) => {
        this.setState({
            name: value.trim(),
            isNameValid: this.validateName(value)
        });
    };

    onSurnameChange = (value) => {
        this.setState({
            surname: value.trim(),
            isSurnameValid: this.validateName(value)
        });
    };

    render() {
        const {
            name, surname, isNameValid, isSurnameValid, surnameErrorMessage, nameErrorMessage,
            nickname, isNicknameValid, nicknameErrorMessage
        } = this.state;

        return (
            <main className="bg-img">
                <div className="container">
                    <div className="row">
                        <div className="tableEmitator customForm">
                            <div className="cellEmitator">
                                <div className="centeredBlock">
                                    <div className="col-xs-10">
                                        <div className="tab">
                                            <form className="form-horizontal" id="form" action="/enter" method="post">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${!isNameValid ? 'invalid' : ''}`}
                                                        id="firstName"
                                                        maxLength="35"
                                                        name="firstName"
                                                        value={name}
                                                        onChange={(e) => this.onNameChange(e.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="firstName">
                                                        { !isNameValid ? nameErrorMessage : ''}
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${!isSurnameValid ? 'invalid' : ''}`}
                                                        id="lastName"
                                                        maxLength="35"
                                                        name="lastName"
                                                        value={surname}
                                                        onChange={(e) => this.onSurnameChange(e.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="lastName">
                                                        { !isSurnameValid ? surnameErrorMessage : ''}
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nickname">Nickname</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${!isNicknameValid ? 'invalid' : ''}`}
                                                        id="nickname"
                                                        maxLength="35"
                                                        name="nickname"
                                                        value={nickname}
                                                        onChange={(e) => this.onNickChange(e.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="nickname">
                                                        { !isNicknameValid ? nicknameErrorMessage : ''}
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="birthDate">Birth Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="birthDate"
                                                        maxLength="35"
                                                        name="birthDate"
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="birthDate"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control" id="email"
                                                           maxLength="35"
                                                           name="email"/>
                                                    <label id="login-error" className="invalid" htmlFor="email"/>
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
                                                    <Link type="submit" className="btn btn-default" to="/signin"
                                                          value="Sign in"/>
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

export default Signup;
