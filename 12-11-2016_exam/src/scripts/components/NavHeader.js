import React, {Component} from "react";
import {Link} from "react-router";

import User from "../services/User";

export default class NavHeader extends Component {
    render() {
        if (User.isLoggedIn()) {
            return (
                <header id="menu">
                    <Link to="/" className="useronly" id="linkMenuUserHome">Home</Link>
                    <Link to="/myMessages" className="useronly" id="linkMenuMyMessages">My Messages</Link>
                    <Link to="/archive" className="useronly" id="linkMenuArchiveSent">Archive (Sent)</Link>
                    <Link to="/sendMessage" className="useronly" id="linkMenuSendMessage">Send Message</Link>
                    <Link to="/" onClick={User.logout} className="useronly" id="linkMenuLogout">Logout</Link>
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
