import React, { Component } from "react";
// import BaseComponent from "./BaseComponent";
import {Header, Footer, RegisterForm} from "../Template";

class RegisterView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <div id="content">
                    <h2>Register</h2>
                    <RegisterForm value="Register"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default RegisterView;

