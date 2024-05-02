import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = product => {
        let productExists = cart.find(item => item.id === product.id);

        if (productExists) {
            productExists.quantity += 1;
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = productId => {
        setCart(currentCart => currentCart.filter(product => product.id !== productId));
    };

    const increaseQuantity = (productId) => {
        let productExists = cart.find(item => item.id === productId);

        if (productExists) {
            productExists.quantity += 1;
        }
    };

    const decreaseQuantity = (productId) => {
        let productExists = cart.find(item => item.id === productId);

        if (productExists && productExists.quantity > 1) {
            productExists.quantity -= 1;
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
