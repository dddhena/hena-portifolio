import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    
    const root = window.document.documentElement;
    if (newDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Dispatch event for other components to listen to
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
    >
      <div className="relative">
        <FaSun className={`text-yellow-500 transition-all duration-300 ${
          dark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`} />
        <FaMoon className={`text-blue-400 absolute top-0 left-0 transition-all duration-300 ${
          dark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`} />
      </div>
      <span className="font-medium">
        {dark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}