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
                <Link to="/shop" id="linkUserHomeShop">Shop</Link>
                <Link to="/cart" id="linkUserHomeCart">Cart</Link>
            </section>
        );
    }
}
