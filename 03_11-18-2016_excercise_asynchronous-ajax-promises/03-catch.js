function attachEvents() {
    "use strict";
    let serviceUrl = `https://baas.kinvey.com`;
    let appKey = `kid_HyVctTh-e`;
    let authToken = btoa(`admin:admin`);

    $(`.add`).on(`click`, function() {
        let angler = $(`#addForm .angler`).val();
        let weight = Number($(`#addForm .weight`).val());
        let species = $(`#addForm .species`).val();
        let location = $(`#addForm .location`).val();
        let bait = $(`#addForm .bait`).val();
        let captureTime = Number($(`#addForm .captureTime`).val());

        let method = `POST`;
        let url = serviceUrl + `/appdata/${appKey}/biggestCatches`;
        let headers = {
            "Authorization": `Basic ${authToken}`,
            "Content-Type": `application/json`
        };
        let data = {angler, weight, species, location, bait, captureTime};

        let request = {method, url, headers, data: JSON.stringify(data)};
        $.ajax(request)
            .then(logSuccess)
            .catch(logError)
    });

    $(`.load`).on(`click`, function() {
        $(`#catches`).empty();
        let method = `GET`;
        let url = serviceUrl + `/appdata/${appKey}/biggestCatches`;
        let headers = {
            "Authorization": `Basic ${authToken}`
        };

        let request = {method, url, headers};
        $.ajax(request)
            .then(processCatches)
            .catch(logError);
    });

    $(`#catches`).on(`click`, `.update`, function() {
        let angler = $(this).parent().find(`.angler`).val();
        let weight = $(this).parent().find(`.weight`).val();
        let species = $(this).parent().find(`.species`).val();
        let location = $(this).parent().find(`.location`).val();
        let bait = $(this).parent().find(`.bait`).val();
        let captureTime = $(this).parent().find(`.captureTime`).val();
        let id = $(this).parent().attr(`data-id`);

        let method = `PUT`;
        let url = serviceUrl + `/appdata/${appKey}/biggestCatches/${id}`;
        let headers = {
            "Authorization": `Basic ${authToken}`,
            "Content-Type": `application/json`
        };
        let data = {angler, weight, species, location, bait, captureTime};

        let request = {method, url, headers, data: JSON.stringify(data)};
        $.ajax(request)
            .then(logSuccess)
            .catch(logError)
    });

    $(`#catches`).on(`click`, `.delete`, function() {
        let id = $(this).parent().attr(`data-id`);

        let url = serviceUrl + `/appdata/${appKey}/biggestCatches/${id}`;
        let method = `DELETE`;
        let headers = {
            "Authorization": `Basic ${authToken}`,
            "Content-Type": `application/json`
        };

        let request = {url, method, headers};
        $.ajax(request)
            .then(() => $(this).parent().remove())
            .catch(logError);
    });

    function processCatches(data) {
        let catches = [];
        for (let item of data) {
            let id = item._id;
            let angler = item.angler;
            let weight = item.weight;
            let species = item.species;
            let location = item.location;
            let bait = item.bait;
            let captureTime = item.captureTime;

            let newCatch = new Catch(angler, weight, species, location, bait, captureTime, id);

            catches.push(newCatch);
        }

        catches.forEach(x => x.render());
    }

    class Catch {
        constructor(angler, weight, species, location, bait, captureTime, id) {
            this.angler = angler;
            this.weight = Number(weight);
            this.species = species;
            this.location = location;
            this.bait = bait;
            this.captureTime = Number(captureTime);
            this._id = id;
        }

        get id() { return this._id; }
        set id(id) { this._id = id; }

        render() {
            let html =
                `<div class="catch" data-id="${this._id}">` +
                `<label>Angler</label>` +
                `<input type="text" class="angler" value="${this.angler}"/>` +
                `<label>Weight</label>` +
                `<input type="number" class="weight" value="${this.weight}"/>` +
                `<label>Species</label>` +
                `<input type="text" class="species" value="${this.species}"/>` +
                `<label>Location</label>` +
                `<input type="text" class="location" value="${this.location}"/>` +
                `<label>Bait</label>` +
                `<input type="text" class="bait" value="${this.bait}"/>` +
                `<label>Capture Time</label>` +
                `<input type="number" class="captureTime" value="${this.captureTime}"/>` +
                `<button class="update">Update</button>` +
                `<button class="delete">Delete</button>` +
                `</div>`;

            $(`#catches`).append($(html));
        }
    }

    function logSuccess(_data) {
        console.log(`Success!`);
    }

    function logError(err) {
        throw new Error(err);
    }
}
