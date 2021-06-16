import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import EnterCode from './pages/Auth/EnterCode';
import VerifiedEmail from './pages/Auth/VerifiedEmail';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Header />
        <Switch>
          <Route exact from="/" component={HomePage} />
          <Route exact from="/login" component={LoginPage} />
          <Route exact from="/register" component={RegisterPage} />
          <Route exact from="/enter-code" component={EnterCode} />
          <Route exact from="/verified-email" component={VerifiedEmail} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
