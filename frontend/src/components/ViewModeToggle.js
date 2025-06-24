import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();

    if (totalMinutes >= 1110 || totalMinutes < 360) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

  }, []);

  return [darkMode, setDarkMode];
}