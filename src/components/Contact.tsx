import { useState, useRef, useEffect } from 'react';
import { FaTelegram, FaPaperPlane, FaEnvelope, FaUser, FaComments, FaCheck, FaRocket } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion'; // Type-only import

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeField, setActiveField] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const telegramUsername = 'heduga';
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedText = encodeURIComponent(text);

    // Use tg:// protocol to open native Telegram app
    const telegramUrl = `tg://resolve?domain=${telegramUsername}&text=${encodedText}`;

    // Fallback for browsers that don't support tg://
    const fallbackUrl = `https://t.me/${telegramUsername}?text=${encodedText}`;

    // Simulate sending animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try opening native app
    window.location.href = telegramUrl;

    // Optional: fallback after delay
    setTimeout(() => {
      window.open(fallbackUrl, '_blank');
    }, 1000);

    setIsSending(false);
    setIsSent(true);
    
    // Reset form after delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  // Floating particles effect
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `floating-particle absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      document.querySelector('.particles-container')?.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  // Fixed TypeScript variants with type-only import
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 },
    sending: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity
      }
    }
  };

  const inputVariants: Variants = {
    inactive: { 
      scale: 1,
      borderColor: "#d1d5db"
    },
    active: { 
      scale: 1.02,
      borderColor: "#3b82f6",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden min-h-screen flex items-center"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 contact-bg-pattern"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float-gentle"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-2xl animate-pulse-glow"></div>

      {/* Floating Particles Container */}
      <div className="particles-container absolute inset-0 overflow-hidden"></div>

      {/* Animated Connection Lines */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            d="M10,100 Q200,50 300,150 T500,100"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-path-move"
          />
          <path
            d="M600,50 Q400,100 300,50 T100,150"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-path-move"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Floating 3D Cards */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-20 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl"
        animate={{
          y: [0, 15, 0],
          rotateX: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Enhanced Animated Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-6 mb-8 relative">
              {/* Rotating Icon Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white relative z-10 shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaTelegram className="text-4xl" />
              </motion.div>
              
              <motion.h2 
                className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Let's Connect
              </motion.h2>
            </div>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Send me a message directly through Telegram
            </motion.p>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl p-8 shadow-2xl border-2 border-white/20 backdrop-blur-xl relative overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Form Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              {/* Name Input */}
              <motion.div
                variants={itemVariants}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField('')}
              >
                <motion.div
                  className="relative"
                  variants={inputVariants}
                  animate={activeField === 'name' ? 'active' : 'inactive'}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all duration-500"
                    required
                    disabled={isSending}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'name' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                variants={itemVariants}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField('')}
              >
                <motion.div
                  className="relative"
                  variants={inputVariants}
                  animate={activeField === 'email' ? 'active' : 'inactive'}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all duration-500"
                    required
                    disabled={isSending}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'email' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Message Input */}
              <motion.div
                variants={itemVariants}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField('')}
              >
                <motion.div
                  className="relative"
                  variants={inputVariants}
                  animate={activeField === 'message' ? 'active' : 'inactive'}
                >
                  <div className="absolute left-4 top-4 text-gray-400">
                    <FaComments />
                  </div>
                  <textarea
                    placeholder="Your Message... Tell me about your project or just say hello!"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all duration-500 resize-none"
                    required
                    disabled={isSending}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSending}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={!isSending && !isSent ? "hover" : "initial"}
                  whileTap={!isSending && !isSent ? "tap" : "initial"}
                  animate={isSending ? "sending" : isSent ? "initial" : "initial"}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className={`send-button group relative flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 overflow-hidden ${
                    isSending 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                      : isSent
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white'
                  }`}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered && !isSending && !isSent ? '100%' : '-100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Button Content */}
                  <AnimatePresence mode="wait">
                    {isSending ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                          transition={{ 
                            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                            scale: { duration: 0.5, repeat: Infinity }
                          }}
                          className="flex items-center justify-center"
                        >
                          <FaRocket className="text-xl" />
                        </motion.div>
                        <span className="animate-typing-dots">
                          Sending<span>.</span><span>.</span><span>.</span>
                        </span>
                      </motion.div>
                    ) : isSent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <FaCheck className="text-xl" />
                        </motion.div>
                        Message Sent!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ 
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.2 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaTelegram className="text-xl" />
                        </motion.div>
                        Send via Telegram
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Send Animation */}
                  {isSending && (
                    <motion.div
                      className="absolute right-4 text-white"
                      initial={{ x: 0, y: 0 }}
                      animate={{ 
                        x: [0, 50, 100],
                        y: [0, -20, -40],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    >
                      <FaPaperPlane />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Enhanced Alternative Contact */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Or contact me through other methods
              </p>
              <div className="flex justify-center gap-6">
                <motion.a
                  href="mailto:dddheni62@gmail.com"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope />
                  Email
                </motion.a>
                <motion.a
                  href="https://t.me/heduga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 dark:text-blue-300 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 backdrop-blur-sm border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTelegram />
                  Telegram
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Success Message */}
          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border border-green-300 dark:border-green-700 rounded-2xl text-green-700 dark:text-green-300 text-center backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-2xl mb-2"
                >
                  ✅
                </motion.div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm opacity-80">Opening Telegram...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}