function solve() {
    function ajax(key, baseUrl) {
        "use strict";
        let method = `GET`;
        let url = baseUrl + key + `.json`;

        let request = {
            method,
            url,
        };

        $.ajax(request)
            .then(renderData);
            // .catch(renderError);
    }

    function renderData(data) {
        "use strict";
        if (data === undefined) {
            let text = $(`span.info`).text().split(` `);
            let stopName = text.splice(2).join(` `);
            $(`span.info`).text(`Arriving at ${stopName}`);
        } else {
            $(`span.info`).text(`Next stop ${data.name}`);
            nextStop = data;
        }
    }

    let baseUrl = `https://judgetests.firebaseio.com/schedule/`;
    let nextStop = {
        next: `depot`
    };

    function depart() {
        "use strict";
        ajax(nextStop.next, baseUrl);
        $(`#depart`).attr(`disabled`, true);
        $(`#arrive`).removeAttr(`disabled`);
    }

    function arrive() {
        "use strict";
        renderData();
        $(`#depart`).removeAttr(`disabled`);
        $(`#arrive`).attr(`disabled`, true);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
 
