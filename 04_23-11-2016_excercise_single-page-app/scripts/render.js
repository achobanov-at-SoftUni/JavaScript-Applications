function renderError(err) {
    "use strict";
    $(`#errorBox`)
        .text(JSON.stringify(err))
        .show()
        .on(`click`, function() {
            $(this).fadeOut();
        })
}

function renderMessage(message) {
    $(`#infoBox`)
        .text(message)
        .show();
    setTimeout(function() {
        $(`#infoBox`).fadeOut();
    }, 5000);
}

function renderAds(data) {
    "use strict";
    for (let entry of data) {
        let id = entry._id;
        let title = entry.title;
        let publisher = entry.publisher;
        let datePublished = entry.datePublished;
        let description = entry.description;
        let price = entry.price;

        let newRow =
            `<tr data-id="${id}">` +
                `<td>${title}</td>` +
                `<td>${publisher}</td>` +
                `<td>${description}</td>` +
                `<td>${price}</td>` +
                `<td>${datePublished}</td>` +
                `<td>` +
                    `<a href="#" id="deleteAd">[Delete]</a>` +
                    `<a href="#" id="editAd">[Edit]</a>` +
                `</td>` +
            `</tr>`;

        $(`#ads tbody`).append($(newRow));
    }
}

module.exports = {renderError, renderMessage, renderAds};
 
