import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = product => {
        let productExists = cart.find(item => item.id === product.id);

        if (productExists) {
            setCart(currentCart => currentCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };
    const increaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };
    const decreaseQuantity = (productId) => {
        setCart(currentCart => currentCart.map(item =>
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };
    const removeFromCart = productId => {
        setCart(currentCart => currentCart.filter(product => product.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
