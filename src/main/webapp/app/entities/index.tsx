import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Patient from './patient';
import PaymentDetails from './payment-details';
import Invoice from './invoice';
import Cabinet from './cabinet';
import Practitioner from './practitioner';
import Contact from './contact';
import Charting from './charting';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/patient`} component={Patient} />
      <ErrorBoundaryRoute path={`${match.url}/payment-details`} component={PaymentDetails} />
      <ErrorBoundaryRoute path={`${match.url}/invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}/cabinet`} component={Cabinet} />
      <ErrorBoundaryRoute path={`${match.url}/practitioner`} component={Practitioner} />
      <ErrorBoundaryRoute path={`${match.url}/contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}/charting`} component={Charting} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
