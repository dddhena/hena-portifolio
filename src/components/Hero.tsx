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

// Star component for orbiting stars
const OrbitingStar = ({ size, delay, duration, reverse = false, twinkle = false }: OrbitingStarProps) => (
  <div
    className={`star ${reverse ? 'star-orbiting-reverse' : 'star-orbiting'} ${
      twinkle ? 'animate-twinkle' : ''
    }`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Star component for floating background stars
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

// Star component for streaming stars
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

// Shooting star component
const ShootingStar = ({ delay, left, top }: ShootingStarProps) => (
  <div
    className="star star-shooting"
    style={{
      animationDelay: `${delay}s`,
      left: `${left}%`,
      top: `${top}%`,
      width: '4px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,1), rgba(255,255,255,0.8), transparent)',
    }}
  />
);

// Falling star component - moves from top to bottom
const FallingStar = ({ size, left, delay, duration, variant = 'straight' }: FallingStarProps) => {
  const getAnimationClass = () => {
    switch (variant) {
      case 'diagonal':
        return 'animate-falling-star-diagonal';
      case 'reverse':
        return 'animate-falling-star-reverse';
      default:
        return 'animate-falling-star';
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

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initial theme
    checkTheme();

    // Listen for theme changes
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

    // Listen for custom theme change event
    const handleThemeChange = () => {
      checkTheme();
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('themeChange', handleThemeChange);
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

  return (
    <section
      id="home"
      className={`relative flex flex-col justify-center items-center min-h-screen px-6 text-center overflow-hidden ${getBackgroundClass()} ${
        isDarkMode ? "text-white" : "text-gray-900"
      } ${graphicsReady ? "" : "opacity-0"} transition-colors duration-500`}
      style={{ paddingTop: '80px' }}
    >
      {/* Wave Background Layers */}
      <div className="wave-layer-1" />
      <div className="wave-layer-2" />
      <div className="wave-layer-3" />

      {/* Floating Particles for Depth */}
      {Array.from({ length: 25 }, (_, i) => (
        <WaveParticle
          key={`particle-${i}`}
          size={Math.random() * 120 + 30}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 25}
          duration={25 + Math.random() * 20}
          opacity={Math.random() * 0.15 + 0.05}
        />
      ))}

      {/* Stars Container - Only in dark mode */}
      {isDarkMode && (
        <div className="stars-container">
          {/* Orbiting Stars */}
          {Array.from({ length: 15 }, (_, i) => (
            <OrbitingStar
              key={`orbit-${i}`}
              size={Math.random() * 5 + 1}
              delay={Math.random() * 3}
              duration={15 + Math.random() * 15}
              reverse={i >= 7}
              twinkle={i % 3 === 0}
            />
          ))}
          
          {/* Floating Background Stars */}
          {Array.from({ length: 80 }, (_, i) => (
            <FloatingStar
              key={`float-${i}`}
              size={Math.random() * 3 + 0.5}
              left={Math.random() * 100}
              top={Math.random() * 100}
              delay={Math.random() * 8}
              duration={20 + Math.random() * 25}
              opacity={Math.random() * 0.8 + 0.2}
            />
          ))}
          
          {/* Shooting Stars */}
          {Array.from({ length: 8 }, (_, i) => (
            <ShootingStar
              key={`shoot-${i}`}
              delay={Math.random() * 15}
              left={Math.random() * 25}
              top={Math.random() * 60}
            />
          ))}
          
          {/* Streaming Stars - Bottom-left to Top-right */}
          {Array.from({ length: 25 }, (_, i) => (
            <StreamingStar
              key={`stream-${i}`}
              content="★"
              left={Math.random() * 25 - 15}
              bottom={Math.random() * 25 - 15}
              delay={Math.random() * 12}
              duration={5 + Math.random() * 6}
              opacity={Math.random() * 0.9 + 0.1}
              fontSize={Math.random() * 16 + 12}
            />
          ))}
          
          {/* Streaming Stars - Top-right to Bottom-left */}
          {Array.from({ length: 20 }, (_, i) => (
            <StreamingStar
              key={`stream-rev-${i}`}
              content="★"
              right={Math.random() * 25 - 15}
              top={Math.random() * 25 - 15}
              delay={Math.random() * 15}
              duration={7 + Math.random() * 5}
              opacity={Math.random() * 0.7 + 0.2}
              fontSize={Math.random() * 14 + 10}
              reverse={true}
            />
          ))}
          
          {/* Special Glowing Stars */}
          {Array.from({ length: 8 }, (_, i) => (
            <StreamingStar
              key={`glow-${i}`}
              content="⭐"
              left={Math.random() * 20}
              bottom={Math.random() * 20}
              delay={Math.random() * 20}
              duration={8 + Math.random() * 7}
              opacity={Math.random() * 0.6 + 0.3}
              fontSize={Math.random() * 15 + 20}
            />
          ))}

          {/* Falling Stars - Top to Bottom around profile */}
          {Array.from({ length: 12 }, (_, i) => (
            <FallingStar
              key={`falling-${i}`}
              size={Math.random() * 2 + 1}
              left={40 + (Math.random() * 20 - 10)} // Concentrate around profile (40-60% range)
              delay={Math.random() * 10}
              duration={4 + Math.random() * 4}
              variant={i % 3 === 0 ? 'diagonal' : i % 3 === 1 ? 'reverse' : 'straight'}
            />
          ))}

          {/* Additional falling stars with wider distribution */}
          {Array.from({ length: 8 }, (_, i) => (
            <FallingStar
              key={`falling-wide-${i}`}
              size={Math.random() * 1.5 + 0.5}
              left={20 + (Math.random() * 60)} // Wider distribution (20-80% range)
              delay={Math.random() * 15}
              duration={5 + Math.random() * 3}
              variant={i % 2 === 0 ? 'diagonal' : 'straight'}
            />
          ))}
        </div>
      )}

      {/* Central Glow Effect */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl ${
        isDarkMode ? "bg-blue-500/25" : "bg-blue-300/40"
      }`} />

      {/* Additional Glow Effects - Only in dark mode */}
      {isDarkMode && (
        <>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </>
      )}

      {/* Light mode accent shapes */}
      {!isDarkMode && (
        <>
          <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] opacity-50 animate-spin-slow blur-2xl bg-blue-200/60 rounded-full" />
          <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] opacity-40 animate-float blur-xl bg-purple-200/50 rounded-full" />
        </>
      )}

      {/* Main Content Container with proper positioning - Profile moved upward */}
      <div className="flex flex-col justify-center items-center relative z-30 content-container w-full max-w-6xl mx-auto -mt-16">
        
        {/* Profile Photo Container - Centered properly and moved upward */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 -m-4 border-2 rounded-full animate-spin-slow ${
            isDarkMode ? "border-blue-400/50" : "border-blue-400/70"
          }`} />
          <div className={`absolute inset-0 -m-6 border rounded-full animate-spin-slow ${
            isDarkMode ? "border-purple-400/40" : "border-purple-400/60"
          }`} style={{ animationDirection: 'reverse' }} />
          
          <img
            src="/images/Heni.JPG"
            alt="Henok Duga"
            className={`hero-photo relative w-40 h-40 rounded-full object-cover border-4 backdrop-blur-sm z-10 ${
              isDarkMode 
                ? "shadow-[0_0_60px_rgba(59,130,246,0.7)] border-blue-400/90"
                : "shadow-[0_0_50px_rgba(59,130,246,0.5)] border-blue-400/80"
            }`}
          />

          {/* Floating elements */}
          <div className={`absolute -top-4 -left-4 w-6 h-6 rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-yellow-400/90" : "bg-yellow-400/70"
          }`} />
          <div className={`absolute -bottom-4 -right-4 w-4 h-4 rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-cyan-400/90" : "bg-cyan-400/70"
          }`} style={{ animationDelay: '0.5s' }} />
          <div className={`absolute -top-4 -right-4 w-5 h-5 rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-pink-400/90" : "bg-pink-400/70"
          }`} style={{ animationDelay: '1s' }} />
          <div className={`absolute -bottom-4 -left-4 w-3 h-3 rounded-full blur-sm animate-bounce ${
            isDarkMode ? "bg-green-400/90" : "bg-green-400/70"
          }`} style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Text Content */}
        <h1 className="hero-heading text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-wide">
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
            isDarkMode 
              ? "from-blue-400 via-purple-400 to-cyan-400"
              : "from-blue-600 via-purple-600 to-cyan-600"
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

        <p className={`hero-description text-lg md:text-xl mb-8 max-w-2xl tracking-normal px-6 py-3 rounded-2xl border ${
          isDarkMode 
            ? "text-white bg-black/40 border-white/30 backdrop-blur-sm"
            : "text-gray-800 bg-white/90 border-gray-300/60 backdrop-blur-sm"
        }`}>
          Full-stack developer and freelancer. I build secure, scalable, role-aware interfaces with clean architecture and modern tools.
        </p>

        {/* Buttons - Fixed text color to black in light mode */}
        <div className="hero-buttons flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className={`backdrop-blur-md px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 border shadow-lg ${
              isDarkMode 
                ? "bg-white/15 text-white border-white/40 hover:bg-white/25 hover:border-white/60"
                : "bg-white/90 text-black border-gray-300 hover:bg-white hover:border-gray-400"
            }`}
          >
            See My Projects
          </a>
          <a
            href="#about"
            className={`px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg ${
              isDarkMode 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            Learn More
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className={`hero-scroll mt-12 animate-bounce text-sm px-4 py-2 rounded-full border ${
          isDarkMode 
            ? "text-white bg-black/40 border-white/30 backdrop-blur-sm"
            : "text-gray-700 bg-white/90 border-gray-300/60 backdrop-blur-sm"
        }`}>
          ↓ Scroll to explore
        </div>
      </div>
    </section>
  );
}