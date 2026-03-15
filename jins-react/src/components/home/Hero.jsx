import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const heroSection = heroRef.current;
        if (!heroSection) return;

        const orbs = heroSection.querySelectorAll('.hero-orb');

        const handleMouseMove = (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 15;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        };

        const handleMouseLeave = () => {
            orbs.forEach(orb => {
                orb.style.transform = '';
            });
        };

        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            heroSection.removeEventListener('mousemove', handleMouseMove);
            heroSection.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="hero" id="home" ref={heroRef}>
            <div className="hero-bg">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>
            </div>
            <div className="hero-content">
                <span className="hero-badge">✨ Bộ sưu tập mới 2026</span>
                <h1 className="hero-title" onMouseEnter={(e) => e.target.style.textShadow = '0 0 40px rgba(108, 92, 231, 0.3)'} onMouseLeave={(e) => e.target.style.textShadow = 'none'}>
                    Phong cách<br />
                    <span className="gradient-text">qua ánh nhìn</span>
                </h1>
                <p className="hero-description">
                    Khám phá bộ sưu tập kính mắt thời trang cao cấp từ Jins.
                    Thiết kế tinh tế, chất lượng vượt trội, hoàn hảo cho mọi phong cách.
                </p>
                <div className="hero-actions">
                    <a href="#products" className="btn btn-primary magnetic-btn">Mua sắm ngay</a>
                    <a href="#features" className="btn btn-outline">Tìm hiểu thêm</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
