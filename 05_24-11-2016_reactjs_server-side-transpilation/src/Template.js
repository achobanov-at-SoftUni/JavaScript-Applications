// Template components. These are used to fill the View components in "./views"

import React, { Component } from 'react';
import $ from "jquery"
import {changeView, renderError, renderMessage} from "./index";
import './styles/Template.css';
import consts from "./constants";

// Header and Footer components
class Header extends Component {
    static logout() {
        sessionStorage.clear();
    }

    render() {
        if (sessionStorage.getItem(`username`)) {
            return (
                <header>
                    <a href="#" onClick={() => changeView(`home`)}>Home</a>
                    <a href="#" onClick={() => changeView(`listBooks`)}>List Books</a>
                    <a href="#" onClick={() => changeView(`createBook`)}>Create Book</a>
                    <a href="#" onClick={() => {changeView(`home`); Header.logout()}}>Logout</a>
                    <span id="welcome">Welcome, {sessionStorage.getItem(`username`)}</span>
                </header>
            );
        } else {
            return (
                <header>
                    <a href="#" onClick={() => changeView(`home`)}>Home</a>
                    <a href="#" onClick={() => changeView(`login`)}>Login</a>
                    <a href="#" onClick={() => changeView(`register`)}>Register</a>
                </header>
            );
        }
    }
}

class Footer extends Component {
    render() {
        return (
            <footer>Book library - simple SPA with ReactJS</footer>
        );
    }
}

class Message extends Component {
    render() {
        return (
            <div id={this.props.type}>{this.props.message}</div>
        );
    }
}

// Table row component for each book | Under <List books>
class BookRow extends Component {
    render() {
        let owner = this.props.publisher === sessionStorage.getItem(`username`);
        return(
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.description}</td>
                <td>
                    <a href="#" onClick={() => this.props.edit(`editBook`, this.props.id)}>{owner? `[Edit]` : ``}</a>
                    <a href="#" onClick={() => this.props.delete(this.props.id)}>{owner? `[Delete]` : ``}</a>
                </td>
            </tr>
        )
    }
}

