import React, { Component } from "react";
import {Header, Footer} from "../Template";

class HomeView extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="info"></div>
                <div id="content">
                    <h2>Welcome</h2>
                    <p>Welcome to our library</p>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;