import { useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Typewriter } from "react-simple-typewriter";

// TypeScript interfaces for star props
interface OrbitingStarProps {
  size: number;
  delay: number;
  duration: number;
  reverse?: boolean;
  twinkle?: boolean;
}

interface FloatingStarProps {
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface StreamingStarProps {
  content?: string;
  left?: number;
  bottom?: number;
  right?: number;
  top?: number;
  delay: number;
  duration: number;
  opacity: number;
  fontSize: number;
  reverse?: boolean;
}

interface ShootingStarProps {
  delay: number;
  left: number;
  top: number;
}

interface WaveParticleProps {
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface FallingStarProps {
  size: number;
  left: number;
  delay: number;
  duration: number;
  variant?: 'straight' | 'diagonal' | 'reverse';
}

// Wave Particle Component
const WaveParticle = ({ size, left, top, delay, duration, opacity }: WaveParticleProps) => (
  <div
    className="wave-particle"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity: opacity,
    }}
  />
);

// Star component for orbiting stars - Enhanced with gold
const OrbitingStar = ({ size, delay, duration, reverse = false, twinkle = false }: OrbitingStarProps) => (
  <div
    className={`star ${reverse ? 'star-orbiting-reverse' : 'star-orbiting'} ${
      twinkle ? 'animate-twinkle-gold' : ''
    }`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Star component for floating background stars - Enhanced with gold
const FloatingStar = ({ size, left, top, delay, duration, opacity }: FloatingStarProps) => (
  <div
    className="star star-floating"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity: opacity,
    }}
  />
);

// Star component for streaming stars - Enhanced with gold
const StreamingStar = ({ 
  content = '★', 
  left, 
  bottom, 
  right, 
  top, 
  delay, 
  duration, 
  opacity, 
  fontSize, 
  reverse = false 
}: StreamingStarProps) => (
  <div
    className={`streaming-star ${reverse ? 'star-streaming-reverse' : 'star-streaming'}`}
    style={{
      left: left !== undefined ? `${left}%` : 'auto',
      bottom: bottom !== undefined ? `${bottom}%` : 'auto',
      right: right !== undefined ? `${right}%` : 'auto',
      top: top !== undefined ? `${top}%` : 'auto',
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity: opacity,
      fontSize: `${fontSize}px`,
    }}
  >
    {content}
  </div>
);

// Shooting star component - Enhanced with gold
const ShootingStar = ({ delay, left, top }: ShootingStarProps) => (
  <div
    className="star star-shooting"
    style={{
      animationDelay: `${delay}s`,
      left: `${left}%`,
      top: `${top}%`,
      width: '6px',
      height: '2px',
    }}
  />
);

