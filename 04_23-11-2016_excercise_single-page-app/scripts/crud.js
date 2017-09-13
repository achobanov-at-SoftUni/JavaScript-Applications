let renderMessage = require("./render.js").renderMessage;
let renderError = require("./render.js").renderError;
let renderAds = require("./render.js").renderAds;

const serviceUrl = `https:/baas.kinvey.com`;
const appKey = `kid_rySagHXze`;
const appSecret = `7f5e7b3d607240a981318285fa3267d9`;
const appAuthorization = `Basic ${btoa(appKey + ":" + appSecret)}`;

function loadAds() {
    "use strict";
    let method = `GET`;
    let url = serviceUrl + `/appdata/${appKey}/advertisements`;
    let headers = {
        "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
        "Content-Type": `application/json`
    };

    let request = {url, method, headers};
    $.ajax(request)
        .then(renderAds)
        .catch(renderError);
}

function login() {
    "use strict";
    let method = `POST`;
    let url = serviceUrl + `/user/${appKey}/login`;
    let headers = {
        "Authorization": appAuthorization,
        "Content-Type": `application/json`
    };
    let username = $(`#viewLogin .username`).val();
    let password = $(`#viewLogin .password`).val();
    let data = {username, password};

    let request = {method, url, headers, data: JSON.stringify(data)};
    $.ajax(request)
        .then(function(response) {
            sessionStorage.setItem('username', `${response.username}`);
            sessionStorage.setItem(`authToken`, `${response._kmd.authtoken}`);
            $(document).trigger(`changeView`, [`viewHome`]);
        })
        .catch(renderError);
}

function logout() {
    "use strict";
    sessionStorage.removeItem(`username`);
    $(document).trigger(`changeView`, [`viewHome`]);
}

function register() {
    "use strict";
    let method = `POST`;
    let url = serviceUrl + `/user/${appKey}/`;
    let headers = {
        "Authorization": appAuthorization,
        "Content-Type": `application/json`
    };
    let username = $(`#viewRegister .username`).val();
    let password = $(`#viewRegister .password`).val();
    let data = {username, password};

    let request = {method, url, headers, data: JSON.stringify(data)};
    $.ajax(request)
        .then(() => renderMessage(`Register successful`))
        .catch(renderError);
}

function deleteAd(event) {
    "use strict";
    let ad = $(event.target).parent().parent();
    let adId = ad.attr(`data-id`);

    let method = `DELETE`;
    let url = serviceUrl + `/appdata/${appKey}/advertisements/${adId}`;
    let headers = {
        "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
        "Content-Type": `application/json`
    };
    let request = {method, url, headers};

    $.ajax(request)
        .then(ad.remove())
        .catch(renderError);
}

function editAd() {
    "use strict";
    let adId = $(`#viewEditAd #id`).val();

    let method = `PUT`;
    let url = serviceUrl + `/appdata/${appKey}/advertisements/${adId}`;
    let headers = {
        "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
        "Content-Type": `application/json`
    };
    let data = {
        title: $(`#viewEditAd .title`).val(),
        description: $(`#viewEditAd .description`).val(),
        dataPublished: $(`#viewEditAd .date-published`).val(),
        price: $(`#viewEditAd .price`).val(),
        publisher: $(`#viewEditAd #publisher`).val()
    };
    let request = {method, url, headers, data: JSON.stringify(data)};

    $.ajax(request)
        .then(() => $(document).trigger(`changeView`, [`viewAds`]))
        .catch(renderError);
}

function createAd() {
    "use strict";
    let method = 'POST';
    let url = serviceUrl + `/appdata/${appKey}/advertisements`;
    let headers = {
        "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
        "Content-Type": `application/json`
    };
    let data = {
        title: $(`#viewCreateAd .title`).val(),
        description: $(`#viewCreateAd .description`).val(),
        datePublished: $(`#viewCreateAd .datePublished`).val(),
        price: $(`#viewCreateAd .price`).val(),
        publisher: sessionStorage.getItem(`username`)
    };

    let request = {method, url, headers, data: JSON.stringify(data)};
    $.ajax(request)
        .then(() => renderMessage(`Add Created successfully`))
        .catch(renderError);
}

module.exports = {login, register, deleteAd, editAd, createAd, logout, loadAds};

