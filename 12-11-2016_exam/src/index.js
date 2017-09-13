import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import $ from "jquery";

import "./styles/messages.css";
import App from "./scripts/App";
import HomeView from "./scripts/views/HomeView";
import LoginView from "./scripts/views/LoginView";
import RegisterView from "./scripts/views/RegisterView";
import MyMessagesView from "./scripts/views/MyMessagesView";
import ArchiveView from "./scripts/views/ArchiveView";
import SendMessageView from "./scripts/views/SendMessageView";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeView}/>
            <Route path="/login" component={LoginView} data={[`data`, `data2`]}/>
            <Route path="/register" component={RegisterView} />
            <Route path="/myMessages" component={MyMessagesView} />
            <Route path="/archive" component={ArchiveView} />
            <Route path="/sendMessage" component={SendMessageView} />
        </Route>
    </Router>,
    $(`#root`)[0]
);


