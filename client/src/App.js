import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import MoviePage from './pages/Movie';
import DetailPage from './pages/Movie/Detail';
import BookingPage from './pages/Booking';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import EnterCode from './pages/Auth/EnterCode';
import VerifiedEmail from './pages/Auth/VerifiedEmail';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Header />
        <Switch>
          <Redirect exact from="/movies" to="/movies/now-showing" />
          <Route exact from="/" component={HomePage} />
          <Route exact from="/movies/:state" component={MoviePage} />
          <Route exact from="/movies/detail/:slug" component={DetailPage} />
          <Route exact from="/booking/tickets/:showtimeId" component={BookingPage} />
          <Route exact from="/login" component={LoginPage} />
          <Route exact from="/register" component={RegisterPage} />
          <Route exact from="/enter-code" component={EnterCode} />
          <Route exact from="/verified-email" component={VerifiedEmail} />
          <Route exact from="/forgot-password" component={ForgotPassword} />
          <Route exact from="/reset-password" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
