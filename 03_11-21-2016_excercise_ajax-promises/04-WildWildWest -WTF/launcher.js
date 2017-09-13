"use strict";

let attachStaticEvents = require("./events.js").attachStaticEvents;
let getPlayers = require("./crud.js").getPlayers;

attachStaticEvents();
getPlayers();

