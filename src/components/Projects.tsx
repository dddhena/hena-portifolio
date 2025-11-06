import React, { useEffect, useState } from "react";
import { FaGithub, FaCode, FaServer, FaPalette, FaStar, FaEye } from "react-icons/fa";

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
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // GitHub username - replace with your actual GitHub username
  const GITHUB_USERNAME = "dddhena"; // Change this to your GitHub username

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch user's public repositories
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();

        // Filter out forks and map to Project format
        const projectsData: Project[] = await Promise.all(
          repos
            .filter((repo: any) => !repo.fork && !repo.archived) // Exclude forks and archived repos
            .slice(0, 9) // Limit to 9 most recent projects
            .map(async (repo: any) => {
              // Fetch languages for each repository
              const langResponse = await fetch(repo.languages_url);
              const languages = langResponse.ok ? await langResponse.json() : {};

              // Get appropriate icon based on repo name or primary language
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
        // Fallback to hardcoded projects if API fails
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

  if (loading) {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Loading projects from GitHub...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg animate-pulse"
              >
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-3/4"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
                </div>
              </div>
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-circuit"></div>
      <div className="absolute inset-0 bg-dots"></div>
      
      {/* Floating Shapes */}
      <div className="floating-shape animate-float-gentle w-80 h-80 bg-blue-500 top-10 left-10"></div>
      <div className="floating-shape animate-float-gentle w-64 h-64 bg-purple-500 bottom-20 right-20" style={{ animationDelay: '2s' }}></div>
      <div className="floating-shape animate-pulse-glow w-96 h-96 bg-cyan-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }}></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work showcasing full-stack development skills and modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const languages = project.languages || {};
            const totalBytes = Object.values(languages).reduce((sum, b) => sum + b, 0);

            return (
              <div
                key={index}
                className={`project-card group border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Project Icon and Stats */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl inline-flex ${
                    hoveredCard === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-110' 
                      : 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  } transition-all duration-300`}>
                    {project.icon}
                  </div>
                  
                  {/* GitHub Stats */}
                  <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                    {project.stars !== undefined && project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.watchers !== undefined && (
                      <div className="flex items-center gap-1">
                        <FaEye className="text-blue-500" />
                        <span>{project.watchers}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Last Updated */}
                {project.updated_at && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Updated {formatRelativeTime(project.updated_at)}
                  </div>
                )}

                {/* Language Tags */}
                {totalBytes > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(languages).map(([lang, bytes], i) => {
                        const percent = ((bytes / totalBytes) * 100).toFixed(1);
                        return (
                          <span
                            key={i}
                            className="lang-tag bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-2 rounded-full border border-blue-200 dark:border-blue-700 font-medium"
                          >
                            {lang} <span className="text-blue-600 dark:text-blue-400 font-bold">{percent}%</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* GitHub Link */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 group/link"
                  >
                    <FaGithub className="text-lg group-hover/link:scale-110 transition-transform" />
                    <span className="font-medium">View Code</span>
                  </a>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaGithub className="text-2xl" />
            <span className="text-lg font-semibold">Explore More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}