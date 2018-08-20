import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Charting from './charting';
import ChartingDetail from './charting-detail';
import ChartingUpdate from './charting-update';
import ChartingDeleteDialog from './charting-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChartingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChartingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChartingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Charting} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChartingDeleteDialog} />
  </>
);

export default Routes;
