import React, { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        // Stat numbers animation
        const statNumbers = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const numMatch = text.match(/(\d+)/);

                    if (numMatch && !el.dataset.animated) {
                        el.dataset.animated = "true";
                        const target = parseInt(numMatch[1]);
                        const suffix = text.replace(numMatch[0], '');
                        let current = 0;
                        const step = Math.max(1, Math.floor(target / 50));
                        const interval = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(interval);
                            }
                            el.textContent = current + suffix;
                        }, 30);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));

        return () => {
            statNumbers.forEach(el => counterObserver.unobserve(el));
        }
    }, []);

    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-visual">
                        <div className="about-card-stack">
                            <div className="about-floating-card card-1">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Khách hàng</span>
                            </div>
                            <div className="about-floating-card card-2">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Mẫu kính</span>
                            </div>
                            <div className="about-floating-card card-3">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Chi nhánh</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-content">
                        <span className="section-tag">Về chúng tôi</span>
                        <h2 className="section-title">Đam mê từ <span className="gradient-text">ánh nhìn</span></h2>
                        <p className="about-text">
                            Jins ra đời với sứ mệnh mang đến những chiếc kính mắt không chỉ giúp bạn nhìn rõ hơn,
                            mà còn thể hiện phong cách riêng của bạn.
                        </p>
                        <p className="about-text">
                            Với hơn 500 mẫu kính từ nhiều thương hiệu nổi tiếng, chúng tôi cam kết
                            mang đến sự hài lòng tuyệt đối cho mỗi khách hàng.
                        </p>
                        <a href="#contact" className="btn btn-primary">Đặt lịch khám mắt</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
