import React, {Component} from "react";
import {Link} from "react-router";

import Kinvey from "../services/Kinvey";
import "../../styles/booksTable.css";

export default class BooksTable extends Component {
    constructor() {
        super();
        this.state = { // Init state
            books: []
        };

        this.removeDeletedBook = this.removeDeletedBook.bind(this);
        this.initBooks = this.initBooks.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentWillMount() {
        Kinvey.get(`appdata`, `books`, `kinvey`)
            .then(this.initBooks);
            //TODO: Show error message here.
    }

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
        Kinvey.del(`appdata`, `books/${id}`, `kinvey`)
            .then(() => this.removeDeletedBook(id));
            //TODO: show error here.
    }

    removeDeletedBook(id) {
        let books = [];
        this.state.books.filter(x => x._id !== id).forEach(x => books.push(x));
        this.setState({
            books: books
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
                            delete={this.deleteBook} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Table row component for each book | Under <List books>
class BookRow extends Component {
    constructor(props) {
        super(props);

        this.bookAddress = this.bookAddress.bind(this);
    }

    bookAddress() {
        return `/listBooks/${this.props.title}&${this.props.author}&${this.props.description}`;
    }

    render() {
        let owner = this.props.publisher === sessionStorage.getItem(`username`);
        return(
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.description}</td>
                <td>
                    <Link to={this.bookAddress()}>{owner? `[Edit]` : null}</Link>
                    <a href="#" onClick={() => this.props.delete(this.props.id)}>{owner? `[Delete]` : null}</a>
                </td>
            </tr>
        )
    }
}

 
