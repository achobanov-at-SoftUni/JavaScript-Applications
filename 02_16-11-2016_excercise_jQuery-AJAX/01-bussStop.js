function getInfo() {
    function ajax(key, baseUrl) {
        "use strict";
        let method = `GET`;
        let url = baseUrl + key + `.json`;

        let request = {
            method,
            url,
        };

        $.ajax(request)
            .then(renderData)
            .catch(renderError);
    }

    function renderData(data) {
        "use strict";
        let busesData = data.buses;
        $(`#stopName`).text(data.name);
        for (let buss in busesData) {
            $(`#buses`)
                .append($(`<li>`).text(`Bus ${buss} arrives in ${busesData[buss]} minutes`));
        }
    }

    function renderError() {
        "use strict";
        $(`#stopName`).text(`Error`);
    }

    $(`#stopName`).empty();
    $(`#buses`).empty();
    let baseUrl = `https://judgetests.firebaseio.com/businfo/`;
    let bussStop = $(`#stopId`).val();

    ajax(bussStop, baseUrl);
}
 
