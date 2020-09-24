import React, { Component } from "react";

//child components
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';

//context class
import { ProductConsumer } from '../../context';

class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;
                        if (cart.length > 0) {
                            return (
                                <>
                                    <Title name="your" title="cart" />
                                    <CartColumns />
                                </>
                            )
                        } else {
                            return (
                                <EmptyCart />
                            )
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}

export default Cart;