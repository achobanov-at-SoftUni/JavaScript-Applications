import {browserHistory} from "react-router";

import Kinvey from "./Kinvey";

export default class User {

    static register() {
        browserHistory.push(`/`);
    }
    static login(response) {
        sessionStorage.setItem('username', `${response.username}`);
        sessionStorage.setItem('name', `${response.name}`);
        sessionStorage.setItem(`authToken`, `${response._kmd.authtoken}`);
        sessionStorage.setItem(`userId`, `${response._id}`);
        browserHistory.push(`/`);
    }

    static logout() {
        Kinvey.post(`user`, `_logout`, `kinvey`)
            .then(() => {
                sessionStorage.clear();
                User.showInfo(`infoBox`, `Logout successful`);
                browserHistory.push(`/`);
            })
            .catch(response => {
                User.showInfo(`errorBox`, response);
            });
    }

    static isLoggedIn() {
        return sessionStorage.getItem(`username`)
    }

    static addProductToCart(productData) {
        Kinvey.get(`user`, sessionStorage.getItem(`userId`), `kinvey`)
            .then((response) => {
                let quantity;
                if (response.cart[productData.id]) {
                    quantity = response.cart[productData.id].quantity + 1;
                } else {
                    quantity = 1;
                }
                response.cart[productData.id] = {
                    quantity: quantity,
                    product: {
                        name: productData.name,
                        description: productData.description,
                        price: productData.price
                    }
                };

                User.updateUser(response)
                    .then(() => {
                        console.log(`should be showing info now...`);
                        browserHistory.push(`/cart`);
                        User.showInfo(`infoBox`, `Product purchased`);
                    })
                    .catch((innerResponse) => User.showInfo(`errorBox`, innerResponse));
            });

    }

    static removeProductFromCart(newCartArray) {
        let newCartData = {};
        newCartArray.forEach(
            x =>
                newCartData[x.id] = {
                    quantity: x.quantity,
                    product: {
                        name: x.name,
                        description: x.description,
                        price: x.price
                    }
                }
        );
        Kinvey.get(`user`, sessionStorage.getItem(`userId`), `kinvey`)
            .then((response) => {
                response.cart = newCartData;
                User.updateUser(response)
                    .then(() => User.showInfo(`infoBox`, `Product discarded`))
                    .catch((response) => User.showInfo(`errorBox`, response));
            });
    }

    static updateUser(userData) {
        return Kinvey.put(`user`, sessionStorage.getItem(`userId`), `kinvey`, userData);
    }

    // Overwritten by InfoBox's show method to display info messages.
    static showInfo() {}
}

