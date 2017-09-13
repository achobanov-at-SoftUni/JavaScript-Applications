/* Не е много красиво, ама нямам време за стил. Не препоръчвам да ползвате класове така.. Опитах се - не е хубаво :Д.
 * Възникват тъпи проблеми като трябва да се рендерват градовете за всяка страна. Описано е в коментарите. Долу съм ги писал на английски, за да съм готин :) Поздрав! */

const appKey = `kid_rk3gbuNGx`;
const serviceUrl = `https://baas.kinvey.com`;
const authtoken = btoa(`admin:admin`);
const headers = {
    "Authorization": `Basic ${authtoken}`,
    "Content-Type": `application/json`
};

// Revealing module pattern - the scope inside is total mess, because of inefficient class implementation.
let app = (function() {
    "use strict";
    // Class for country. Stores relative data and attaches events to each button, personally.
    class Country {
        constructor(name, id) {
            this.name = name;
            this.id = id;
        }

        get name() { return this._name; }
        get id() { return this._id; }

        set name(name) { this._name = name; }
        set id(id) { this._id = id; }

        render() {
            let that = this;
            let newCountry = $(`<div>`)
                .addClass(`country`)
                .attr(`id`, `${this.id}`)
                .append($(`<span>`).text(this.name))
                .append($(`<input>`)
                    .addClass(`country-input`)
                    .attr(`type`, `text`)
                    .attr(`placeholder`, `New country name...`))
                .append($(`<a>`)
                    .addClass(`country-edit`)
                    .attr(`href`, `#`)
                    .text(`[Edit]`)
                    .on(`click`, function () {
                        that.edit();
                    }))
                .append($(`<a>`)
                    .addClass(`country-delete`)
                    .attr(`href`, `#`)
                    .text(`[Delete]`)
                    .on(`click`, function() {
                        that.delete();
                    }))
                .append($(`<input>`)
                    .addClass(`newTown`)
                    .attr(`placeholder`, `Town name..`)
                    .attr(`type`, `text`))
                .append($(`<input>`)
                    .attr(`value`, `Create`)
                    .attr(`type`, `button`)
                    .on(`click`, function() {
                        let name = $(`#${that.id} .newTown`).val();
                        let country = that.name;

                        let method = `POST`;
                        let url = serviceUrl + `/appdata/${appKey}/towns`;
                        let data = {name, country};

                        let request = {method, url, headers, data: JSON.stringify(data)};
                        $.ajax(request)
                            .then((data) => new Town(data.name, data.country, data._id).render(that.id));
                    }))
                .append($(`<div>`)
                    .addClass(`towns`)
                    .attr(`style`, `display:none`));

            $(`#countries`).append($(newCountry));
        }

        edit() {
            this.name = $(`#${this.id} .country-input`).val();
            $(`#${this.id} .country-input`).val(``);
            let method = `PUT`;
            let url = serviceUrl + `/appdata/${appKey}/countries/${this.id}`;
            let headers = {
                "Authorization": `Basic ${authtoken}`,
                "Content-Type": `application/json`
            };
            let data = {
                name: this.name
            };

            let request = {method, url, headers, data: JSON.stringify(data)};
            $.ajax(request)
                .then(() => $(`#${this.id} span`).text(this.name));
        }

        delete() {
            let method = `DELETE`;
            let url = serviceUrl + `/appdata/${appKey}/countries/${this.id}`;

            let request = {method, url, headers};
            $.ajax(request)
                .then(() => $(`#${this.id}`).remove());
        }
    }
    // Same but for towns.
    class Town {
        constructor(name, country, id) {
            this.name = name;
            this.country = country;
            this.id = id;
        }

        set name(name) {this._name = name;}
        set country(country) {this._country = country;}
        set id(id) {this._id = id;}

        get name() {return this._name;}
        get country() {return this._country;}
        get id() {return this._id;}

        render(selector) {
            let that = this;
            let newTown = $(`<div>`)
                .addClass(`town`)
                .attr(`id`, `${this.id}`)
                .append($(`<span>`).text(this.name))
                .append($(`<input>`)
                    .addClass(`town-input`)
                    .attr(`type`, `text`)
                    .attr(`placeholder`, `New name`))
                .append($(`<input>`)
                    .addClass(`town-country-input`)
                    .attr(`type`, `text`)
                    .attr(`placeholder`, `New country`))
                .append($(`<a>`)
                    .attr(`href`, `#`)
                    .text(`[Edit]`)
                    .on(`click`, function () {
                        that.edit();
                    }))
                .append($(`<a>`)
                    .attr(`href`, `#`)
                    .text(`[Delete]`)
                    .on(`click`, function() {
                        that.delete();
                    }));
            if (!selector) selector = countryId;
            $(`#${selector} .towns`).append($(newTown));
        }

        edit() {
            let name = $(`#${this.id} .town-input`).val();
            let country = $(`#${this.id} .town-country-input`).val();
            if (name !== "") this.name = name;
            if (country !== "") this.country = country;
            let method = `PUT`;
            let url = serviceUrl + `/appdata/${appKey}/towns/${this._id}`;

            let data = {
                name: this.name,
                country: this.country
            };

            let request = {method, url, headers, data: JSON.stringify(data)};
            let that = this;
            $.ajax(request)
                // .then(() => $(`#${this.id} span`).text(this.name));
                .then(function() {
                    $(`#${that.id}`).remove();
                    that.render();
                });
        }

        delete() {
            let method = `DELETE`;
            let url = serviceUrl + `/appdata/${appKey}/towns/${this._id}`;

            let request = {method, url, headers};
            $.ajax(request)
                .then(() => $(`#${this.id}`).remove());
        }

    }

    let country, countryId; // Necessary evils. Otherwise I cannot access that data, when I need it. Because of inefficient class usage.

    // Filters towns relative to the current county, then builds classes for each and renders them.
    function processTowns(data) {
        for (let entry of data) {
            if (entry.country === country) {
                new Town(entry.name, entry.country, entry._id).render();
            }
        }

        $(`#${countryId} .towns`).show();
    }

    // Same, without filtering.
    function processCountries(data) {
        for (let entry of data) {
            new Country(entry.name, entry._id).render();
        }
    }

    function loadCountries() {
        let method = `GET`;
        let url = serviceUrl + `/appdata/${appKey}/countries`;

        let request = {url, headers, method};
        $.ajax(request)
            .then(processCountries);
    }

    function start() { // Starts the app
        // Showing towns event
        $(document).on(`click`, `.country span`, function() {
            console.log(`kon`);
            country = $(this).text();
            countryId = $(this).parent().attr(`id`);
            $(`#${countryId} .towns`).empty();

            let method = `GET`;
            let url = serviceUrl + `/appdata/${appKey}/towns`;

            let request = {method, url, headers};
            $.ajax(request)
                .then(processTowns);
        });

        // Create new country event
        $(`#createCountry`).on(`click`, function() {
            let name = $(`#newCountry`).val();

            let method = `POST`;
            let url = serviceUrl + `/appdata/${appKey}/countries`;
            let data = {name};

            let request = {method, url, headers, data: JSON.stringify(data)};
            $.ajax(request)
                .then((data) => new Country(data.name, data._id).render());
        });

        loadCountries();
    }

    return { start };
})();

app.start();