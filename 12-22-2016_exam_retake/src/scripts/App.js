import React, {Component} from "react";

import NavHeader from "./components/NavHeader";
import InfoBox from "./components/InfoBox";

export default class App extends Component {
    render() {
        return (
            <div id="app">
                <NavHeader />
                <InfoBox/>
                <main>
                    {this.props.children}
                </main>
                <footer>Shopping System - Simple SPA Application</footer>
            </div>
        )
    }
}
 
