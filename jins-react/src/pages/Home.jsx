import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Products from '../components/home/Products';
import Features from '../components/home/Features';
import About from '../components/home/About';
import Contact from '../components/home/Contact';

const Home = () => {

    // Active Nav Link on Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="/#${sectionId}"]`);
                const stepLink = document.querySelector(`.step-link[href="#${sectionId}"]`);

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.step-link').forEach(l => l.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                    if (stepLink) stepLink.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className="step-bar" id="step-bar">
                <ul>
                    <li><a href="#home" className="step-link active" data-target="home">01</a></li>
                    <li><a href="#products" className="step-link" data-target="products">02</a></li>
                    <li><a href="#features" className="step-link" data-target="features">03</a></li>
                    <li><a href="#about" className="step-link" data-target="about">04</a></li>
                    <li><a href="#contact" className="step-link" data-target="contact">05</a></li>
                </ul>
            </nav>

            <Hero />
            <Products />
            <Features />
            <About />
            <Contact />
        </>
    );
};

export default Home;
