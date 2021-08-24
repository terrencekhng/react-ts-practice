import './App.css';
import ThemeContext, { themes } from './theme/ThemeContext';

// Components
import Header from './components/Header';
import FancyInput from './components/FancyInput';
import CountClick from './components/CountClick';
import CustomCheckBox from './components/Checkbox';
import React, { useEffect, useState } from 'react';

// Router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const toggleTheme = (): void => {
    setCurrentTheme(state => ({
      ...state,
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }))
  };

  const [currentTheme, setCurrentTheme] = useState<{ theme: typeof themes.dark; toggleTheme: () => void; }>({
    theme: themes.dark,
    toggleTheme
  });

  const fancyInputRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    fancyInputRef.current?.focus();
  }, [fancyInputRef]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="App">
        <Header title="Terence Ng" firstName="Terence" lastName="Ng"></Header>
        <Router>
          <div className='navigation-bar'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
          </div>

          <Switch>
            <Route path='/about'>
              <button onClick={toggleTheme}>Change theme</button>
            </Route>
            <Route path="/users">
              <CountClick></CountClick>
            </Route>
            <Route path="/">
              <FancyInput ref={fancyInputRef}></FancyInput>
              <CustomCheckBox></CustomCheckBox>
            </Route>
          </Switch>
        </Router>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
