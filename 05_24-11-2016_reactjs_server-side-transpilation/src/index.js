import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import {Message} from "./Template";
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ListBooksView from './views/ListBooksView';
import CreateBookView from './views/CreateBookView';
import EditBookView from './views/EditBookView';
import './styles/index.css';

changeView(`home`);

// View changer
function changeView(view, id) {
    let component;
    switch(view) {
        case`home`: component = <HomeView/>; break;
        case`login`: component = <LoginView/>; break;
        case`register`: component = <RegisterView/>; break;
        case`listBooks`: component = <ListBooksView/>; break;
        case`createBook`: component = <CreateBookView/>; break;
        case`editBook`: component = <EditBookView id={id}/>; break;
        default: break;
    }

    ReactDOM.render(
        component,
        $(`#root`)[0]
    );
}

// Success / Error messages.
function renderMessage(message) {
    ReactDOM.render(
        <Message type="success" message={message} />,
        $(`#info`)[0]
    );

    setTimeout(() => $(`#info`).empty(), 3000);
}

function renderError(message) {
    ReactDOM.render(
        <Message type="error" message={message} />,
        $(`#info`)[0]
    );

    $(`#error`).on(`click`, function() {
        $(`#info`).empty();
    });
}

export {changeView, renderMessage, renderError};
