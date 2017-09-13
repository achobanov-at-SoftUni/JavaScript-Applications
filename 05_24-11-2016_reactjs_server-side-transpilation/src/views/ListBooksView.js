import React, { Component } from "react";
// import BaseComponent from "./BaseComponent";
import {Header, BooksTable, Footer} from "../Template";

class LoginView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <BooksTable />
                <Footer/>
            </div>
        );
    }
}

export default LoginView;
 
