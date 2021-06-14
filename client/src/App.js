import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route exact from="/" component={HomePage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
