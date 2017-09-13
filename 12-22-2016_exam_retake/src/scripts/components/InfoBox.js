import React, {Component} from "react";
import $ from "jquery";

import User from "../services/User";

export default class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            showing: false,
            type: ``,
            message: ``
        };

        this.timer = null;

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.autoHide = this.autoHide.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this.ajaxStart = this.ajaxStart.bind(this);
        this.handleResponse = this.handleResponse.bind(this);

        User.showInfo = this.show.bind(this);
    }

    componentDidMount() {
        $(document).on({
            ajaxStart: this.ajaxStart,
            ajaxStop: this.hide
        });
    }

    ajaxStart() {
        this.setState({ message: 'Loading...', type: 'loadingBox', showing: true });
    }

    hide() {
        this.setState({showing: false});
    }

    handleResponse(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;

        return errorMsg;
    }

    show(type, message) {
        if (typeof message === "object") {
            message = this.handleResponse(message);
        }

        this.setState({
            showing: true,
            type: type,
            message: message
        }, () => {
            this.autoHide();
        });
    }

    autoHide() {
        if (this.state.type === `infoBox`) {
            if (this.timer !== null) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({
                    showing: false
                })
            }, 3000);
        }
    }

    isVisible() {
        if (this.state.showing) {
            return (
                <div onClick={this.hide} id={this.state.type}>
                    {this.state.message}
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        return this.isVisible();
    }
}
 
