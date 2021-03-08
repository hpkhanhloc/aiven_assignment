import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import Home from "./components/Home"
import Search from "./components/Search"
import SiteNavigation from './SiteNavigation';
import { useStyles,lightTheme } from './styles';

const App: React.FC = () => {
  const classes = useStyles()()

  return (
    <Router>
    <ThemeProvider theme={lightTheme}>
    <div className={classes.root}>
          <CssBaseline />
          <SiteNavigation />
          <main className={classes.content}>
          <div className={classes.toolBar} />
          <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
      </Switch>
          </main>
      </div>
    </ThemeProvider>      
    </Router>
  );
}

export default App;
