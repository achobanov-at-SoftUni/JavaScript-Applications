import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import $ from "jquery";

import "./styles/index.css";
import App from "./scripts/views/App";
import HomeView from "./scripts/views/HomeView";
import LoginView from "./scripts/views/LoginView";
import RegisterView from "./scripts/views/RegisterView";
import ListBooksView from "./scripts/views/ListBooksView";
import EditBookView from "./scripts/views/EditBookView";
import CreateBookView from "./scripts/views/CreateBookView"

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/register" component={RegisterView}/>
            <Route path="/createBook" component={CreateBookView}/>
            <Route path="/listBooks" component={ListBooksView}/>
            <Route path="/listBooks/:bookData" component={EditBookView}/>
        </Route>
    </Router>,
    $(`#root`)[0]
);