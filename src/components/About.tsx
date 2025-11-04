import { FaCode, FaHeart, FaRocket, FaLightbulb } from "react-icons/fa";

export default function About() {
  const aboutSections = [
    {
      title: "My Journey",
      icon: <FaRocket className="text-2xl" />,
      content: "I'm Heni — a full-stack architect with deep experience in React, Laravel, and secure payment integration. My journey began with a curiosity for how things work — not just how they look. I was drawn to the intersection of frontend precision and backend logic, and over time developed a forensic approach to debugging and architecture. That mindset shapes how I build today: with discipline, clarity, and purpose."
    },
    {
      title: "My Hobbies & Personal Life",
      icon: <FaHeart className="text-2xl" />,
      content: "Outside of code, I'm constantly exploring new technologies — from animation libraries like GSAP and Lottie to color systems and layout strategies. I enjoy researching design systems, testing UI patterns, and benchmarking developer portfolios. I also unwind with single-player games, tech documentaries, and deep dives into interface psychology."
    },
    {
      title: "What I'm Doing Now",
      icon: <FaCode className="text-2xl" />,
      content: "I'm currently refining my portfolio to match top-tier developer sites — benchmarking animations, color systems, and motion libraries. I'm integrating platform-aware flows like Telegram contact triggers, experimenting with advanced UI patterns using React-DnD and GSAP, and building scalable, maintainable interfaces that feel seamless and personal."
    },
    {
      title: "My Philosophy",
      icon: <FaLightbulb className="text-2xl" />,
      content: "I believe great design is not just visual — it's structural. I design role-aware flows that adapt to users' needs, whether they're admins, contributors, or end users. I use Tailwind for rapid, accessible styling and GSAP or Lottie for motion that feels intentional, not distracting. Every animation, every color choice, every layout decision is made with maintainability and user clarity in mind."
    }
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 about-bg-pattern"></div>
      
      {/* Floating Code Brackets */}
      <div className="floating-code-bracket text-6xl text-blue-500 top-20 left-10 animate-float-up-down">{'{'}</div>
      <div className="floating-code-bracket text-6xl text-purple-500 bottom-20 right-10 animate-float-up-down" style={{ animationDelay: '2s' }}>{'}'}</div>
      <div className="floating-code-bracket text-4xl text-cyan-500 top-1/3 right-20 animate-float-up-down" style={{ animationDelay: '1s' }}>{'</>'}</div>
      <div className="floating-code-bracket text-4xl text-green-500 bottom-1/3 left-20 animate-float-up-down" style={{ animationDelay: '3s' }}>{'<>'}</div>

      {/* Connection Lines */}
      <div className="connection-line top-1/4 left-0 w-1/4 animate-gentle-glow"></div>
      <div className="connection-line top-1/2 right-0 w-1/4 animate-gentle-glow" style={{ animationDelay: '2s' }}></div>

      {/* Floating Shapes */}
      <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-10 left-1/4 animate-float-up-down blur-xl"></div>
      <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full bottom-10 right-1/4 animate-float-up-down blur-xl" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute w-24 h-24 bg-cyan-500/10 rounded-full top-1/2 left-10 animate-float-up-down blur-xl" style={{ animationDelay: '2.5s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 animate-text-shimmer">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer, continuous learner, and problem solver dedicated to creating exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aboutSections.map((section, index) => (
            <div
              key={index}
              className={`about-card group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 ${
                index % 2 === 0 ? 'lg:translate-y-4' : 'lg:-translate-y-4'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                  index === 1 ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400' :
                  index === 2 ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h3>
              </div>

              {/* Content */}
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {section.content}
              </p>

              {/* Animated Bottom Border */}
              <div className={`mt-6 pt-6 border-t transition-all duration-300 ${
                index === 0 ? 'border-blue-200 dark:border-blue-800 group-hover:border-blue-400' :
                index === 1 ? 'border-pink-200 dark:border-pink-800 group-hover:border-pink-400' :
                index === 2 ? 'border-green-200 dark:border-green-800 group-hover:border-green-400' :
                'border-yellow-200 dark:border-yellow-800 group-hover:border-yellow-400'
              }`}>
                <div className={`w-12 h-1 rounded-full transition-all duration-300 group-hover:w-24 ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-pink-500' :
                  index === 2 ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}></div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${
                index === 0 ? 'from-blue-500 to-cyan-500' :
                index === 1 ? 'from-pink-500 to-purple-500' :
                index === 2 ? 'from-green-500 to-blue-500' :
                'from-yellow-500 to-orange-500'
              }`}>
                <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-900"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {['React', 'Laravel', 'TypeScript', 'Tailwind', 'GSAP', 'Node.js', 'MySQL', 'Git'].map((skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative SVG */}
        <div className="absolute bottom-10 right-10 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-rotate-slow">
            <path
              d="M20,50 Q50,20 80,50 Q50,80 20,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-path-move"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}