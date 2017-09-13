import React, {Component} from "react";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Message from "../components/Message";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            message: null,
            type: null
        };

        this.updateAppState = this.updateAppState.bind(this);
        this.showMessage = this.showMessage.bind(this);
        // this.passMessagetoChildren = this.passMessagetoChildren.bind(this);
    }

    updateAppState(type, message) {
        this.setState({
            type: type,
            message: message
        });
    }

    showMessage() {
        if (this.state.message) {
            return <Message id={this.state.type} message={this.state.message} />;
        }
    }

    // passMessagetoChildren() {
    //     console.log(React.Children);
    //     let children = this.props.children.map(child => {
    //         React.cloneElement(child, {showMessage: this.updateAppState});
    //     });
    //
    //     console.log(children);
    //     console.log(children);
    //     return children;
    // }

    render() {
        return (
            <div id="wrapper">
                <Navigation/>
                {this.showMessage()}
                <div id="content">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }

}
 
