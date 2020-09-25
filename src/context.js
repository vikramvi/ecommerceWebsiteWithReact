import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider

//Consumer


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        //modal component properties
        modalOpen: false,
        modalProduct: detailProduct,
        //cart component properties
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];

        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });

        this.setState(() => {
            return { products: tempProducts };
        });
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product;
    };

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        })
    };

    addToCart = (id) => {
        //create local copy of products array
        let tempProducts = [...this.state.products];

        //get correct product
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];

        //update product properties
        product.inCart = true;
        product.count = 1;

        const price = product.price;
        product.total = price;

        //make use of callback function to update total
        this.setState(
            () => {
                return { products: tempProducts, cart: [...this.state.cart, product] };
            },
            () => { this.addTotals(); }
        );
    };

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        })
    }

    increment = (id) => {
        console.log('increment method');
    }

    decrement = (id) => {
        console.log('decrement method');
    }

    removeItem = (id) => {
        console.log('removeItem method');
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.setProducts();
            this.addTotals();
        }
        )
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));

        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));

        const total = subTotal + tax;

        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
    }


    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };