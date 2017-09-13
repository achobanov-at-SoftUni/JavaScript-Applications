import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import Utils from "../services/Utils";
import User from "../services/User";

export default class MyMessagesTable extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };

        this.initMessages = this.initMessages.bind(this);

    }

    componentWillMount() {
        let query = {"recipient_username": sessionStorage.getItem(`username`)};
        Kinvey.get(`appdata`, `messages/?query=${JSON.stringify(query)}`, `kinvey`)
            .then(this.initMessages)
            .catch((response) => User.showMessage(`errorBox`, response));
    }

    initMessages(response) {
        let messages = [];
        for (let entry of response) {
            messages.push({
                id: entry._id,
                text: entry.text,
                sender_name: entry.sender_name,
                sender_username: entry.sender_username,
                recipient_username: entry.recipient_username,
                date: entry._kmd.ect
            });
        }

        this.setState({
            messages: messages
        });
    }

    render() {
        return (
            <section id="viewMyMessages">
                <h1>My Messages</h1>
                <div className="messages" id="myMessages">
                    <table>
                        <thead>
                        <tr>
                            <th>From</th>
                            <th>Message</th>
                            <th>Date Received</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.messages.map(x =>
                            <MessageRow
                                sender_name={x.sender_name}
                                sender_username={x.sender_username}
                                key={x.id}
                                text={x.text}
                                date={x.date} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class MessageRow extends Component {
    render() {
        return(
            <tr>
                <td>{Utils.formatSender(this.props.sender_name, this.props.sender_username)}</td>
                <td>{this.props.text}</td>
                <td>{Utils.formatDate(this.props.date)}</td>
            </tr>
        )
    }
}


 
