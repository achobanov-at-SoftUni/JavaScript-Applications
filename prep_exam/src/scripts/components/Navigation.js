import React, {Component} from "react";
import {Link} from "react-router";

import User from "../services/User";
import "../../styles/Navigation.css";

export default class Navigation extends Component {
    render() {
        if (User.isLoggedIn()) {
            return (
                <header>
                    <Link to="/">Home</Link>
                    <Link to="/listBooks">List Books</Link>
                    <Link to="/createBook">Create Book</Link>
                    <Link to="/" >Logout</Link>
                    <span id="welcome">Welcome, {sessionStorage.getItem(`username`)}</span>
                </header>
            );
        } else {
            return (
                <header>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </header>
            );
        }
    }
}
