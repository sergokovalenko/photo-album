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
            passwordErrorMessage: 'Password required, length 6 <= x <= 20',
            name: '',
            isNameValid: true,
            nameErrorMessage: 'Invalid name',
            surname: '',
            isSurnameValid: true,
            surnameErrorMessage: 'Invalid surname',
            response: {}
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

        return /^[-а-яА-Яa-zA-Z]+$/i.test(val);
    };

    validateNick = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        if (val.length < 3) {
            return false;
        }

        return /^[-а-яА-Яa-zA-Z0-9]+$/i.test(val);
    };

    validateEmail = (value) => {
        if (!value || !value.trim()) {
            return false;
        }

        const val = value.trim();

        if (val.length > 35) {
            return false;
        }

        return /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/.test(val);
    };

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

    onEmailChange = (value) => {
        this.setState({
            email: value.trim(),
            isEmailValid: this.validateEmail(value)
        });
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

    onDatehange = (value) => {
        this.setState({
            birthDate: value.trim(),
            isNameValid: true
        });
    };

    onSurnameChange = (value) => {
        this.setState({
            surname: value.trim(),
            isSurnameValid: this.validateName(value)
        });
    };

    onSignup = (e) => {
        e.preventDefault();

        const { nickname, password, name, surname, email } = this.state;
        const isEmailValid = this.validateEmail(email);
        const isNameValid = this.validateName(name);
        const isSurnameValid = this.validateName(surname);
        const isNicknameValid = this.validateNick(nickname);
        const isPasswordValid = this.validatePassword(password);

        if (isPasswordValid && isNicknameValid && isSurnameValid && isNameValid && isEmailValid) {
            this.sendUser();
        }
    };

    sendUser = () => {
        fetch(
            `${window.host}/api/user`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lastName: this.state.surname,
                    firstName: this.state.name,
                    nickname: this.state.nickname,
                    email: this.state.email,
                    password: this.state.password,
                    birthDate: this.birthDate
                })
            }
        ).then(result => result.json().then(x => {
            console.log(x);
            this.setState({response: x});
        }));
    };

    render() {
        const {
            name, surname, isNameValid, isSurnameValid, surnameErrorMessage, nameErrorMessage,
            nickname, isNicknameValid, nicknameErrorMessage,
            email, isEmailValid, emailErrorMessage,
            password, isPasswordValid, passwordErrorMessage
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
                                                        responseHandler                     value={name}
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
                                                        onChange={(e) => this.onDatehange(e.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="birthDate"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        className={`form-control ${!isEmailValid ? 'invalid' : ''}`}
                                                        id="email"
                                                        maxLength="35"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => this.onEmailChange(e.target.value)}
                                                    />
                                                    <label id="login-error" className="invalid" htmlFor="email">
                                                        { !isEmailValid ? emailErrorMessage : ''}
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
                                                        { !isPasswordValid ? passwordErrorMessage : '' }
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <Link className="btn btn-default" to="/">Sign in</Link>
                                                    <button className="btn btn-primary" onClick={(e) => this.onSignup(e)}>Sign up</button>
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
