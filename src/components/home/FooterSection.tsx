import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800 dark:bg-gray-950 text-white text-center text-sm">
      <p>&copy; {new Date().getFullYear()}Zahkiel. Todos los derechos reservados.</p>
    </footer>
  );
};
