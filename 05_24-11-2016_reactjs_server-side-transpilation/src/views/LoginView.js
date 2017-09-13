import React, { Component } from "react";
// import BaseComponent from "./BaseComponent";
import {Header, Footer, LoginForm} from "../Template";

class LoginView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <div id="content">
                    <h2>Please, login</h2>
                    <LoginForm value="Login"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default LoginView;
 
