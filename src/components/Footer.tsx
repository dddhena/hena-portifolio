export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-900 bg-white dark:bg-gray-900 dark:text-white py-6 text-center text-sm">
      <p>
        © {new Date().getFullYear()} Henok Duga — Built with React & Tailwind
      </p>
    </footer>
  );
}
