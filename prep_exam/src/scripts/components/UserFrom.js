import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import User from "../services/User";
import "../../styles/userForm.css";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.usernamePromise = new Promise((resolve, reject) => {
            this.setState({
                username: event.target.value,
            }, resolve);
        });
    }

    handlePasswordChange(event) {
        this.passwordPromise = new Promise((resolve, reject) => {
            this.setState({
                password: event.target.value,
            }, resolve);
        });
    }

    handleSubmit() {}

    render() {
        return(
            <form id="user-form" onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input type="text" onChange={this.handleUsernameChange} placeholder="username..." required />
                <label>Password:</label>
                <input type="password" onChange={this.handlePasswordChange} placeholder="password..." required />
                <input type="submit" value={this.buttonText} />
            </form>
        );
    }
}

export class LoginForm extends UserForm {
    constructor() {
        super();
        this.buttonText = `Login`;
    }

    handleSubmit(event) {
        event.preventDefault();
        Promise.all([this.usernamePromise, this.passwordPromise]).then(() => {
            Kinvey.post(`user`, `login`, `basic`, this.state)
                .then((response) => User.login(response));
                //TODO: error
        });
    }
}

export class RegisterForm extends LoginForm {
    constructor() {
        super();
        this.buttonText = `Register`;
    }

    handleSubmit(event) {
        event.preventDefault();

        Promise.all([this.usernamePromise, this.passwordPromise]).then(() => {
            Kinvey.post(`user`, ``, `basic`, this.state);
                // .then(() => renderMessage(`Register successful`))
                // .catch((response) => renderError(JSON.parse(response.responseText).description));
        });
    }
}

 
