import React, {Component} from "react";
import {Link} from "react-router";

export default class UserHome extends Component {
    constructor() {
        super();
        this.user = sessionStorage.getItem(`username`);
    }

    render() {
        return (
            <section id="viewUserHome">
                <h1 id="viewUserHomeHeading">Welcome, {this.user}!</h1>
                <Link to="/myMessages" id="linkUserHomeMyMessages">My Messages</Link>
                <Link to="/sendMessage" id="linkUserHomeSendMessage">Send Message</Link>
                <Link to="/archive" id="linkUserHomeArchiveSent">Archive (Sent)</Link>
            </section>
        );
    }
}
