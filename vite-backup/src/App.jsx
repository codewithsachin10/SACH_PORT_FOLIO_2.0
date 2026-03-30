import { useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StarsCanvas from "./components/canvas/Stars";
import CursorParticles from "./components/CursorParticles";
import SoundManager from "./components/SoundManager";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";
import EasterEgg from "./components/EasterEgg";
import SmoothScroll from "./components/SmoothScroll";

import SkillsMarquee from "./components/SkillsMarquee";
import WhatsAppButton from "./components/WhatsAppButton";
import ThemePicker from "./components/ThemePicker";

const SectionWrapper = ({ children, backgroundColor = 'transparent', padding = '15vh 0', parallax = false }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], parallax ? [100, -100] : [0, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.section
            ref={ref}
            style={{ 
                padding, 
                backgroundColor, 
                position: 'relative',
                opacity,
                scale
            }}
        >
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </motion.section>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <BrowserRouter>
            {/* Page Loader */}
            {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

            <SmoothScroll>
                <div style={{
                    position: 'relative',
                    zIndex: 0,
                    backgroundColor: 'var(--bg-color)',
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden'
                }}>
                    <ThemePicker />
                    <WhatsAppButton />
                    <EasterEgg />
                    <ScrollProgress />
                    <CursorParticles />
                    <SoundManager />
                    
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <Navbar />
                        <section style={{ marginBottom: '10vh' }}>
                            <Hero />
                        </section>
                    </div>

                    <div style={{ padding: '100px 0' }}>
                        <SkillsMarquee />
                    </div>

                    <SectionWrapper parallax={true}>
                        <About />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="rgba(5, 8, 22, 0.3)">
                        <Experience />
                    </SectionWrapper>

                    <section style={{ padding: '5vh 0' }}>
                        <Work />
                    </section>

                    <SectionWrapper parallax={true}>
                        <Contact />
                    </SectionWrapper>

                    <Footer />
                    
                    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
                        <StarsCanvas />
                    </div>
                </div>
            </SmoothScroll>
        </BrowserRouter>
    );
};

export default App;





