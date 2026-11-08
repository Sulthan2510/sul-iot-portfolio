import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'nexus-portfolio-theme';
const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, toggle: () => {} });

function initialTheme() {
  // index.html already resolved this before first paint — trust the attribute.
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  return 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode — the theme simply will not persist */
    }
    // keep the browser UI colour in step with the page
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f9fc' : '#070a0f');
  }, [theme]);

  const toggle = useCallback(() => setTheme((p) => (p === 'dark' ? 'light' : 'dark')), []);
  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/* Token names the SVG diagrams need, read back from the CSS variables so
   index.css stays the only place colours are defined. */
const DIAGRAM_TOKENS = [
  'line',
  'surface',
  'raised',
  'ink',
  'muted',
  'faint',
  'signal',
  'data',
  'warn',
  'violet',
  'bronze',
  'silver',
  'band',
];

export function usePalette() {
  const { theme } = useTheme();
  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (token) => {
      const channels = styles.getPropertyValue(`--c-${token}`).trim();
      return channels ? `rgb(${channels})` : '#888';
    };
    return DIAGRAM_TOKENS.reduce((acc, token) => {
      acc[token] = read(token);
      return acc;
    }, {});
    // `theme` is the real dependency: it is what changes the CSS variables
    // this reads, even though it is not referenced inside the callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
}
