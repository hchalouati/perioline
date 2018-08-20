import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment-details.reducer';
import { IPaymentDetails } from 'app/shared/model/payment-details.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class PaymentDetails extends React.Component<IPaymentDetailsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { paymentDetailsList, match } = this.props;
    return (
      <div>
        <h2 id="payment-details-heading">
          <Translate contentKey="periolineApp.paymentDetails.home.title">Payment Details</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="periolineApp.paymentDetails.home.createLabel">Create new Payment Details</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.orgId">Org Id</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.expirationMonth">Expiration Month</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.expirationYear">Expiration Year</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.securityCode">Security Code</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.defaultCard">Default Card</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.paymentDetails.cabinet">Cabinet</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentDetailsList.map((paymentDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paymentDetails.id}`} color="link" size="sm">
                      {paymentDetails.id}
                    </Button>
                  </td>
                  <td>{paymentDetails.orgId}</td>
                  <td>
                    <Translate contentKey={`periolineApp.CardType.${paymentDetails.type}`} />
                  </td>
                  <td>{paymentDetails.number}</td>
                  <td>{paymentDetails.expirationMonth}</td>
                  <td>{paymentDetails.expirationYear}</td>
                  <td>{paymentDetails.securityCode}</td>
                  <td>{paymentDetails.defaultCard ? 'true' : 'false'}</td>
                  <td>
                    {paymentDetails.cabinet ? <Link to={`cabinet/${paymentDetails.cabinet.id}`}>{paymentDetails.cabinet.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paymentDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paymentDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paymentDetails.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ paymentDetails }: IRootState) => ({
  paymentDetailsList: paymentDetails.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetails);
