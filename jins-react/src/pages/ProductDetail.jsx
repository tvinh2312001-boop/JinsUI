import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);

    const productImages = product?.images && product.images.length > 0 ? product.images : [product?.img];
    const [mainImage, setMainImage] = useState(productImages[0]);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);

    // Computed related products
    const similarProducts = productsData
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const bestSellingProducts = [...productsData]
        .filter(p => p.id !== product.id)
        .sort((a, b) => (b.badge === 'Hot' || b.badge === '-20%' ? 1 : -1)) // simple dummy sorting
        .slice(0, 4);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <main className="container" style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center' }}>
                <h2>Không tìm thấy sản phẩm!</h2>
                <p>Sản phẩm này có thể đã bị xoá hoặc không tồn tại.</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Quay lại Trang Chủ</Link>
            </main>
        );
    }

    const handleAddToCart = () => {
        // Add product logic (might include selectedColor in the future)
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        showToast(`Đã thêm ${qty} "${product.name}" vào giỏ hàng!`);
        setQty(1); // reset after add
    };

    return (
        <main className="product-detail-page container" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
            <div className="pd-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="pd-breadcrumb-sep">/</span>
                <Link to="/#products">Sản phẩm</Link>
                <span className="pd-breadcrumb-sep">/</span>
                <span className="pd-breadcrumb-current">{product.name}</span>
            </div>

            <div className="pd-grid">
                {/* Gallery */}
                <div className="pd-gallery">
                    <div className="pd-image-main" onClick={() => setIsZoomed(true)} style={{ cursor: 'zoom-in' }}>
                        <img src={mainImage} alt={product.name} />
                        {product.badge && <span className={`product-badge ${product.badgeClass || ''}`}>{product.badge}</span>}
                    </div>
                    {productImages.length > 1 && (
                        <div className="pd-thumbnails">
                            {productImages.map((imgUrl, idx) => (
                                <div
                                    key={idx}
                                    className={`pd-thumb ${mainImage === imgUrl ? 'active' : ''}`}
                                    onClick={() => setMainImage(imgUrl)}
                                >
                                    <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="pd-info">
                    <div className="pd-tags">{product.tags.replace(/ {4}/g, ' • ')}</div>
                    <h1 className="pd-title">{product.name} <span className="pd-code">{product.code}</span></h1>

                    <div className="pd-price-wrap">
                        {product.oldPrice ? (
                            <>
                                <span className="pd-price">{product.price.toLocaleString('vi-VN')}₫</span>
                                <span className="pd-price-old">{product.oldPrice.toLocaleString('vi-VN')}₫</span>
                            </>
                        ) : (
                            <span className="pd-price">{product.price.toLocaleString('vi-VN')}₫</span>
                        )}
                    </div>

                    <p className="pd-desc">
                        Kính mắt thiết kế hiện đại, chất liệu cao cấp mang lại cảm giác thoải mái khi đeo cả ngày dài.
                        Phù hợp với nhiều kiểu khuôn mặt, tạo điểm nhấn thời trang sang trọng và tinh tế cho phong cách của bạn.
                    </p>

                    {/* Specifications Accordion */}
                    {product.specs && (
                        <div className="pd-specs-accordion" style={{ margin: '0 0 24px 0', borderTop: 'none', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                            <button
                                className={`pd-specs-header ${showSpecs ? 'open' : ''}`}
                                onClick={() => setShowSpecs(!showSpecs)}
                                aria-expanded={showSpecs}
                                style={{ paddingTop: 0 }}
                            >
                                <h3>Thông số kỹ thuật sản phẩm</h3>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div className="pd-specs-content" style={{ display: showSpecs ? 'block' : 'none' }}>
                                <div className="specs-list">
                                    <div className="spec-row">
                                        <div className="spec-label">Tên sản phẩm:</div>
                                        <div className="spec-value">{product.name}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Mã sản phẩm:</div>
                                        <div className="spec-value">{product.code}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Kích cỡ:</div>
                                        <div className="spec-value">{product.specs.size}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Cân nặng:</div>
                                        <div className="spec-value">{product.specs.weight}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Phong cách:</div>
                                        <div className="spec-value">{product.specs.style}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Loạt:</div>
                                        <div className="spec-value">{product.specs.series}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Giới tính:</div>
                                        <div className="spec-value">{product.specs.gender}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Miếng đệm mũi:</div>
                                        <div className="spec-value">{product.specs.nosePad}</div>
                                    </div>
                                    <div className="spec-row">
                                        <div className="spec-label">Chất liệu khung:</div>
                                        <div className="spec-value" style={{ whiteSpace: 'pre-line' }}>{product.specs.material}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pd-colors">
                        <h4>Màu sắc: <span>{selectedColor?.title}</span></h4>
                        <div className="pd-color-options">
                            {product.colors.map((color, idx) => (
                                <button
                                    key={idx}
                                    className={`pd-color-btn ${selectedColor?.hex === color.hex ? 'active' : ''} ${color.outOfStock ? 'out-of-stock' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.title}
                                    onClick={() => !color.outOfStock && setSelectedColor(color)}
                                    disabled={color.outOfStock}
                                    aria-label={`Chọn màu ${color.title}`}
                                ></button>
                            ))}
                        </div>
                    </div>

                    <div className="pd-actions">
                        <div className="pd-qty">
                            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Giảm số lượng">-</button>
                            <input type="number" className="qty-input" value={qty} readOnly />
                            <button className="qty-btn" onClick={() => setQty(qty + 1)} aria-label="Tăng số lượng">+</button>
                        </div>

                        <button className="btn btn-primary pd-add-btn" onClick={handleAddToCart}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><circle cx="9" cy="21" r="1.5"></circle><circle cx="20" cy="21" r="1.5"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path><path d="M12 11h6m-3-3v6"></path></svg>
                            Thêm vào giỏ
                        </button>

                        <button className="btn btn-outline pd-wish-btn" aria-label="Yêu thích">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>

                    <div className="pd-features">
                        <div className="pd-feature">
                            <span className="pdf-icon">📦</span>
                            <p>Giao hàng miễn phí toàn quốc</p>
                        </div>
                        <div className="pd-feature">
                            <span className="pdf-icon">🔄</span>
                            <p>Đổi trả linh hoạt trong vòng 30 ngày</p>
                        </div>
                        <div className="pd-feature">
                            <span className="pdf-icon">🛡️</span>
                            <p>Bảo hành chính hãng 12 tháng</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {similarProducts.length > 0 && (
                <section className="pd-related-section">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm tương tự</h2>
                        <Link to={`/category/${product.category}`} className="section-link">Xem thêm</Link>
                    </div>
                    <div className="products-grid">
                        {similarProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/* Best Selling Products Section */}
            {bestSellingProducts.length > 0 && (
                <section className="pd-related-section">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm bán chạy</h2>
                        <Link to="/#products" className="section-link">Xem thêm</Link>
                    </div>
                    <div className="products-grid">
                        {bestSellingProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/* Zoom Modal */}
            {isZoomed && (
                <div className="pd-zoom-modal" onClick={() => setIsZoomed(false)}>
                    <button className="pd-zoom-close" onClick={() => setIsZoomed(false)} aria-label="Đóng">&times;</button>
                    <img src={mainImage} alt={product.name} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </main>
    );
};

export default ProductDetail;
