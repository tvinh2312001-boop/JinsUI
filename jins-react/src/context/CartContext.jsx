import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Classic Square', price: 1290000, img: 'https://www.jins.com/jp/client_info/JINSJINS/itemimage/URF-26S-102/URF-26S-102_97_01.jpg', qty: 1 },
        { id: 2, name: 'Aviator Pro', price: 1890000, img: 'https://www.jins.com/jp/client_info/JINSJINS/itemimage/LMF-25S-219/LMF-25S-219_84R_01.jpg', qty: 2 }
    ]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.qty + delta;
                    return { ...item, qty: newQty };
                }
                return item;
            }).filter(item => item.qty > 0);
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
