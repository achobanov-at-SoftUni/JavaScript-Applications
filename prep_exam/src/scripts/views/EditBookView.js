import React, {Component} from "react";

import {EditBookForm} from "../components/BookForm";

export default class EditBookView extends Component {
    render() {
        return (
            <EditBookForm bookData={this.props.params.bookData} />
        );
    }
}

 
