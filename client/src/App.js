import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import MoviePage from './pages/Movie';
import CineplexPage from './pages/Cineplex';
import ShowtimePage from './pages/Showtime';
import MovieDetailPage from './pages/Movie/Detail';
import BookingPage from './pages/Booking';
import PaymentPage from './pages/Payment';
import ProfilePage from './pages/Profile';
import HistoryPage from './pages/History';
import PaymentDetailPage from './pages/Payment/Detail';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import EnterCode from './pages/Auth/EnterCode';
import VerifiedEmail from './pages/Auth/VerifiedEmail';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import NotFound from './pages/NotFound';

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
          <Route exact from="/cineplexs" component={CineplexPage} />
          <Route exact from="/showtimes" component={ShowtimePage} />
          <Route exact from="/movies/detail/:slug" component={MovieDetailPage} />
          <Route exact from="/booking/tickets/:showtimeId" component={BookingPage} />
          <Route exact from="/payment" component={PaymentPage} />
          <Route exact from="/payment/:id" component={PaymentDetailPage} />
          <Route exact from="/profile" component={ProfilePage} />
          <Route exact from="/history" component={HistoryPage} />
          <Route exact from="/login" component={LoginPage} />
          <Route exact from="/register" component={RegisterPage} />
          <Route exact from="/enter-code" component={EnterCode} />
          <Route exact from="/verified-email" component={VerifiedEmail} />
          <Route exact from="/forgot-password" component={ForgotPassword} />
          <Route exact from="/reset-password" component={ResetPassword} />
          <Route exact from="/change-password" component={ChangePassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
