import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const cardRef = useRef(null);

    // Tilt & Reveal effect logic
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Reveal effect
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });
        revealObserver.observe(card);

        // Tilt effect
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateX = (y - 0.5) * -8;
            const rotateY = (x - 0.5) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = '';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            revealObserver.disconnect();
        };
    }, []);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        const btn = e.currentTarget;
        btn.classList.toggle('active');

        if (btn.classList.contains('active')) {
            showToast(`Đã thêm "${product.name}" vào yêu thích!`);
        } else {
            showToast(`Đã bỏ "${product.name}" khỏi yêu thích!`, 'info');
        }
    };

    return (
        <div className="product-card reveal" data-category={product.category} id={`product-${product.id}`} ref={cardRef}>
            <Link to={`/product/${product.id}`} className="product-image-link" style={{ display: 'block' }}>
                <div className="product-image">
                    <img src={product.img} alt={product.name} className="product-img" />
                    {product.badge && <span className={`product-badge ${product.badgeClass || ''}`}>{product.badge}</span>}
                    <div className="product-actions">
                        <button className="action-btn add-to-wishlist" aria-label="Yêu thích" onClick={handleToggleWishlist}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <button className="action-btn add-to-cart" aria-label="Thêm vào giỏ" onClick={handleAddToCart}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1.5"></circle><circle cx="20" cy="21" r="1.5"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path><path d="M12 11h6m-3-3v6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </Link>
            <div className="product-info">
                <div className="product-tags">{product.tags}</div>
                <h3 className="product-name">
                    <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                    <span className="product-code">{product.code}</span>
                </h3>

                {product.oldPrice ? (
                    <div className="product-price-group">
                        <p className="product-price">{product.price.toLocaleString('vi-VN')}₫</p>
                        <p className="product-price-old">{product.oldPrice.toLocaleString('vi-VN')}₫</p>
                    </div>
                ) : (
                    <p className="product-price">{product.price.toLocaleString('vi-VN')}₫</p>
                )}

                <div className="product-colors">
                    {product.colors.map((color, idx) => (
                        <span
                            key={idx}
                            className={`color-dot ${color.outOfStock ? 'out-of-stock' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.title}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
