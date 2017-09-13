let loadCanvas = require("./loadCanvas.js");
let crud = require("./crud.js");

let player = {};
let intervalId;
// attachStaticEvents();
// getPlayers();

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
    crud.getPlayers();
    $(`#save`).hide();
    $(`#reload`).hide();
    $(`#canvas`).hide();
    clearInterval(intervalId);
}

// let app = ;

module.exports = {player, startGame, saveGame, renderPlayers};
