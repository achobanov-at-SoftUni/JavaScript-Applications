import React, {Component} from "react";

import User from "../services/User";
import Kinvey from "../services/Kinvey";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``,
        };

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput(event) {
        let value = event.target.value;
        this.usernamePromise = new Promise((resolve, reject) => {
            this.setState({
                username: value
            }, resolve());
        });
    }

    handlePasswordInput(event) {
        let value = event.target.value;
        this.passwordPromise = new Promise((resolve, reject) => {
            this.setState({
                password: value
            }, resolve());
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password
        };

        Promise.all([this.usernamePromise, this.passwordPromise]).then(() => {
            Kinvey.post(`user`, `login`, `basic`, data)
                .then(response => {
                    User.login(response);
                    User.showInfo(`infoBox`, `Login successful`);
                })
                .catch(response => {
                    User.showInfo(`errorBox`, response);
                });
        });
    }

    render() {
        return (
            <section id="viewLogin">
                <h1>Please login</h1>
                <form id="formLogin" onSubmit={this.handleSubmit}>
                    <label>
                        <div>Username:</div>
                        <input onChange={this.handleUsernameInput} type="text" name="username" id="loginUsername" required />
                    </label>
                    <label>
                        <div>Password:</div>
                        <input onChange={this.handlePasswordInput} type="password" name="password" id="loginPasswd" required />
                    </label>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </section>
        )
    }
}


 
