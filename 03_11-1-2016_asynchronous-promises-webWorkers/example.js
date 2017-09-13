
let promise = new Promise(function(resolve, reject) {
    "use strict";
    try {
        let sum = 0;
        for (let i = 0; i < 100; i++) {
            sum += i;
        }

        resolve(sum);
    } catch (e) {
        reject(e);
    }

});
promise.then().catch();
console.log(`now`);


