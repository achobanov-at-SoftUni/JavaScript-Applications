import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import Utils from "../services/Utils";
import User from "../services/User";

export default class ArchiveTable extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };

        this.initMessages = this.initMessages.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.removeDeletedMessage = this.removeDeletedMessage.bind(this);
    }

    componentWillMount() {
        let query = {"sender_username": sessionStorage.getItem(`username`)};
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
                sent_time: entry._kmd.ect
            });
        }

        this.setState({
            messages: messages
        });
    }

    deleteMessage(id) {
        Kinvey.del(`appdata`, `messages/${id}`, `kinvey`)
            .then(() => {
                this.removeDeletedMessage(id)
                User.showMessage(`infoBox`, `Deleted Successfully.`)
            })
            .catch((response) => {
                User.showMessage(`errorBox`, response);
            });
    }

    removeDeletedMessage(id) {
        let messages = [];
        this.state.messages.filter(x => x.id !== id).forEach(x => messages.push(x));
        this.setState({
            messages: messages
        });
    }

    render() {
        return (
            <section id="viewArchiveSent">
                <h1>Archive (Sent Messages)</h1>
                <div className="messages" id="sentMessages">
                    <table>
                        <thead>
                        <tr>
                            <th>To</th>
                            <th>Message</th>
                            <th>Date Sent</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.messages.map(x =>
                            <MessageRow
                                key={x.id}
                                username={x.recipient_username}
                                text={x.text}
                                time={x.sent_time}
                                id={x.id}
                                delete={this.deleteMessage} />
                        )}
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
                <td>{this.props.username}</td>
                <td>{this.props.text}</td>
                <td>{Utils.formatDate(this.props.time)}</td>
                <td>
                    <DeleteButton id={this.props.id} delete={this.props.delete}/>
                </td>
            </tr>
        )
    }
}

class DeleteButton extends Component {
    render() {
        return (
            <button onClick={() => this.props.delete(this.props.id)}>Delete</button>
        )
    }
}
 
