import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
    const { showToast } = useToast();

    const handleRemove = (item) => {
        removeFromCart(item.id);
        showToast(`Đã xoá "${item.name}" khỏi giỏ hàng`, 'info');
    };

    if (cartItems.length === 0) {
        return (
            <main className="cart-container container" id="cart-container" style={{ padding: '120px 0 60px' }}>
                <div className="cart-header">
                    <h1 className="cart-title">Giỏ hàng của bạn</h1>
                    <p className="cart-subtitle">0 sản phẩm</p>
                </div>
                <div className="cart-empty" id="cart-empty" style={{ display: 'flex' }}>
                    <div className="cart-empty-icon">🛒</div>
                    <h2>Giỏ hàng đang trống</h2>
                    <p>Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.</p>
                    <Link to="/#products" className="btn btn-primary">Tiếp tục mua sắm</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-container container" id="cart-container" style={{ padding: '120px 0 60px' }}>
            <div className="cart-header">
                <h1 className="cart-title">Giỏ hàng của bạn</h1>
                <p className="cart-subtitle"><span id="cart-total-items">{totalItems}</span> sản phẩm</p>
            </div>

            <div className="cart-grid" id="cart-content">
                <div className="cart-items" id="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-img">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="cart-item-info">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <span className="cart-item-price">{item.price.toLocaleString('vi-VN')}₫</span>
                                <button className="cart-item-remove" onClick={() => handleRemove(item)}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    Xoá
                                </button>
                            </div>
                            <div className="cart-qty-controls">
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <input type="number" className="qty-input" value={item.qty} readOnly min="1" />
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                            <div className="cart-item-total">{(item.price * item.qty).toLocaleString('vi-VN')}₫</div>
                        </div>
                    ))}
                </div>

                <aside className="cart-summary">
                    <h2 className="summary-title">Tóm tắt đơn hàng</h2>
                    <div className="summary-row">
                        <span>Tạm tính</span>
                        <span id="summary-subtotal">{totalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="summary-row">
                        <span>Phí giao hàng</span>
                        <span>Miễn phí</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row summary-total">
                        <span>Tổng cộng</span>
                        <span id="summary-total">{totalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <button className="btn btn-primary btn-full checkout-btn">
                        Tiến hành thanh toán <span className="btn-arrow">→</span>
                    </button>
                    <p className="summary-note">Giá đã bao gồm VAT. Bạn có thể nhập mã giảm giá ở bước thanh toán.</p>
                </aside>
            </div>
        </main>
    );
};

export default Cart;
