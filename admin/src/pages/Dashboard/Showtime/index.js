import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../NotFound';
import DetailPage from './Detail';
import MainPage from './Main';

function Showtime() {
  const match = useRouteMatch();

  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Showtimes</h1>
        </Col>
      </Row>
      <Row>
        <Switch>
          <Route exact path={`${match.url}`} component={MainPage} />
          <Route exact path={`${match.url}/:id`} component={DetailPage} />
          <Route component={NotFound} />
        </Switch>
      </Row>
    </div>
  );
}

export default Showtime;