// Falling star component - Enhanced with gold
const FallingStar = ({ size, left, delay, duration, variant = 'straight' }: FallingStarProps) => {
  const getAnimationClass = () => {
    switch (variant) {
      case 'diagonal':
        return 'animate-falling-gold-diagonal';
      case 'reverse':
        return 'animate-falling-gold-reverse';
      default:
        return 'animate-falling-gold';
    }
  };

  return (
    <div
      className={`falling-star ${getAnimationClass()}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

export default function Hero() {
  const [graphicsReady, setGraphicsReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkMobile();
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const handleThemeChange = () => {
      checkTheme();
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-photo", { scale: 0.8, opacity: 0, duration: 1 })
        .from(".hero-heading", { y: 40, opacity: 0, duration: 1 }, "-=0.6")
        .from(".hero-description", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.8");
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGraphicsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Background classes based on theme
  const getBackgroundClass = () => {
    return isDarkMode ? "wave-bg-dark" : "wave-bg-light";
  };

  // Calculate number of stars based on device
  const getStarCount = (desktopCount: number, mobileCount: number) => {
    return isMobile ? mobileCount : desktopCount;
  };

  return (
    <section
      id="home"
      className={`relative flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 text-center overflow-hidden ${getBackgroundClass()} ${
        isDarkMode ? "text-white" : "text-gray-900"
      } ${graphicsReady ? "" : "opacity-0"} transition-colors duration-500`}
      style={{ 
        paddingTop: '80px',
        width: '100vw',
        position: 'relative',
        left: 0,
        right: 0
      }}
    >
      {/* Enhanced Wave Background Layers with Gold Tint */}
      <div className="wave-layer-1" />
      <div className="wave-layer-2" />
      <div className="wave-layer-3" />

      {/* Enhanced Floating Particles with Gold - Reduced on mobile */}
      {Array.from({ length: getStarCount(30, 15) }, (_, i) => (
        <WaveParticle
          key={`particle-${i}`}
          size={Math.random() * (isMobile ? 80 : 150) + (isMobile ? 20 : 40)}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 30}
          duration={30 + Math.random() * 25}
          opacity={Math.random() * 0.2 + 0.05}
        />
      ))}

      {/* Enhanced Stars Container - Mobile Optimized */}
      <div 
        className="stars-container"
        style={{
          width: '100vw',
          left: 0,
          right: 0
        }}
      >
        {/* Enhanced Orbiting Stars - Gold - Reduced on mobile */}
        {Array.from({ length: getStarCount(20, 8) }, (_, i) => (
          <OrbitingStar
            key={`orbit-${i}`}
            size={Math.random() * (isMobile ? 4 : 6) + (isMobile ? 1 : 2)}
            delay={Math.random() * 5}
            duration={(isMobile ? 30 : 20) + Math.random() * 20}
            reverse={i >= (isMobile ? 4 : 10)}
            twinkle={i % 4 === 0}
          />
        ))}
        
        {/* Enhanced Floating Background Stars - Gold - Reduced on mobile */}
        {Array.from({ length: getStarCount(100, 40) }, (_, i) => (
          <FloatingStar
            key={`float-${i}`}
            size={Math.random() * (isMobile ? 3 : 4) + 1}
            left={Math.random() * 100}
            top={Math.random() * 100}
            delay={Math.random() * 10}
            duration={25 + Math.random() * 30}
            opacity={Math.random() * 0.9 + 0.3}
          />
        ))}
        
        {/* Enhanced Shooting Stars - Gold - Reduced on mobile */}
        {Array.from({ length: getStarCount(12, 6) }, (_, i) => (
          <ShootingStar
            key={`shoot-${i}`}
            delay={Math.random() * 20}
            left={Math.random() * 30}
            top={Math.random() * 70}
          />
        ))}
        
        {/* Enhanced Streaming Stars - Gold, Full Page Coverage - Reduced on mobile */}
        {Array.from({ length: getStarCount(35, 15) }, (_, i) => (
          <StreamingStar
            key={`stream-${i}`}
            content="★"
            left={Math.random() * 40 - 20}
            bottom={Math.random() * 40 - 20}
            delay={Math.random() * 15}
            duration={6 + Math.random() * 8}
            opacity={Math.random() * 0.9 + 0.2}
            fontSize={Math.random() * (isMobile ? 15 : 20) + (isMobile ? 10 : 15)}
          />
        ))}
        
        {/* Enhanced Streaming Stars - Reverse, Full Page Coverage - Reduced on mobile */}
        {Array.from({ length: getStarCount(30, 12) }, (_, i) => (
          <StreamingStar
            key={`stream-rev-${i}`}
            content="★"
            right={Math.random() * 40 - 20}
            top={Math.random() * 40 - 20}
            delay={Math.random() * 18}
            duration={8 + Math.random() * 7}
            opacity={Math.random() * 0.8 + 0.3}
            fontSize={Math.random() * (isMobile ? 14 : 18) + (isMobile ? 8 : 12)}
            reverse={true}
          />
        ))}
        
        {/* Enhanced Special Glowing Stars - Reduced on mobile */}
        {Array.from({ length: getStarCount(15, 6) }, (_, i) => (
          <StreamingStar
            key={`glow-${i}`}
            content="⭐"
            left={Math.random() * 30}
            bottom={Math.random() * 30}
            delay={Math.random() * 25}
            duration={10 + Math.random() * 10}
            opacity={Math.random() * 0.7 + 0.4}
            fontSize={Math.random() * (isMobile ? 20 : 25) + (isMobile ? 15 : 20)}
          />
        ))}

        {/* Enhanced Falling Stars - Full Page Coverage - Reduced on mobile */}
        {Array.from({ length: getStarCount(25, 10) }, (_, i) => (
          <FallingStar
            key={`falling-${i}`}
            size={Math.random() * (isMobile ? 2 : 3) + (isMobile ? 1 : 1.5)}
            left={Math.random() * 100}
            delay={Math.random() * 15}
            duration={6 + Math.random() * 6}
            variant={i % 3 === 0 ? 'diagonal' : i % 3 === 1 ? 'reverse' : 'straight'}
          />
        ))}

        {/* Additional enhanced falling stars - Reduced on mobile */}
        {!isMobile && Array.from({ length: 20 }, (_, i) => (
          <FallingStar
            key={`falling-wide-${i}`}
            size={Math.random() * 2 + 1}
            left={Math.random() * 100}
            delay={Math.random() * 20}
            duration={7 + Math.random() * 5}
            variant={i % 2 === 0 ? 'diagonal' : 'straight'}
          />
        ))}
      </div>

      {/* Enhanced Central Glow Effect */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        isMobile ? "w-64 h-64 blur-3xl" : "w-96 h-96 blur-4xl"
      } ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-300/30"}`} />

      {/* Enhanced Additional Glow Effects - Now shows in both modes */}
      <>
        <div className={`absolute bottom-0 left-0 ${
          isMobile ? "w-64 h-64 blur-2xl" : "w-96 h-96 blur-3xl"
        } animate-pulse ${isDarkMode ? "bg-orange-500/10" : "bg-orange-300/15"}`} />
        <div className={`absolute top-0 right-0 ${
          isMobile ? "w-64 h-64 blur-2xl" : "w-96 h-96 blur-3xl"
        } animate-pulse ${isDarkMode ? "bg-amber-500/10" : "bg-amber-300/15"}`} style={{ animationDelay: '3s' }} />
      </>

      {/* Enhanced Light mode accent shapes - Reduced on mobile */}
      {!isDarkMode && !isMobile && (
        <>
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] opacity-40 animate-spin-slow blur-3xl bg-yellow-200/50 rounded-full" />
          <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] opacity-35 animate-float blur-2xl bg-amber-200/40 rounded-full" />
        </>
      )}

      {/* Enhanced Main Content Container */}
      <div className="flex flex-col justify-center items-center relative z-30 content-container w-full max-w-6xl mx-auto -mt-12 sm:-mt-16">
        
        {/* Enhanced Profile Photo Container */}
        <div className="relative mb-6 sm:mb-8">
          <div className={`absolute inset-0 -m-4 sm:-m-6 border-2 rounded-full animate-spin-slow ${
            isDarkMode ? "border-yellow-400/60" : "border-yellow-500/70"
          }`} />
          <div className={`absolute inset-0 -m-6 sm:-m-8 border rounded-full animate-spin-slow ${
            isDarkMode ? "border-amber-400/50" : "border-amber-500/60"
          }`} style={{ animationDirection: 'reverse' }} />
          
          <img
            src="/images/Heni.JPG"
            alt="Henok Duga"
            className={`hero-photo relative ${
              isMobile ? "w-28 h-28" : "w-32 h-32 sm:w-40 sm:h-40"
            } rounded-full object-cover border-4 backdrop-blur-sm z-10 ${
              isDarkMode 
                ? "shadow-[0_0_80px_rgba(255,215,0,0.6)] border-yellow-400/80"
                : "shadow-[0_0_60px_rgba(255,193,7,0.5)] border-yellow-500/70"
            }`}
          />

          {/* Enhanced Floating elements */}
          <div className={`absolute -top-3 -left-3 sm:-top-4 sm:-left-4 ${
            isMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"
          } rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-yellow-400/90" : "bg-yellow-500/80"
          }`} />
          <div className={`absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 ${
            isMobile ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"
          } rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-amber-400/90" : "bg-amber-500/80"
          }`} style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Enhanced Text Content */}
        <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-wide px-4">
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
            isDarkMode 
              ? "from-yellow-400 via-amber-400 to-orange-400"
              : "from-yellow-600 via-amber-600 to-orange-600"
          }`}>
            <Typewriter
              words={["Hey, I'm Henok Duga", "But you can call me Heni"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className={`hero-description text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl tracking-normal px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border backdrop-blur-md ${
          isDarkMode 
            ? "text-white bg-black/50 border-yellow-400/30"
            : "text-gray-800 bg-white/95 border-yellow-500/40"
        }`}>
          Full-stack developer and freelancer. I build secure, scalable, role-aware interfaces with clean architecture and modern tools.
        </p>

        {/* Enhanced Buttons */}
        <div className="hero-buttons flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className={`backdrop-blur-lg px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl font-medium hover:scale-105 transition-all duration-300 border shadow-xl touch-manipulation ${
              isDarkMode 
                ? "bg-yellow-500/20 text-yellow-100 border-yellow-400/50 hover:bg-yellow-500/30 hover:border-yellow-400/70"
                : "bg-yellow-500/10 text-yellow-900 border-yellow-500/60 hover:bg-yellow-500/20 hover:border-yellow-600"
            }`}
          >
            See My Projects
          </a>
          <a
            href="#about"
            className={`px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-xl touch-manipulation ${
              isDarkMode 
                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600"
                : "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600"
            }`}
          >
            Learn More
          </a>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className={`hero-scroll mt-6 sm:mt-8 md:mt-12 animate-bounce text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border backdrop-blur-md ${
          isDarkMode 
            ? "text-yellow-200 bg-black/50 border-yellow-400/40"
            : "text-yellow-800 bg-white/90 border-yellow-500/50"
        }`}>
          ↓ Scroll to explore
        </div>
      </div>
    </section>
  );
}