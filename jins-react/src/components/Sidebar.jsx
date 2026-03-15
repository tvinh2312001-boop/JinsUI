import React, { useEffect } from 'react';

const Sidebar = ({ isOpen, onClose }) => {

    useEffect(() => {
        if (isOpen && window.innerWidth <= 991) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <span className="logo-text">Jins</span>
                    <button className="sidebar-close" id="sidebar-close" aria-label="Đóng menu" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <ul className="sidebar-links" id="nav-links">
                    <li><a href="/#home" className="nav-link active" onClick={onClose}>Trang chủ</a></li>
                    <li><a href="/#products" className="nav-link" onClick={onClose}>Sản phẩm</a></li>
                    <li><a href="/#features" className="nav-link" onClick={onClose}>Ưu điểm</a></li>
                    <li><a href="/#about" className="nav-link" onClick={onClose}>Về chúng tôi</a></li>
                    <li><a href="/#contact" className="nav-link" onClick={onClose}>Liên hệ</a></li>
                </ul>
            </aside>
            <div className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} id="sidebar-backdrop" onClick={onClose}></div>
        </>
    );
};

export default Sidebar;
