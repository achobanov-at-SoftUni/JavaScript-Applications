import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import Utils from "../services/Utils";
import User from "../services/User";

export default class CartTable extends Component {
    constructor() {
        super();
        this.state = {
            cartProducts: []
        };

        this.initCartProducts = this.initCartProducts.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    componentWillMount() {
        Kinvey.get(`user`, sessionStorage.getItem(`userId`), `kinvey`)
            .then(this.initCartProducts)
            .catch((response) => User.showInfo(`errorBox`, response));
    }

    initCartProducts(response) {
        let cartProducts = [];
        let cart = response.cart;
        for (let entry in cart) {
            if (!cart.hasOwnProperty(entry)) continue;
            cartProducts.push({
                id: entry,
                quantity: cart[entry].quantity,
                name: cart[entry].product.name,
                description: cart[entry].product.description,
                price: cart[entry].product.price,
            });
        }

        this.setState({
            cartProducts: cartProducts
        });
    }

    removeProduct(id) {
        let cartProducts = [];
        this.state.cartProducts.filter(x => x.id !== id).forEach(x => cartProducts.push(x));
        this.setState({
            cartProducts: cartProducts
        }, () => User.removeProductFromCart(this.state.cartProducts));
    }

    render() {
        return (
            <section id="viewCart">
                <h1>My Cart</h1>
                <div className="products" id="cartProducts">
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.cartProducts.map(
                                x =>
                                <ProductRow
                                    key={x.id}
                                    id={x.id}
                                    quantity={x.quantity}
                                    name={x.name}
                                    description={x.description}
                                    price={x.price}
                                    remove={this.removeProduct} />
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class ProductRow extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.quantity}</td>
                <td>{Utils.formatPrice(this.props.price * Number(this.props.quantity))}</td>
                <td>
                    <RemoveButton id={this.props.id} remove={this.props.remove}/>
                </td>
            </tr>
        )
    }
}

class RemoveButton extends Component {
    render() {
        return (
            <button onClick={() => this.props.remove(this.props.id)}>Discard</button>
        )
    }
}
 
