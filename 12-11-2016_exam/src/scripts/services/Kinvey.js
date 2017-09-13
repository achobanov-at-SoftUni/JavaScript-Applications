import $ from "jquery";

export default class Kinvey {

    static serviceUrl = `https://baas.kinvey.com/`;
    static appKey = `kid_r1y-QY9ml`;
    static appSecret = `b12b79140981442abe0034b1c9e08014`;
    static appAuthToken = btoa(`${Kinvey.appKey}:${Kinvey.appSecret}`);
    static getHeaders(type) {
        if (type === `basic`) {
            return {
                "Authorization": `Basic ${Kinvey.appAuthToken}`,
                "Content-Type": `application/json`
            }
        } else {
            return {
                "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
                "Content-Type": `application/json`
            }
        }
    }

    static get(module, urlPostfix, authorization) {
        let method = `GET`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.getHeaders(authorization);

        let request = {method, url, headers};
        return $.ajax(request);
    }

    static post(module, urlPostfix, authorization, data) {
        let method = `POST`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.getHeaders(authorization);

        let request = {method, url, headers, data: JSON.stringify(data)};
        return $.ajax(request);
    }

    static put(module, urlPostfix, authorization, data) {
        let method = `PUT`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.getHeaders(authorization);

        let request = {method, url, headers, data: JSON.stringify(data)};
        return $.ajax(request);
    }
    static del(module, urlPostfix, authorization) {
        let method = `DELETE`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.getHeaders(authorization);

        let request = {method, url, headers};
        return $.ajax(request);
    }
}

