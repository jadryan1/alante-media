import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { Plus } from 'lucide-react'
import './portfolio-react.css'

const portfolioItems = [
    // Row 1: 4:5 / 3:2 / 4:5 (Priority)
    { id: 1, type: 'image', src: '/assets/portfolio/4-5/media 45/shrimp11.JPEG', title: 'Seafood Study', category: 'Photography', aspectRatio: '4/5' },
    { id: 2, type: 'video', src: '/assets/portfolio/3-2/media 32/eggs11.MP4', title: 'Breakfast Series', category: 'Commercial', aspectRatio: '3/2' },
    { id: 3, type: 'video', src: '/assets/portfolio/4-5/media 45/lotus11.MP4', title: 'Lotus Motion', category: 'Art Direction', aspectRatio: '4/5' },

    // Row 2: 4:5 / 3:2 / 4:5 (Priority)
    { id: 4, type: 'video', src: '/assets/portfolio/4-5/media 45/tacos11.MP4', title: 'Street Food', category: 'Commercial', aspectRatio: '4/5' },
    { id: 5, type: 'image', src: '/assets/portfolio/3-2/media 32/latte11.jpg', title: 'Coffee Culture', category: 'Photography', aspectRatio: '3/2' },
    { id: 6, type: 'video', src: '/assets/portfolio/4-5/media 45/frenchtoast11.MP4', title: 'Morning Bliss', category: 'Lifestyle', aspectRatio: '4/5' },

    // Row 3: 4:5 / 3:2 / 4:5 (Priority)
    { id: 7, type: 'video', src: '/assets/portfolio/4-5/media 45/fresh22.MP4', title: 'Fresh Perspective', category: 'Lifestyle', aspectRatio: '4/5' },
    { id: 8, type: 'video', src: '/assets/portfolio/3-2/media 32/tokyo11.Mp4', title: 'Tokyo Nights', category: 'Production', aspectRatio: '3/2' },
    { id: 9, type: 'video', src: '/assets/portfolio/4-5/media 45/icedlatte22.MP4', title: 'Iced Refreshment', category: 'Social', aspectRatio: '4/5' },

    // Row 4: 4:5 / 3:2 / 4:5
    { id: 10, type: 'video', src: '/assets/portfolio/4-5/media 45/chamuco22.mp4', title: 'Spirit Showcase', category: 'Commercial', aspectRatio: '4/5' },
    { id: 11, type: 'image', src: '/assets/portfolio/3-2/media 32/empanadas22.jpg', title: 'Flavor Profile', category: 'Branding', aspectRatio: '3/2' },
    { id: 12, type: 'video', src: '/assets/portfolio/4-5/media 45/date11.MP4', title: 'Evening Narrative', category: 'Lifestyle', aspectRatio: '4/5' },

    // Row 5: 4:5 / 3:2 / 4:5
    { id: 13, type: 'video', src: '/assets/portfolio/4-5/media 45/mexi11.MP4', title: 'Mexico City', category: 'Travel', aspectRatio: '4/5' },
    { id: 14, type: 'image', src: '/assets/portfolio/3-2/media 32/aperol22.jpg', title: 'Aperol Spritz', category: 'Photography', aspectRatio: '3/2' },
    { id: 15, type: 'video', src: '/assets/portfolio/4-5/media 45/mimosa22.MP4', title: 'Morning Sparkle', category: 'Lifestyle', aspectRatio: '4/5' },

    // Row 6: 4:5 / 3:2 / 4:5
    { id: 16, type: 'video', src: '/assets/portfolio/4-5/media 45/salmon22.MP4', title: 'Gourmet Platter', category: 'Production', aspectRatio: '4/5' },
    { id: 17, type: 'video', src: '/assets/portfolio/3-2/media 32/chicken11.MP4', title: 'Culinary Craft', category: 'Production', aspectRatio: '3/2' },
    { id: 18, type: 'video', src: '/assets/portfolio/4-5/media 45/tortilla22.MP4', title: 'Handmade Tradition', category: 'Production', aspectRatio: '4/5' },

    // Row 7: 3:2 items
    { id: 19, type: 'video', src: '/assets/portfolio/3-2/media 32/pizza22.MP4', title: 'Artisan Pizza', category: 'Production', aspectRatio: '3/2' },
    { id: 20, type: 'video', src: '/assets/portfolio/3-2/media 32/tokyo22.MP4', title: 'City Motion', category: 'Production', aspectRatio: '3/2' },
]

const PortfolioItem = ({ item, index }) => {
    return (
        <motion.div
            className="portfolio-item"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1], // Very smooth ease
                delay: index * 0.05 // Subtle stagger
            }}
        >
            <div className="item-media-wrapper" style={{ aspectRatio: item.aspectRatio }}>
                {item.type === 'video' ? (
                    <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="item-media"
                    />
                ) : (
                    <img src={item.src} alt={item.title} className="item-media" />
                )}
                <div className="media-overlay" />
            </div>

            <div className="item-details">
                <h3 className="item-title">{(index + 1).toString().padStart(3, '0')}</h3>
            </div>
        </motion.div>
    )
}

export default function Portfolio() {
    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Fade out loader
        const loader = document.querySelector('.portfolio-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 500);
        }

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div className="portfolio-section">
            <header className="portfolio-header">
                <motion.h1
                    className="portfolio-main-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    SELECTED WORKS
                </motion.h1>
            </header>

            <div className="portfolio-grid">
                {portfolioItems.map((item, index) => (
                    <PortfolioItem key={item.id} item={item} index={index} />
                ))}
            </div>

            <footer className="portfolio-footer">
                <div className="footer-line"></div>
                <p>© 2026 Alanté Media</p>
            </footer>
        </div>
    )
}


