import React from 'react';

const Features = () => {
    return (
        <section className="features" id="features">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Ưu điểm</span>
                    <h2 className="section-title">Tại sao chọn <span className="gradient-text">Jins</span>?</h2>
                    <p className="section-description">Cam kết mang đến trải nghiệm mua kính tốt nhất cho bạn</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card reveal visible" id="feature-1">
                        <div className="feature-icon">🔬</div>
                        <h3 className="feature-title">Tròng kính cao cấp</h3>
                        <p className="feature-description">Sử dụng tròng kính chống UV, chống ánh sáng xanh từ các thương hiệu hàng đầu thế giới.</p>
                    </div>
                    <div className="feature-card reveal visible" id="feature-2">
                        <div className="feature-icon">✂️</div>
                        <h3 className="feature-title">Thiết kế tinh xảo</h3>
                        <p className="feature-description">Gọng kính được chế tác tỉ mỉ, nhẹ nhàng và bền bỉ theo thời gian.</p>
                    </div>
                    <div className="feature-card reveal visible" id="feature-3">
                        <div className="feature-icon">👁️</div>
                        <h3 className="feature-title">Đo mắt miễn phí</h3>
                        <p className="feature-description">Dịch vụ đo khám mắt miễn phí với thiết bị hiện đại tại tất cả cửa hàng.</p>
                    </div>
                    <div className="feature-card reveal visible" id="feature-4">
                        <div className="feature-icon">🔄</div>
                        <h3 className="feature-title">Đổi trả 30 ngày</h3>
                        <p className="feature-description">Chính sách đổi trả linh hoạt trong 30 ngày nếu sản phẩm không vừa ý.</p>
                    </div>
                    <div className="feature-card reveal visible" id="feature-5">
                        <div className="feature-icon">🚚</div>
                        <h3 className="feature-title">Giao hàng nhanh</h3>
                        <p className="feature-description">Miễn phí giao hàng toàn quốc. Nhận kính trong 1-3 ngày làm việc.</p>
                    </div>
                    <div className="feature-card reveal visible" id="feature-6">
                        <div className="feature-icon">🛡️</div>
                        <h3 className="feature-title">Bảo hành 12 tháng</h3>
                        <p className="feature-description">Bảo hành chính hãng 12 tháng cho gọng kính và tròng kính.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
