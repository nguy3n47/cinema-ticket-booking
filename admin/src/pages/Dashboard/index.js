import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getUserSelector } from '../../redux/selectors/authSelector';
import NotFound from '../NotFound';
import Cinema from './Cinema';
import Cineplex from './Cineplex';
import Home from './Home';
import Movie from './Movie';
import Setting from './Setting';
import Showtime from './Showtime';
import Statistic from './Statistic';
import Ticket from './Ticket';
import User from './User';

Dashboard.propTypes = {};

function Dashboard() {
  const match = useRouteMatch();
  const currentUser = useSelector(getUserSelector);

  if (!currentUser) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={`${match.url}`} component={Home} />
        <Route exact path={`${match.url}/movies`} component={Movie} />
        <Route exact path={`${match.url}/cineplexs`} component={Cineplex} />
        <Route exact path={`${match.url}/cinemas`} component={Cinema} />
        <Route path={`${match.url}/showtimes`} component={Showtime} />
        <Route exact path={`${match.url}/tickets`} component={Ticket} />
        <Route exact path={`${match.url}/users`} component={User} />
        <Route exact path={`${match.url}/statistics`} component={Statistic} />
        <Route exact path={`${match.url}/settings`} component={Setting} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default Dashboard;
