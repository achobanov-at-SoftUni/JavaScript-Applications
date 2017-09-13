let loadCanvas = require("./loadCanvas.js");

const appKey = `kid_H1nVuIIGl`;
const serviceUrl = `https://baas.kinvey.com`;
const authToken = btoa(`admin:admin`);
const headers = {
    "Authorization": `Basic ${authToken}`,
    "Content-Type": `application/json`
};

let player;
let intervalId;
attachStaticEvents();
getPlayers();

function attachStaticEvents() {
    $(`#save`).on(`click`, function() {
        updatePlayerData();
    });

    $(`#reload`).on(`click`, function() {
        player.money -= 60;
        player.bullets = 6;
    });

    $(`#addPlayer`).on(`click`, function() {
        let name = $(`#addName`).val();
        createPlayer(name);
    });
}

function attachDynamicEvents() {
    $(`.play`).on(`click`, function(event) {
        if (player) updatePlayerData();
        startGame(event);
    });

    $(`.delete`).on(`click`, function(event) {
        let id = $(event.target).parent().attr(`data-id`);
        deletePlayer(id);
    });
}

function renderPlayers(response) {
    $(`#players`).empty();
    for (let entry of response) {
        let id = entry._id;
        let name = entry.name;
        let money = entry.money;
        let bullets = entry.bullets;

        let template =
            `<div class="player" data-id="${id}">
                <div class="row">
                    <label>Name:</label>
                    <label class="name">${name}</label>
                </div>
                <div class="row">
                    <label>Money:</label>
                    <label class="money">${money}</label>
                </div>
                <div class="row">
                    <label>Bullets:</label>
                    <label class="bullets">${bullets}</label>
                </div>
                <button class="play">Play</button>
                <button class="delete">Delete</button>
            </div>`;

        $(`#players`).append($(template));
    }
}

function startGame(event) {
    initPlayer(event);
    $(`#save`).show();
    $(`#reload`).show();
    $(`#canvas`).show();

    intervalId = loadCanvas(player);
}

function initPlayer(event) {
    let id = $(event.target).parent().attr(`data-id`);
    let name = $(`[data-id="${id}"] .name`).text();
    let money = Number($(`[data-id="${id}"] .money`).text());
    let bullets = Number($(`[data-id="${id}"] .bullets`).text());
    player = {name, money, bullets, _id: id};
}

function saveGame() {
    getPlayers();
    $(`#save`).hide();
    $(`#reload`).hide();
    $(`#canvas`).hide();
    clearInterval(intervalId);
}

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
                renderPlayers(response);
                resolve();
            })
            .catch(reject);
    });

    $.when(ajaxFinished).done(attachDynamicEvents);
}

function updatePlayerData() {
    saveGame();

    let method = `PUT`;
    let url = serviceUrl + `/appdata/${appKey}/players/${player._id}`;

    let request = {method, url, headers, data: JSON.stringify(player)};
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

