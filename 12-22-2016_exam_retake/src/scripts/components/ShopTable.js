import React, {Component} from "react";

import Kinvey from "../services/Kinvey";
import Utils from "../services/Utils";
import User from "../services/User";

export default class MyMessagesTable extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        };

        this.initProducts = this.initProducts.bind(this);

    }

    componentWillMount() {
        Kinvey.get(`appdata`, `products`, `kinvey`)
            .then(this.initProducts)
            .catch((response) => User.showInfo(`errorBox`, response));
    }

    initProducts(response) {
        let products = [];
        for (let entry of response) {
            products.push({
                id: entry._id,
                name: entry.name,
                description: entry.description,
                price: entry.price,
            });
        }

        this.setState({
            products: products
        });
    }

    render() {
        return (
            <section id="viewShop">
                <h1>Products</h1>
                <div className="products" id="shopProducts">
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(
                                x =>
                                <ProductRow
                                    key={x.id}
                                    id={x.id}
                                    name={x.name}
                                    description={x.description}
                                    price={x.price} />
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class ProductRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price
        };

        this.addProductToCart = this.addProductToCart.bind(this);
    }

    addProductToCart() {
        User.addProductToCart(this.state);
    }

    render() {
        return(
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{Utils.formatPrice(this.props.price)}</td>
                <td><PurchaseButton addToCart={this.addProductToCart}/></td>
            </tr>
        )
    }
}

class PurchaseButton extends Component {
    render() {
        return(
            <button onClick={this.props.addToCart}>Purchase</button>
        )
    }
}


 
