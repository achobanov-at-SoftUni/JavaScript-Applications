import React, {Component} from "react";

import LoginForm from "../components/LoginForm";
import InfoBox from "../components/InfoBox";

export default class LoginView extends Component {
    constructor() {
        super();
        this.state = {
            message: undefined,
            type: undefined
        };

        this.showInfoBox = this.showInfoBox.bind(this);
    }

    showInfoBox(type, message) {
        this.setState({
            message: message,
            type: type
        });
    }

    render() {
        console.log(this.props.route);
        return (
            <div>
                {this.state.message? <InfoBox type={this.state.type} message={this.state.message}/> : null}
                <LoginForm infoBox={this.showInfoBox}/>
            </div>
        );
    }
}

