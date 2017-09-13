// Revealing module pattern
let app = (function() {
    "use strict";
    const serviceUrl = `https://baas.kinvey.com`;
    const appKey = `kid_BJ_Ke8hZg`;
    const headers = {
        "Authorization": `Basic ${btoa(`guest:pass`)}`,
        "Content-Type": `application/json`
    };

    function start() { // Starts the app.
        // List venues event
        $(`#getVenues`).on(`click`, function() {
            $(`#venue-info`).empty();
            let date = $(`#venueDate`).val();
            getVenueIds(date);
        })
    }

    // Get venue ids
    function getVenueIds(date) {
        let method = `POST`;
        let url = serviceUrl + `/rpc/${appKey}/custom/calendar?query=${date}`;

        let request = {method, url, headers};
        $.ajax(request)
            .then(listVenues)
            .catch((err) => console.log(JSON.stringify(err)));
    }

    function listVenues(data) {
        let deferreds = []; // Array to store ajax promises
        for (let id of data) {
            deferreds.push(getVenue(id));
        }
        $.when.apply($, deferreds).done(attachVenueEvents); // Waits for all ajax deferreds and then attaches events.
    }

    function getVenue(id) {
        let method = `GET`;
        let url = serviceUrl + `/appdata/${appKey}/venues/${id}`;

        let request = {method, url, headers};
        let ajax = $.ajax(request)
            .then(renderVenue)
            .catch((err) => console.log(err));

        return ajax; // Returns object to be used as jQuery deferred.
    }

    function renderVenue(venue) {
        let id = venue._id;
        let name = venue.name;
        let description = venue.description;
        let startingHour = venue.startingHour;
        let price = venue.price;

        let template =
            `<div class="venue" id="${id}">` +
            `    <span class="venue-name"><input class="info" type="button" value="More info">${name}</span>` +
            `    <div class="venue-details" style="display: none;">` +
            `        <table>` +
            `            <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>` +
            `            <tr>` +
            `                <td class="venue-price">${price} lv</td>` +
            `                <td>` +
            `                    <select class="quantity">` +
            `                        <option value="1">1</option>` +
            `                        <option value="2">2</option>` +
            `                        <option value="3">3</option>` +
            `                        <option value="4">4</option>` +
            `                        <option value="5">5</option>` +
            `                    </select>` +
            `                </td>` +
            `            <td><input class="purchase" type="button" value="Purchase"></td>` +
            `            </tr>` +
            `        </table>` +
            `        <span class="head">Venue description:</span>` +
            `        <p class="description">${description}</p>` +
            `        <p class="description">Starting time: ${startingHour}</p>` +
            `    </div>` +
            `</div>`;

        $(`#venue-info`).append($(template));
    }

    function attachVenueEvents() {
        // Collapse all and expand selected venue's details
        $(`.info`).on(`click`, function(event) {
            console.log(`yo`);
            $(`.venue-details`).hide();
            $(`#${$(event.target).parent().parent().attr(`id`)}`)
                .find(`.venue-details`)
                .show();
        });

        // Purchase
        let quantity, id;
        $(`.purchase`).on(`click`, function() {
            let venue = $(this).parent().parent().parent().parent().parent();
            let name = venue.find(`.venue-name`).text();
            let price = Number(venue.find(`.venue-price`).text().replace(` lv`, ``));
            quantity = Number(venue.find(`.quantity`).val());
            id = venue.attr(`id`);
            changeViewToConfirmation(name, price, quantity);
        });

        // Confirm purchase
        $(`#venue-info`).on(`click`, `.purchase-info input`, function() {
            let method = `POST`;
            let url = serviceUrl + `/rpc/${appKey}/custom/purchase?venue=${id}&=${quantity}`;

            let request = {method, url, headers};
            $.ajax(request)
                .then(changeViewToPurchased)
                .catch((err) => console.log(err));
        })
    }
    // Change view functions
    function changeViewToConfirmation(name, price, quantity) {
        let template =
            `<span class="head">Confirm purchase</span>` +
            `<div class="purchase-info">` +
                `<span>${name}</span>` +
                `<span>${quantity} x ${price}</span>` +
                `<span>Total: ${quantity * price} lv</span>` +
                `<input type="button" value="Confirm">` +
            `</div>`;

        $(`#venue-info`).html(template);
    }

    function changeViewToPurchased(response) {
        let message = `You may print this page as your ticket`;
        let html = response.html;
        $(`#venue-info`)
            .append($(`<span>`).text(message))
            .append($(html));
    }

    return { start }
})();
 
app.start();