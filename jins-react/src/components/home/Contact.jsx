import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const Contact = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            e.target.reset();
            showToast('Yêu cầu đã được gửi thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.');
        }, 1500);
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Liên hệ</span>
                    <h2 className="section-title">Đặt lịch <span className="gradient-text">khám mắt</span></h2>
                    <p className="section-description">Đội ngũ chuyên gia sẵn sàng tư vấn và chọn kính phù hợp cho bạn</p>
                </div>
                <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Họ và tên</label>
                            <input type="text" id="name" name="name" placeholder="Nhập họ và tên" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Nhập email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Dịch vụ quan tâm</label>
                        <select id="service" name="service">
                            <option value="">-- Chọn dịch vụ --</option>
                            <option value="eye-exam">Khám & đo mắt</option>
                            <option value="optical">Mua kính cận / viễn</option>
                            <option value="sunglasses">Mua kính râm</option>
                            <option value="repair">Sửa chữa kính</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Ghi chú</label>
                        <textarea id="message" name="message" rows="4" placeholder="Ghi chú thêm (tùy chọn)"></textarea>
                    </div>
                    <button type="submit" className={`btn btn-primary btn-full ${loading ? 'loading' : ''}`} disabled={loading}>
                        <span>{loading ? 'Đang gửi...' : 'Gửi yêu cầu'}</span>
                        {!loading && <span className="btn-arrow">→</span>}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
