import { FaCode, FaHeart, FaRocket, FaLightbulb, FaStar, FaSeedling, FaPalette, FaBrain } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  // Removed unused isVisible state

  const aboutSections = [
    {
      title: "My Journey",
      icon: <FaRocket className="text-2xl" />,
      content: "I'm Heni — a full-stack architect with deep experience in React, Laravel, and secure payment integration. My journey began with a curiosity for how things work — not just how they look. I was drawn to the intersection of frontend precision and backend logic, and over time developed a forensic approach to debugging and architecture. That mindset shapes how I build today: with discipline, clarity, and purpose.",
      color: "blue",
      emoji: "🚀"
    },
    {
      title: "My Hobbies & Personal Life",
      icon: <FaHeart className="text-2xl" />,
      content: "Outside of code, I'm constantly exploring new technologies — from animation libraries like GSAP and Lottie to color systems and layout strategies. I enjoy researching design systems, testing UI patterns, and benchmarking developer portfolios. I also unwind with single-player games, tech documentaries, and deep dives into interface psychology.",
      color: "pink",
      emoji: "🎮"
    },
    {
      title: "What I'm Doing Now",
      icon: <FaCode className="text-2xl" />,
      content: "I'm currently refining my portfolio to match top-tier developer sites — benchmarking animations, color systems, and motion libraries. I'm integrating platform-aware flows like Telegram contact triggers, experimenting with advanced UI patterns using React-DnD and GSAP, and building scalable, maintainable interfaces that feel seamless and personal.",
      color: "green",
      emoji: "💻"
    },
    {
      title: "My Philosophy",
      icon: <FaLightbulb className="text-2xl" />,
      content: "I believe great design is not just visual — it's structural. I design role-aware flows that adapt to users' needs, whether they're admins, contributors, or end users. I use Tailwind for rapid, accessible styling and GSAP or Lottie for motion that feels intentional, not distracting. Every animation, every color choice, every layout decision is made with maintainability and user clarity in mind.",
      color: "yellow",
      emoji: "💡"
    }
  ];

  const floatingIcons = [
    { icon: <FaCode />, delay: 0, position: "top-20 left-10" },
    { icon: <FaStar />, delay: 1, position: "top-10 right-20" },
    { icon: <FaSeedling />, delay: 2, position: "bottom-20 left-20" },
    { icon: <FaPalette />, delay: 3, position: "bottom-10 right-10" },
    { icon: <FaBrain />, delay: 4, position: "top-1/2 left-1/4" },
    { icon: <FaRocket />, delay: 5, position: "top-1/3 right-1/3" }
  ];

  // Fixed TypeScript variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="about"
      className="relative py-20 px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden min-h-screen"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-cyan-50/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-cyan-900/10"></div>
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Floating Interactive Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-2xl ${item.position} text-blue-500/30 dark:text-blue-400/30`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Animated Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent relative z-10">
                About Me
              </h2>
            </div>
          </motion.div>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Passionate developer, continuous learner, and problem solver dedicated to creating exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Interactive Section Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap justify-center gap-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            {aboutSections.map((section, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  activeSection === index
                    ? section.color === 'blue' ? 'bg-blue-500 text-white shadow-lg' :
                      section.color === 'pink' ? 'bg-pink-500 text-white shadow-lg' :
                      section.color === 'green' ? 'bg-green-500 text-white shadow-lg' :
                      'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80'
                }`}
              >
                <span className="text-lg">{section.emoji}</span>
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced About Cards with Interactive Display */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className={`about-card group bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl p-8 border-2 backdrop-blur-xl shadow-2xl relative overflow-hidden ${
                  aboutSections[activeSection].color === 'blue' ? 'border-blue-200/50 dark:border-blue-700/50' :
                  aboutSections[activeSection].color === 'pink' ? 'border-pink-200/50 dark:border-pink-700/50' :
                  aboutSections[activeSection].color === 'green' ? 'border-green-200/50 dark:border-green-700/50' :
                  'border-yellow-200/50 dark:border-yellow-700/50'
                }`}
              >
                {/* Section Header */}
                <div className="flex items-center gap-6 mb-8 relative z-10">
                  <motion.div
                    className={`p-4 rounded-2xl shadow-lg ${
                      aboutSections[activeSection].color === 'blue' ? 'bg-blue-500 text-white' :
                      aboutSections[activeSection].color === 'pink' ? 'bg-pink-500 text-white' :
                      aboutSections[activeSection].color === 'green' ? 'bg-green-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {aboutSections[activeSection].icon}
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {aboutSections[activeSection].title}
                    </motion.h3>
                    <motion.div
                      className={`w-16 h-1 rounded-full ${
                        aboutSections[activeSection].color === 'blue' ? 'bg-blue-500' :
                        aboutSections[activeSection].color === 'pink' ? 'bg-pink-500' :
                        aboutSections[activeSection].color === 'green' ? 'bg-green-500' :
                        'bg-yellow-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <motion.p
                  className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {aboutSections[activeSection].content}
                </motion.p>

                {/* Interactive Progress Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {aboutSections.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeSection
                          ? aboutSections[activeSection].color === 'blue' ? 'bg-blue-500' :
                            aboutSections[activeSection].color === 'pink' ? 'bg-pink-500' :
                            aboutSections[activeSection].color === 'green' ? 'bg-green-500' :
                            'bg-yellow-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.5 }}
                      onClick={() => setActiveSection(index)}
                    />
                  ))}
                </div>

                {/* Animated Border Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    aboutSections[activeSection].color === 'blue' ? 'border-blue-500' :
                    aboutSections[activeSection].color === 'pink' ? 'border-pink-500' :
                    aboutSections[activeSection].color === 'green' ? 'border-green-500' :
                    'border-yellow-500'
                  }`}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${aboutSections[activeSection].color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : aboutSections[activeSection].color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : aboutSections[activeSection].color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                      `0 0 40px ${aboutSections[activeSection].color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : aboutSections[activeSection].color === 'pink' ? 'rgba(236, 72, 153, 0.5)' : aboutSections[activeSection].color === 'green' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(234, 179, 8, 0.5)'}`,
                      `0 0 20px ${aboutSections[activeSection].color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : aboutSections[activeSection].color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : aboutSections[activeSection].color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Skills Summary */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.h3
            className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Technologies I Work With
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {['React', 'Laravel', 'TypeScript', 'Tailwind', 'GSAP', 'Node.js', 'MySQL', 'Git', 'Framer Motion', 'Vite', 'PHP', 'JavaScript'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-5 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 rounded-2xl font-semibold backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.2 + (index * 0.1),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  backgroundColor: "rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Animated Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="text-xl" />
            <span className="font-semibold text-lg">Ready to Build Something Amazing?</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}