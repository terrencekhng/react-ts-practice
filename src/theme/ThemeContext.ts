import * as React from 'react';

// Themes
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});

export default ThemeContext;