let app = require("./app.js");
let events = require("./events.js");

const appKey = `kid_H1nVuIIGl`;
const serviceUrl = `https://baas.kinvey.com`;
const authToken = btoa(`admin:admin`);
const headers = {
    "Authorization": `Basic ${authToken}`,
    "Content-Type": `application/json`
};

function getPlayers() {
    "use strict";
    let method = `GET`;
    let url = serviceUrl + `/appdata/${appKey}/players`;

    let request = {method, url, headers};
    // Same thing as the new Promise bellow. Its shorter, but weirder.
    // let promise = $.ajax(request)
    //     .then(renderPlayers);

    let ajaxFinished = new Promise((resolve, reject) => {
        $.ajax(request)
            .then(function(response) {
                app.renderPlayers(response);
                resolve();
            })
            .catch(reject);
    });

    $.when(ajaxFinished).done(events.attachDynamicEvents);
}

function updatePlayerData() {
    app.saveGame();

    let method = `PUT`;
    let url = serviceUrl + `/appdata/${appKey}/players/${app.player._id}`;

    let request = {method, url, headers, data: JSON.stringify(app.player)};
    $.ajax(request)
        .then(getPlayers);
}

function createPlayer(name) {
    let method = `POST`;
    let url = serviceUrl + `/appdata/${appKey}/players`;
    let data = {
        name,
        money: 500,
        bullets: 6
    };

    let request = {method, url, headers, data: JSON.stringify(data)};
    $.ajax(request)
        .then(getPlayers);
}

function deletePlayer(id) {
    let method = `DELETE`;
    let url = serviceUrl + `/appdata/${appKey}/players/${id}`;

    let request = {method, url, headers};
    $.ajax(request)
        .then(() => $(`[data-id="${id}"]`).remove());
}

let crud = {getPlayers, updatePlayerData, createPlayer, deletePlayer};
module.exports = crud;