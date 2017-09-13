let login = require("./crud.js").login;
let register = require("./crud.js").register;
let deleteAd = require("./crud.js").deleteAd;
let editAd = require("./crud.js").editAd;
let createAd = require("./crud.js").createAd;
let logout = require("./crud.js").logout;
let loadAds = require("./crud.js").loadAds;

let wrapper = $(document);

function attachEvents() {
    "use strict";
    // View switcher
    wrapper.on(`changeView`, function(event, view) {
        $(`main > section`).hide();
        $(`#${view}`).show();
        updateNavigation(view);
        if (view === `viewAds`) {
            $(`#viewAds td`).remove();
            loadAds();
        }
    });

    // Loading message event
    wrapper.on({
        ajaxStart: function() {$(`#loadingBox`).show()},
        ajaxStop: function() {$(`#loadingBox`).hide()}
    });

    // Navigation events
    $(`#menu #linkHome`).on(`click`, viewHomePage);
    $(`#menu #linkLogin`).on(`click`, viewLoginPage);
    $(`#menu #linkRegister`).on(`click`, viewRegisterPage);
    $(`#menu #linkListAds`).on(`click`, viewAdPage);
    $(`#menu #linkCreateAd`).on(`click`, viewCreateAd);
    $(`#menu #linkLogout`).on(`click`, logout);

    // Error message event
    wrapper.on(`click`, `#errorBox`, function() {
        $(this).fadeOut();
    });

    // Login view events
    $(`#viewLogin #buttonLoginUser`).on(`click`, login);

    // Register view events
    $(`#viewRegister #buttonRegisterUser`).on(`click`, register);

    // View ads events
    $(document).on(`click`, `#deleteAd`, function(event) {
        deleteAd(event)
    });

    $(document).on(`click`, `#editAd`, function(event) {
        viewEditAd(event);
    });

    // Create ad events
    $(`#viewCreateAd #buttonCreateAd`).on(`click`, createAd);

    // Edit ad events
    $(`#viewEditAd #buttonEditAd`).on(`click`, editAd);

}

// Change page events
function viewHomePage() {
    "use strict";
    wrapper.trigger(`changeView`, [`viewHome`]);
}

function viewLoginPage() {
    "use strict";
    wrapper.trigger(`changeView`, [`viewLogin`]);
}

function viewRegisterPage() {
    "use strict";
    wrapper.trigger(`changeView`, [`viewRegister`]);
}

function viewAdPage() {
    "use strict";
    wrapper.trigger(`changeView`, [`viewAds`]);
}

function viewCreateAd() {
    "use strict";
    wrapper.trigger(`changeView`, [`viewCreateAd`]);
}

function viewEditAd(event) {
    "use strict";
    wrapper.trigger(`changeView`, [`viewEditAd`]);
    fillHiddenData(event);
}

function fillHiddenData(event) {
    "use strict";
    let id = $(event.target).parent().parent().attr(`data-id`);
    let newPublisher = sessionStorage.getItem(`username`);

    $(`#viewEditAd #id`).val(id);
    $(`#viewEditAd #publisher`).val(newPublisher);
}

// Visibility of buttons on nav buttons on every page.
function updateNavigation(view) {
    "use strict";
    if (sessionStorage.getItem(`username`)) {
        $(`#linkLogin`).hide();
        $(`#linkRegister`).hide();

        switch(view) {
            case`viewAds`:
                $(`#linkListAds`).hide();
                $(`#linkHome`).show();
                $(`#linkCreateAd`).show();
                $(`#linkLogout`).show();
                break;
            case`viewCreateAd`:
                $(`#linkCreateAd`).hide();
                $(`#linkHome`).show();
                $(`#linkListAds`).show();
                $(`#linkLogout`).show();
                break;
            case`viewEditAd`:
                $(`#linkHome`).show();
                $(`#linkListAds`).show();
                $(`#linkCreateAd`).show();
                $(`#linkLogout`).show();
                break;
            case`viewHome`:
                $(`#linkHome`).hide();
                $(`#linkListAds`).show();
                $(`#linkCreateAd`).show();
                $(`#linkLogout`).show();
                break;
        }
    } else {
        $(`#linkHome`).show();
        $(`#linkLogin`).show();
        $(`#linkRegister`).show();
        $(`#linkListAds`).hide();
        $(`#linkCreateAd`).hide();
        $(`#linkLogout`).hide();
    }
}

module.exports = attachEvents;



 
