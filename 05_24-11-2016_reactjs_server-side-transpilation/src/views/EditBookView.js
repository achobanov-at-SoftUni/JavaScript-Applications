import React, { Component } from "react";
import {Header, EditBookForm, Footer} from "../Template";

class EditBookView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <div id="content">
                    <h2>Edit book</h2>
                    <EditBookForm id={this.props.id} value="Edit"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default EditBookView;

