import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="nav-logo">
                            <span className="logo-icon">👓</span>
                            <span className="logo-text">Jins</span>
                        </Link>
                        <p className="footer-tagline">Kính mắt thời trang — Phong cách qua ánh nhìn.</p>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Sản phẩm</h4>
                        <a href="/#products">Kính cận</a>
                        <a href="/#products">Kính râm</a>
                        <a href="/#products">Kính thời trang</a>
                        <a href="/#products">Phụ kiện</a>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Hỗ trợ</h4>
                        <a href="/#contact">Đặt lịch khám mắt</a>
                        <a href="/#features">Chính sách đổi trả</a>
                        <a href="/#features">Bảo hành</a>
                        <a href="/#contact">Liên hệ</a>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-heading">Liên hệ</h4>
                        <p className="footer-info">📍 123 Nguyễn Huệ, Q.1, TP.HCM</p>
                        <p className="footer-info">📞 0901 234 567</p>
                        <p className="footer-info">✉️ hello@jins.vn</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Jins. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
