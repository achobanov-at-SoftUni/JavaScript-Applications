import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import User from "../services/User";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``,
            name: ``,
            cart: {}
        };

        this.handleNameInput = this.handleNameInput.bind(this);
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

    handleNameInput(event) {
        let value = event.target.value;
        this.namePromise = new Promise((resolve, reject) => {
            this.setState({
                name: value
            }, resolve());
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        Promise.all([this.namePromise, this.usernamePromise, this.passwordPromise]).then(() => {
            Kinvey.post(`user`, ``, `basic`, this.state)
                .then(() => {
                    User.register();
                    User.showInfo(`infoBox`, `User registration successful.`);
                })
                .catch(response => {
                    User.showInfo(`errorBox`, response);
                });
        });
    }

    render() {
        return (
            <section id="viewRegister">
                <h1>Please register here</h1>
                <form id="formRegister" onSubmit={this.handleSubmit}>
                    <label>
                        <div>Username:</div>
                        <input onChange={this.handleUsernameInput} type="text" name="username" id="registerUsername" required />
                    </label>
                    <label>
                        <div>Password:</div>
                        <input onChange={this.handlePasswordInput} type="password" name="password" id="registerPasswd" required />
                    </label>
                    <label>
                        <div>Name:</div>
                        <input onChange={this.handleNameInput} type="text" name="name" id="registerName" />
                    </label>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </section>
        )
    }
}
 
