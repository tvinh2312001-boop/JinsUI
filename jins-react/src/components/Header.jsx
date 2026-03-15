import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = ({ onOpenSidebar }) => {
    const [scrolled, setScrolled] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Always scrolled on Cart page
        if (location.pathname === '/cart') {
            setScrolled(true);
            window.removeEventListener('scroll', handleScroll);
        } else {
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Init
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    return (
        <header className={`topbar ${scrolled ? 'scrolled' : ''}`} id="topbar">
            <div className="nav-container">
                <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" onClick={onOpenSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <Link to="/" className="nav-logo">
                    <span className="logo-text">J<span className="logo-accent">!</span>NS</span>
                </Link>

                <div className="top-nav-links">
                    <Link to="/" className="top-nav-item bold">MEN</Link>
                    <Link to="/" className="top-nav-item bold">WOMEN</Link>
                    <Link to="/" className="top-nav-item bold">KIDS</Link>
                    <span className="nav-divider">|</span>
                    <Link to="/" className="top-nav-item">sunglasses</Link>
                    <Link to="/" className="top-nav-item">lens</Link>
                    <Link to="/" className="top-nav-item">Contact lenses</Link>
                </div>

                <div className="nav-actions">
                    {/* Wishlist */}
                    <a href="#" className="icon-link" aria-label="Yêu thích">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </a>
                    {/* Account */}
                    <a href="#" className="icon-link" aria-label="Tài khoản">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </a>
                    {/* Cart */}
                    <Link to="/cart" className="icon-link cart-icon" id="cart-btn" aria-label="Giỏ hàng">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1.5"></circle><circle cx="20" cy="21" r="1.5"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        <span className={`cart-count ${totalItems > 0 ? 'bounce' : ''}`} id="cart-count">{totalItems}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
