import React, {Component} from "react";
import "../../styles/message.css";

export default class Message extends Component {
    render() {
        return (
            <div id={this.props.type}>{this.props.message}</div>
        );
    }
}
 
