import {browserHistory} from "react-router";

import Kinvey from "./Kinvey";

export default class User {

    static register() {
        browserHistory.push(`/login`);
    }
    static login(response) {
        sessionStorage.setItem('username', `${response.username}`);
        sessionStorage.setItem('name', `${response.name}`);
        sessionStorage.setItem(`authToken`, `${response._kmd.authtoken}`);
        browserHistory.push(`/`);
    }

    static logout() {
        Kinvey.post(`user`, `_logout`, `kinvey`)
            .then(() => {
                sessionStorage.clear();
                User.showMessage(`infoBox`, `Logout successful`);
                browserHistory.push(`/`);
            })
            .catch(response => {
                User.showMessage(`errorBox`, response);
            });
    }

    static sendMessage() {
        User.showMessage(`infoBox`, `Message Sent.`);
        browserHistory.push(`/archive`);
    }

    static isLoggedIn() {
        return sessionStorage.getItem(`username`)
    }

    static showMessage() {}
}

