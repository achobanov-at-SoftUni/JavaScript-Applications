import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import $ from "jquery";

import "./styles/market.css";
import App from "./scripts/App";
import HomeView from "./scripts/views/HomeView";
import LoginView from "./scripts/views/LoginView";
import RegisterView from "./scripts/views/RegisterView";
import ShopView from "./scripts/views/ShopView";
import CartView from "./scripts/views/CartView";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeView}/>
            <Route path="/login" component={LoginView} data={[`data`, `data2`]}/>
            <Route path="/register" component={RegisterView} />
            <Route path="/shop" component={ShopView} />
            <Route path="/cart" component={CartView} />
        </Route>
    </Router>,
    $(`#root`)[0]
);


