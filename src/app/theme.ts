export function initTheme() {
  const stored = localStorage.getItem('prashi:theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.classList.toggle('dark', theme === 'dark');
  return theme;
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
  localStorage.setItem('prashi:theme', newTheme);
  
  return newTheme;
}