import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import "../../styles/bookForm.css";

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ``,
            author: ``,
            description: ``,
            publisher: sessionStorage.getItem(`username`)
        };

        this.titleValue = undefined;
        this.authorValue = undefined;
        this.descriptionValue = undefined;

        this.handleAuthorInput = this.handleAuthorInput.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle input methods are called from input onChange property and update state.
    handleTitleInput(event) {
        this.titlePromise = new Promise((resolve, reject) => {
            this.setState({
                title: event.target.value,
            }, resolve());
        });

    }

    handleAuthorInput(event) {
        this.authorPromise = new Promise((resolve, reject) => {
            this.setState({
                author: event.target.value
            }, resolve());
        });
    }

    handleDescriptionInput(event) {
        this.descriptionPromise = new Promise((resolve, reject) => {
            this.setState({
                description: event.target.value
            }, resolve());
        });
    }

    // Empty method to be overridden for login and register.
    handleSubmit() {}

    render() {
        return(
            <form id="book-form" onSubmit={this.handleSubmit}>
                <label>Title</label>
                <input type="text" onChange={this.handleTitleInput} placeholder="title.." value={this.titleValue} />
                <label>Author</label>
                <input type="text" onChange={this.handleAuthorInput} placeholder="author.." value={this.authorValue} />
                <label>Description</label>
                <textarea onChange={this.handleDescriptionInput} placeholder="description.." value={this.descriptionValue} />
                <input type="submit" value={this.buttonText} />
            </form>
        );
    }
}

// Inherits BookForm. Overrides handleSubmit() to send create request. | Under <Create Book>
export class CreateBookForm extends BookForm {
    constructor() {
        super();
        this.buttonText = `Create`;
    }

    handleSubmit(event) {
        event.preventDefault();
        Promise.all([this.titlePromise, this.authorPromise, this.descriptionPromise]).then(() => {
            Kinvey.post(`appdata`, `books`, `kinvey`, this.state);
            //TODO: messages
        });
    }
}

// Inherits BookForm. Overrides handleSubmit() to send edit ( PUT ) request | Under <List Books-[Edit]>
export class EditBookForm extends BookForm {
    constructor(props) {
        super(props);
        this.buttonText = `Edit`;
    }

    componentWillMount() {
        let data = this.props.bookData.split(`&`);
        this.titleValue = data[0];
        this.authorValue = data[1];
        this.descriptionValue = data[2];
    }

    handleSubmit(event) {
        event.preventDefault();
        Promise.all([this.titlePromise, this.authorPromise, this.descriptionPromise]).then(() => {
            Kinvey.put(`appdata`, `books/${this.id}`, `kinvey`, this.state);
            //TODO: Messages
        });
    }
}

 
