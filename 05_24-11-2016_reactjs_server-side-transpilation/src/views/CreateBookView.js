import React, { Component } from "react";
import {Header, CreateBookForm, Footer} from "../Template";

class CreateBookView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <div id="content">
                    <h2>Create new book</h2>
                    <CreateBookForm value="Create"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CreateBookView;

