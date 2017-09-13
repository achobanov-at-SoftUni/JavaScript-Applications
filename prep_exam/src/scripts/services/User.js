import {browserHistory} from "react-router";

export default class User {

    static login(response) {
        sessionStorage.setItem('username', `${response.username}`);
        sessionStorage.setItem(`authToken`, `${response._kmd.authtoken}`);
        browserHistory.push(`/`);
    }

    static logout() {
        sessionStorage.clear();
        browserHistory.push(`/`);
    }

    static isLoggedIn() {
        return sessionStorage.getItem(`username`)
    }
}

