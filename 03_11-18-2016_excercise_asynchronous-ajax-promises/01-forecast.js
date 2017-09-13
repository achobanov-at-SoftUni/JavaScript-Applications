function attachEvents() {
    "use strict";
    let serviceUrl = `https://judgetests.firebaseio.com`;
    let location;
    let conditions = {
        "Sunny": `☀`,
        "Partly sunny": `⛅`,
        "Overcast":`☁`,
        "Rain": `☂`,
        "Degrees": `°`
    };

    $(`#submit`).on(`click`, function() {
        location = $(`#location`).val();
        let url = `${serviceUrl}/locations.json`;
        ajaxGet(url, matchLocation, handleError);
        $(`#forecast`).removeAttr(`style`);
    });

    function ajaxGet(url, resolve, error) {
        let method = `GET`;
        let request = {url, method};

        $.ajax(request)
            .then(resolve)
            .catch(error);
    }

    function matchLocation(data) {
        let locationCode;
        for (let obj of data) {
            if (obj.name === location) {
                locationCode = obj.code;
                break;
            }
        }

        let url = `${serviceUrl}/forecast/today/${locationCode}.json`;
        ajaxGet(url, renderTodayForecast, handleError);

        url = `${serviceUrl}/forecast/upcoming/${locationCode}.json`;
        ajaxGet(url, render3DayForecast, handleError);
    }

    function render3DayForecast(data) {
        let eachDayData = [];
        let degrees = conditions.Degrees;
        for (let temp of data.forecast) {
            eachDayData.push({
                low: temp.low,
                high: temp.high,
                condition: temp.condition
            });
        }
        for (let elem of eachDayData) {
            let dailyForecast = $(`<span>`).addClass(`upcoming`)
                .append($(`<span>`).text(`${conditions[elem.condition]}`).addClass(`symbol`))
                .append($(`<span>`).text(`${elem.low}${degrees}/${elem.high}${degrees}`).addClass(`forecast-data`))
                .append($(`<span>`).text(elem.condition).addClass(`forecast-data`));

            $(`#upcoming`).append(dailyForecast);
        }
    }

    function renderTodayForecast(data) {
        let location = data.name;
        let low = data.forecast.low;
        let high = data.forecast.high;
        let condition = data.forecast.condition;
        let degrees = conditions.Degrees;
        let symbol = $(`<span>`).text(`${conditions[condition]}`).addClass(`condition symbol`);
        let forecast = $(`<span>`).addClass(`condition`)
            .append($(`<span>`).text(location).addClass(`forecast-data`))
            .append($(`<span>`).text(`${low}${degrees}/${high}${degrees}`).addClass(`forecast-data`))
            .append($(`<span>`).text(condition).addClass(`forecast-data`));

        $(`#current`)
            .append(symbol)
            .append(forecast);

    }

    function handleError(_err) {
        $(`#current`).find(`p`).remove();
        $(`#current`).append($(`<p>`).text(`Error`))
            .removeAttr(`style`);
    }
}
 
