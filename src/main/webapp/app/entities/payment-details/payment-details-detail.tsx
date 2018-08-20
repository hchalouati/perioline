import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment-details.reducer';
import { IPaymentDetails } from 'app/shared/model/payment-details.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PaymentDetailsDetail extends React.Component<IPaymentDetailsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { paymentDetailsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.paymentDetails.detail.title">PaymentDetails</Translate> [<b>{paymentDetailsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="orgId">
                <Translate contentKey="periolineApp.paymentDetails.orgId">Org Id</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.orgId}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="periolineApp.paymentDetails.type">Type</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.type}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="periolineApp.paymentDetails.number">Number</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.number}</dd>
            <dt>
              <span id="expirationMonth">
                <Translate contentKey="periolineApp.paymentDetails.expirationMonth">Expiration Month</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.expirationMonth}</dd>
            <dt>
              <span id="expirationYear">
                <Translate contentKey="periolineApp.paymentDetails.expirationYear">Expiration Year</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.expirationYear}</dd>
            <dt>
              <span id="securityCode">
                <Translate contentKey="periolineApp.paymentDetails.securityCode">Security Code</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.securityCode}</dd>
            <dt>
              <span id="defaultCard">
                <Translate contentKey="periolineApp.paymentDetails.defaultCard">Default Card</Translate>
              </span>
            </dt>
            <dd>{paymentDetailsEntity.defaultCard ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="periolineApp.paymentDetails.cabinet">Cabinet</Translate>
            </dt>
            <dd>{paymentDetailsEntity.cabinet ? paymentDetailsEntity.cabinet.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/payment-details" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/payment-details/${paymentDetailsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ paymentDetails }: IRootState) => ({
  paymentDetailsEntity: paymentDetails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetailsDetail);
