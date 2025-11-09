import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingBannerImage from '../Ranking-banner.jpg'; 

const AboutHeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const navigate = useNavigate();



    const handleMenuClick = (index) => {
        setActiveIndex(index);
       
    };

    return (
        <>
            <section className="about-hero-section">
                {/* Sidebar */}
                
                <div className="container">
                    <h1 className="about-hero-title">INTI International University</h1>
                    <p className="about-hero-description">
                        INTI International University, Nilai serves as the flagship campus that offers industry relevant programmes 
                        across various disciplines along with a residential campus experience.
                    </p>
                    <div className="ranking-banner-container">
                        <img src={RankingBannerImage} alt="INTI University Rankings Banner" className="ranking-banner-image" />
                    </div>
                </div>
            </section>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* SIDEBAR */
                .side-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 90px;
                    height: 100vh;
                    background: #ffffff;
                    border-right: 1px solid #e5e7eb;
                    z-index: 1000;
                    overflow-y: auto;
                    padding-top: 120px;
                }

                .side-menu ul {
                    list-style: none;
                }

                .side-menu li {
                    padding: 16px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #6b7280;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-left: 3px solid transparent;
                }

                .side-menu li:hover {
                    background: #f9fafb;
                    color: #374151;
                }

                .side-menu li.active {
                    background: #eff6ff;
                    color: #3b82f6;
                    border-left-color: #3b82f6;
                }

                .menu-icon-container {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .menu-label {
                    font-weight: 500;
                    white-space: nowrap;
                }

                /* LOGOUT BUTTON */
                .logout-button {
                    position: absolute;
                    bottom: 20px;
                    left: 0;
                    width: 100%;
                    padding: 16px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #ef4444;
                    cursor: pointer;
                    border-top: 1px solid #e5e7eb;
                    transition: all 0.2s ease;
                }

                .logout-button:hover {
                    background: #fef2f2;
                    color: #dc2626;
                }

                /* MAIN CONTENT */
                .about-hero-section {
                    min-height: 100vh;
                    background: #ffffff;
                }

                .about-hero-section .container {
                    margin-left: 90px;
                    padding: 60px 40px;
                    max-width: 1200px;
                }

                .about-hero-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 20px;
                }

                .about-hero-description {
                    font-size: 1.1rem;
                    color: #6b7280;
                    line-height: 1.7;
                    margin-bottom: 40px;
                    max-width: 800px;
                }

                .ranking-banner-container {
                    width: 100%;
                    margin-top: 40px;
                }

                .ranking-banner-image {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .side-menu {
                        width: 70px;
                    }

                    .menu-label {
                        display: none;
                    }

                    .side-menu li {
                        justify-content: center;
                        padding: 16px 10px;
                    }

                    .about-hero-section .container {
                        margin-left: 70px;
                        padding: 40px 20px;
                    }

                    .about-hero-title {
                        font-size: 2rem;
                    }

                    .about-hero-description {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutHeroSection;
