import React, { useState } from 'react';
import ProductCard from '../ProductCard';
import { productsData } from '../../data/products';

const Products = () => {
    const [filter, setFilter] = useState('all');

    const filteredProducts = filter === 'all'
        ? productsData
        : productsData.filter(p => p.category === filter);

     console.log(productsData)
    return (
        <section className="products" id="products">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Sản phẩm</span>
                    <h2 className="section-title">Bộ sưu tập <span className="gradient-text">nổi bật</span></h2>
                    <p className="section-description">Kính mắt chính hãng với thiết kế đa dạng, phù hợp mọi khuôn mặt</p>
                </div>

                {/* Category Filter */}
                <div className="product-filters">
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
                    <button className={`filter-btn ${filter === 'optical' ? 'active' : ''}`} onClick={() => setFilter('optical')}>Kính cận</button>
                    <button className={`filter-btn ${filter === 'sun' ? 'active' : ''}`} onClick={() => setFilter('sun')}>Kính râm</button>
                    <button className={`filter-btn ${filter === 'fashion' ? 'active' : ''}`} onClick={() => setFilter('fashion')}>Kính thời trang</button>
                </div>

                <div className="products-grid" id="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
