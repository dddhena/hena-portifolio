import React, { useEffect, useState } from "react";
import { FaGithub, FaCode, FaServer, FaPalette, FaStar, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

type Project = {
  title: string;
  description: string;
  github: string;
  github2?: string;
  icon: React.ReactNode;
  languages?: Record<string, number>;
  stars?: number;
  watchers?: number;
  updated_at?: string;
  homepage?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // GitHub username - replace with your actual GitHub username
  const GITHUB_USERNAME = "dddhena";

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();

        const projectsData: Project[] = await Promise.all(
          repos
            .filter((repo: any) => !repo.fork && !repo.archived)
            .slice(0, 9)
            .map(async (repo: any) => {
              const langResponse = await fetch(repo.languages_url);
              const languages = langResponse.ok ? await langResponse.json() : {};

              const getIcon = () => {
                const primaryLang = Object.keys(languages)[0]?.toLowerCase();
                const repoName = repo.name.toLowerCase();

                if (repoName.includes('api') || repoName.includes('backend') || repoName.includes('server')) {
                  return <FaServer className="text-2xl" />;
                } else if (repoName.includes('frontend') || repoName.includes('client') || repoName.includes('web')) {
                  return <FaPalette className="text-2xl" />;
                } else if (primaryLang === 'javascript' || primaryLang === 'typescript' || primaryLang === 'python') {
                  return <FaCode className="text-2xl" />;
                } else {
                  return <FaCode className="text-2xl" />;
                }
              };

              return {
                title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                description: repo.description || "No description available",
                github: repo.html_url,
                homepage: repo.homepage,
                icon: getIcon(),
                languages: languages,
                stars: repo.stargazers_count,
                watchers: repo.watchers_count,
                updated_at: repo.updated_at,
              };
            })
        );

        setProjects(projectsData);
      } catch (err) {
        console.error("Error fetching GitHub projects:", err);
        setError("Failed to load projects from GitHub");
        setProjects(getFallbackProjects());
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  // Fallback projects in case GitHub API fails
  const getFallbackProjects = (): Project[] => [
    {
      title: "Student Management System",
      description: "Isolately Developed backend and front end in order to use the backend(API) for another purpose if needed.",
      github: "https://github.com/dddhena/student-management-system_laravel_api",
      github2: "https://github.com/dddhena/student-management-system_react-front",
      icon: <FaServer className="text-2xl" />
    },
    {
      title: "Fleet Management System",
      description: "Fleet Management System built with Laravel for efficient vehicle and driver management.",
      github: "https://github.com/dddhena/fleet_new",
      icon: <FaCode className="text-2xl" />
    },
    {
      title: "Portfolio Site",
      description: "Modern React + Tailwind portfolio with responsive design and smooth animations.",
      github: "https://github.com/henokduga/portfolio-site",
      icon: <FaPalette className="text-2xl" />
    },
  ];

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Animation variants
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
        duration: 0.6,
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
        duration: 0.5,
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

  if (loading) {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              My Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Loading projects from GitHub...
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg mb-6 animate-pulse"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-3/4 animate-pulse"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-red-500 dark:text-red-400 mb-8">{error}</p>
          <p className="text-gray-600 dark:text-gray-400">Showing fallback projects</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-circuit"></div>
      <div className="absolute inset-0 bg-dots"></div>
      
      {/* Floating Animated Shapes */}
      <motion.div
        className="floating-shape w-80 h-80 bg-blue-500 top-10 left-10"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="floating-shape w-64 h-64 bg-purple-500 bottom-20 right-20"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="floating-shape w-96 h-96 bg-cyan-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute top-20 right-20 text-4xl opacity-10 animate-float-gentle">{`</>`}</div>
      <div className="absolute bottom-32 left-20 text-3xl opacity-10 animate-float-gentle" style={{ animationDelay: '1.5s' }}>{`{}`}</div>
      <div className="absolute top-40 left-40 text-2xl opacity-10 animate-float-gentle" style={{ animationDelay: '2.5s' }}>{`=>`}</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Animated Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            My Projects
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A collection of my recent work showcasing full-stack development skills and modern technologies
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => {
            const languages = project.languages || {};
            const totalBytes = Object.values(languages).reduce((sum, b) => sum + b, 0);
            const topLanguages = Object.entries(languages)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 4);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="project-card group border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl relative overflow-hidden backdrop-blur-sm"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)',
                      'linear-gradient(45deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)',
                      'linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Project Icon and Stats */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <motion.div
                    className={`p-4 rounded-2xl inline-flex ${
                      hoveredCard === index 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    } transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.icon}
                  </motion.div>
                  
                  {/* GitHub Stats */}
                  <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                    {project.stars !== undefined && project.stars > 0 && (
                      <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaStar className="text-yellow-500" />
                        <span>{project.stars}</span>
                      </motion.div>
                    )}
                    {project.watchers !== undefined && (
                      <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaEye className="text-blue-500" />
                        <span>{project.watchers}</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <motion.h3
                  className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10"
                  whileHover={{ x: 5 }}
                >
                  {project.title}
                </motion.h3>

                {/* Project Description */}
                <motion.p
                  className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed relative z-10"
                  initial={false}
                  animate={{
                    height: selectedProject === index ? 'auto' : '4.5rem',
                    overflow: 'hidden'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>

                {/* Last Updated */}
                {project.updated_at && (
                  <motion.div
                    className="text-xs text-gray-500 dark:text-gray-400 mb-4 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Updated {formatRelativeTime(project.updated_at)}
                  </motion.div>
                )}

                {/* Language Tags */}
                {totalBytes > 0 && (
                  <motion.div
                    className="mb-6 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topLanguages.map(([lang, bytes], i) => {
                        const percent = ((bytes / totalBytes) * 100).toFixed(1);
                        return (
                          <motion.span
                            key={i}
                            className="lang-tag bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-2 rounded-full border border-blue-200 dark:border-blue-700 font-medium"
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                              backgroundColor: "rgba(59, 130, 246, 0.2)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {lang} <span className="text-blue-600 dark:text-blue-400 font-bold">{percent}%</span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* GitHub Links */}
                <motion.div
                  className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 group/link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-lg group-hover/link:scale-110 transition-transform" />
                    <span className="font-medium">View Code</span>
                  </motion.a>
                  
                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-300 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-lg group-hover/link:scale-110 transition-transform" />
                      <span className="font-medium">Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>

                {/* Hover Effect Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  animate={{
                    background: [
                      'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
                      'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
                      'linear-gradient(45deg, #8b5cf6, #06b6d4, #3b82f6)',
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-900"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              <FaGithub className="text-2xl" />
            </motion.div>
            <span className="text-lg font-semibold">Explore More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}