"use strict";

let attachEvents = require("./events.js");

attachEvents(); // Attaching listeners to all buttons and links.
$(document).trigger(`changeView`, [`viewHome`]); // home page




