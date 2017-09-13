import React, {Component} from "react";

import User from "../services/User";
import AppHome from "../components/AppHome";
import UserHome from "../components/UserHome";

export default class HomeView extends Component{
    render() {
        return User.isLoggedIn()? <UserHome/>: <AppHome/>;
    }
}
 
