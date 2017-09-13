import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import Utils from "../services/Utils";
import User from "../services/User";

export default class MessageForm extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            text: undefined,
            sender_name: sessionStorage.getItem(`name`),
            sender_username: sessionStorage.getItem(`username`),
            recipient_username: undefined,
        };

        this.addUsers = this.addUsers.bind(this);
        this.handleRecipientInput = this.handleRecipientInput.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        Kinvey.get(`user`, ``, `kinvey`)
            .then(this.addUsers)
            .catch((response) => User.showMessage(response));
    }

    addUsers(response) {
        let users = [];
        response.forEach(x => users.push({id: x._id, name: x.name, username: x.username}));
        this.setState({
            users: users
        });
    }

    handleRecipientInput(event) {
        let username = event.target.value;
        this.recipientPromise = new Promise((resolve, reject) => {
            this.setState({
                recipient_username: username
            }, resolve());
        });
    }

    handleTextInput(event) {
        let text = event.target.value;
        this.textPromise = new Promise((resolve, reject) => {
            this.setState({
                text: text
            }, resolve());
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            text: this.state.text,
            sender_name: this.state.sender_name,
            sender_username: this.state.sender_username,
            recipient_username: this.state.recipient_username
        };

        Promise.all([this.recipientPromise, this.textPromise]).then(() => {
            Kinvey.post(`appdata`, `messages`, `kinvey`, data)
                .then(() => {
                    User.sendMessage();
                });
                // .catch(response => {
                //     User.showMessage(`errorBox`, response)
                // });
        });

    }

    render() {
        return (
            <section id="viewSendMessage">
                <h1>Send Message</h1>
                <form id="formSendMessage" onSubmit={this.handleSubmit}>
                    <div>Recipient:</div>
                    <div>
                        <select onChange={this.handleRecipientInput} name="recipient" required id="msgRecipientUsername">
                            {this.state.users.map(x =>
                                <option key={x.id} value={x.username}>{Utils.formatSender(x.name, x.username)}</option>
                            )}
                        </select>
                    </div>
                    <div>Message Text:</div>
                    <div><input onChange={this.handleTextInput} type="text" name="text" required id="msgText" /></div>
                    <div><input type="submit" value="Send" /></div>
                </form>
            </section>
        );
    }
}
 
