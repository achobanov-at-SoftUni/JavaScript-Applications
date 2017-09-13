let app = require("./app.js");
let crud = require("./crud.js");

function attachStaticEvents() {
    $(`#save`).on(`click`, function() {
        crud.updatePlayerData();
    });

    $(`#reload`).on(`click`, function() {
        app.player.money -= 60;
        app.player.bullets = 6;
    });

    $(`#addPlayer`).on(`click`, function() {
        let name = $(`#addName`).val();
        crud.createPlayer(name);
    });
}

function attachDynamicEvents() {
    $(`.play`).on(`click`, function(event) {
        if (app.player) crud.updatePlayerData();
        app.startGame(event);
    });

    $(`.delete`).on(`click`, function(event) {
        let id = $(event.target).parent().attr(`data-id`);
        crud.deletePlayer(id);
    });
}

let events = {attachStaticEvents, attachDynamicEvents};
module.exports = events;
 
