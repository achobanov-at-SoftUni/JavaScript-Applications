let consts = (function() {
    const serviceUrl = `https://baas.kinvey.com`;
    const appKey = `kid_rkAC3QPGg`;
    const appSecret = `694bbb30eb2e43b49ae40d4b54f2eafb`;
    const appAuthToken = btoa(`${appKey}:${appSecret}`);
    const collection = `books`;

    return {serviceUrl, appKey, appSecret, collection, appAuthToken};
})();

export default consts;
 