// Table component under <List books>
class BooksTable extends Component {
    constructor(props) {
        super(props);
        this.state = { // Init state
            books: []
        };

        // Sets <this> as context for the following functions
        this.updateState = this.updateState.bind(this);
        this.initBooks = this.initBooks.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    // React API component - it executes before render()
    componentWillMount() {
        let method = `GET`;
        let url = consts.serviceUrl + `/appdata/${consts.appKey}/${consts.collection}`;
        let headers = {
            "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
            "Content-Type": `application/json`
        };

        let request = {method, url, headers};
        $.ajax(request)
            .then(this.initBooks)
            .catch(() => renderError(`Unable to connect. Try again later.`));
    }

    // Fills state.books with response data
    initBooks(response) {
        let books = [];
        for (let entry of response) {
            books.push({
                _id: entry._id,
                title: entry.title,
                author: entry.author,
                description: entry.description,
                publisher: entry.publisher
            });
        }

        this.setState({
            books: books
        });
    }

    deleteBook(id) {
        let method = `DELETE`;
        let url = consts.serviceUrl + `/appdata/${consts.appKey}/${consts.collection}/${id}`;
        let headers = {
            "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
            "Content-Type": `application/json`
        };

        let request = {method, url, headers};
        $.ajax(request)
            .then(() => this.updateState(id))
            .catch(() => renderError(`Unable to delete, something went wrong.`));
    }

    // Removes deleted items from state. By React API render() is called each time state is updated.
    updateState(id) {
        let temp = [];
        for (let entry of this.state.books) {
            if (entry._id !== id) {
                temp.push(entry);
            }
        }
        this.setState({
            books: temp
        });
    }

    render() {
        return (
            <div id="content">
                <h2>Books</h2>
                <table id="books-list">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.books.map(x =>  // Maps each book object to <BookRow /> component
                            <BookRow
                                key={x._id}
                                id={x._id}
                                title={x.title}
                                author={x.author}
                                description={x.description}
                                publisher={x.publisher}
                                edit={changeView}
                                delete={this.deleteBook}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Book related forms: Base class and 2 children
class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ``,
            author: ``,
            description: ``,
            publisher: sessionStorage.getItem(`username`)
        };

        this.handleAuthorInput = this.handleAuthorInput.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle input methods are called from input onChange property and update state.
    handleTitleInput(event) {
        this.setState({
            title: event.target.value,
            author: this.state.author,
            description: this.state.description,
            publisher: sessionStorage.getItem(`username`)
        });
    }

    handleAuthorInput(event) {
        this.setState({
            title: this.state.title,
            author: event.target.value,
            description: this.state.description,
            publisher: sessionStorage.getItem(`username`)
        });
    }

    handleDescriptionInput(event) {
        this.setState({
            title: this.state.title,
            author: this.state.author,
            description: event.target.value,
            publisher: sessionStorage.getItem(`username`)
        });
    }

    // Empty method to be overridden for login and register.
    handleSubmit() {}

    render() {
        return(
            <form id="create-book-form" onSubmit={this.handleSubmit}>
                <label>Title</label>
                <input type="text" onChange={this.handleTitleInput} placeholder="New title..." />
                <label>Author</label>
                <input type="text" onChange={this.handleAuthorInput} placeholder="New author..." />
                <label>Description</label>
                <textarea onChange={this.handleDescriptionInput} placeholder="New book description comes here..."/>
                <input type="submit" value={this.props.value} />
            </form>
        );
    }
}

// Inherits BookForm. Overrides handleSubmit() to send create request. | Under <Create Book>
class CreateBookForm extends BookForm {
    handleSubmit(event) {
        event.preventDefault(); // Prevent page reload.
        let method = 'POST';
        let url = consts.serviceUrl + `/appdata/${consts.appKey}/${consts.collection}`;
        let headers = {
            "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
            "Content-Type": `application/json`
        };

        let request = {method, url, headers, data: JSON.stringify(this.state)};
        $.ajax(request)
            .then(() => renderMessage(`Add Created successfully`))
            .catch(() => renderError(`Could not create add. Please try again later.`));
    }
}

// Inherits BookForm. Overrides handleSubmit() to send edit ( PUT ) request | Under <List Books-[Edit]>
class EditBookForm extends BookForm {
    constructor(props) {
        super(props);
        this.id = this.props.id; // Stores id, passed from BookRow [Edit] link onClick to changeView() and then EditBookView.

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let method = `PUT`;
        let url = consts.serviceUrl + `/appdata/${consts.appKey}/${consts.collection}/${this.id}`;
        let headers = {
            "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
            "Content-Type": `application/json`
        };
        let request = {method, url, headers, data: JSON.stringify(this.state)};

        $.ajax(request)
            .then(() => renderMessage(`Edit successful`))
            .catch(() => renderError(`Could not edit. Please try again later.`));
    }
}

// User related forms: Base class and 2 children
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
                password: this.state.password
            }, resolve);
        });
    }

    handlePasswordChange(event) {
        this.passwordPromise = new Promise((resolve, reject) => {
            this.setState({
                username: this.state.username,
                password: event.target.value
            }, resolve);
        });
    }

    handleSubmit() {}

    render() {
        return(
            <form id="user-form" onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input type="text"  onChange={this.handleUsernameChange} placeholder="username..." />
                <label>Password:</label>
                <input type="password" onChange={this.handlePasswordChange} placeholder="password..." />
                <input type="submit" value={this.props.value} />
            </form>
        );
    }
}

// Inherits UserForm. Overrides handleSubmit() to send login request | Under <Login>
class LoginForm extends UserForm {
    handleSubmit(event) {
        event.preventDefault();
        let method = `POST`;
        let url = consts.serviceUrl + `/user/${consts.appKey}/login`;
        let appAuthToken = btoa(`${consts.appKey}:${consts.appSecret}`);
        let headers = {
            "Authorization": `Basic ${appAuthToken}`,
            "Content-Type": `application/json`
        };

        let request = {method, url, headers, data: JSON.stringify(this.state)};
        // Makes sure state is changed before we send request to server. Not sure if necessary..
        Promise.all([this.usernamePromise, this.passwordPromise]).then(() => {
            $.ajax(request)
            .then((response) => {
                sessionStorage.setItem('username', `${response.username}`);
                sessionStorage.setItem(`authToken`, `${response._kmd.authtoken}`);
                changeView(`home`);
            })
            .catch(() => {
                renderError(`Could not login. Try again or register`);
            });
        })
    }
}

// Inherits UserForm. Overrides handleSubmit() to send register request | Under <Register>
class RegisterForm extends LoginForm {
    handleSubmit(event) {
        event.preventDefault();
        let method = `POST`;
        let url = consts.serviceUrl + `/user/${consts.appKey}/`;
        let headers = {
            "Authorization": `Basic ${consts.appAuthToken}`,
            "Content-Type": `application/json`
        };
        if (this.state.username !== `` && this.state.password !== ``) {
            let request = {method, url, headers, data: JSON.stringify(this.state)};
            Promise.all([this.usernamePromise, this.passwordPromise]).then(() => {
                $.ajax(request)
                    .then(() => renderMessage(`Register successful`))
                    .catch((response) => renderError(JSON.parse(response.responseText).description));
            });
        } else {
            renderError(`Please fill all boxes`);
        }
    }
}

export {Header, Footer, LoginForm, RegisterForm, BooksTable, CreateBookForm, EditBookForm, Message};
