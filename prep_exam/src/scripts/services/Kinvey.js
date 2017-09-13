import $ from "jquery";

export default class Kinvey {

    static serviceUrl = `https://baas.kinvey.com/`;
    static appKey = `kid_rkAC3QPGg`;
    static appSecret = `694bbb30eb2e43b49ae40d4b54f2eafb`;
    static appAuthToken = btoa(`${Kinvey.appKey}:${Kinvey.appSecret}`);
    static headers = {
        kinvey: {
            "Authorization": `Kinvey ${sessionStorage.getItem(`authToken`)}`,
            "Content-Type": `application/json`
        },
        basic: {
            "Authorization": `Basic ${Kinvey.appAuthToken}`,
            "Content-Type": `application/json`
        }
    };

    static get(module, urlPostfix, headersType) {
        let method = `GET`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.headers[headersType];

        let request = {method, url, headers};
        return $.ajax(request);
    }

    static post(module, urlPostfix, headersType, data) {
        let method = `POST`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.headers[headersType];

        let request = {method, url, headers, data: JSON.stringify(data)};
        return $.ajax(request);
    }

    static put(module, urlPostfix, headersType, data) {
        let method = `PUT`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.headers[headersType];

        let request = {method, url, headers, data: JSON.stringify(data)};
        return $.ajax(request);
    }
    static del(module, urlPostfix, headersType) {
        let method = `DELETE`;
        let url = Kinvey.serviceUrl + `${module}/${Kinvey.appKey}/${urlPostfix}`;
        let headers = Kinvey.headers[headersType];

        let request = {method, url, headers};
        return $.ajax(request);
    }
}
 
