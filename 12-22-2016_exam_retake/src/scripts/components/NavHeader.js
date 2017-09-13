import React, {Component} from "react";
import {Link} from "react-router";

import User from "../services/User";

export default class NavHeader extends Component {
    render() {
        if (User.isLoggedIn()) {
            return (
                <header id="menu">
                    <Link to="/" className="useronly" id="linkMenuUserHome">Home</Link>
                    <Link to="/shop" className="useronly" id="linkMenuShop">Shop</Link>
                    <Link to="/cart" className="useronly" id="linkMenuCart">Cart</Link>
                    <Link to="/" onClick={User.logout} className="useronly" id="linkMenuLogout">Logout</Link>
                    <span className="useronly" id="spanMenuLoggedInUser">Welcome, {sessionStorage.getItem(`username`)}!</span>
                </header>
            )
        } else {
            return (
                <header id="menu">
                    <Link to="/" className="anonymous" id="linkMenuAppHome">Home</Link>
                    <Link to="/login" className="anonymous" id="linkMenuLogin">Login</Link>
                    <Link to="/register" className="anonymous" id="linkMenuRegister">Register</Link>
                </header>
            );
        }
    }
}
