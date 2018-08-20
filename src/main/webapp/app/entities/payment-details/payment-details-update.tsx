import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICabinet } from 'app/shared/model/cabinet.model';
import { getEntities as getCabinets } from 'app/entities/cabinet/cabinet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './payment-details.reducer';
import { IPaymentDetails } from 'app/shared/model/payment-details.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaymentDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPaymentDetailsUpdateState {
  isNew: boolean;
  cabinetId: number;
}

export class PaymentDetailsUpdate extends React.Component<IPaymentDetailsUpdateProps, IPaymentDetailsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cabinetId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCabinets();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { paymentDetailsEntity } = this.props;
      const entity = {
        ...paymentDetailsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/payment-details');
  };

  render() {
    const { paymentDetailsEntity, cabinets, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.paymentDetails.home.createOrEditLabel">
              <Translate contentKey="periolineApp.paymentDetails.home.createOrEditLabel">Create or edit a PaymentDetails</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : paymentDetailsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="payment-details-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="orgIdLabel" for="orgId">
                    <Translate contentKey="periolineApp.paymentDetails.orgId">Org Id</Translate>
                  </Label>
                  <AvField id="payment-details-orgId" type="text" name="orgId" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="periolineApp.paymentDetails.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="payment-details-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && paymentDetailsEntity.type) || 'PERSONAL'}
                  >
                    <option value="PERSONAL">
                      <Translate contentKey="periolineApp.CardType.PERSONAL" />
                    </option>
                    <option value="BUSINESS">
                      <Translate contentKey="periolineApp.CardType.BUSINESS" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="periolineApp.paymentDetails.number">Number</Translate>
                  </Label>
                  <AvField id="payment-details-number" type="text" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationMonthLabel" for="expirationMonth">
                    <Translate contentKey="periolineApp.paymentDetails.expirationMonth">Expiration Month</Translate>
                  </Label>
                  <AvField id="payment-details-expirationMonth" type="number" className="form-control" name="expirationMonth" />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationYearLabel" for="expirationYear">
                    <Translate contentKey="periolineApp.paymentDetails.expirationYear">Expiration Year</Translate>
                  </Label>
                  <AvField id="payment-details-expirationYear" type="number" className="form-control" name="expirationYear" />
                </AvGroup>
                <AvGroup>
                  <Label id="securityCodeLabel" for="securityCode">
                    <Translate contentKey="periolineApp.paymentDetails.securityCode">Security Code</Translate>
                  </Label>
                  <AvField id="payment-details-securityCode" type="number" className="form-control" name="securityCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="defaultCardLabel" check>
                    <AvInput id="payment-details-defaultCard" type="checkbox" className="form-control" name="defaultCard" />
                    <Translate contentKey="periolineApp.paymentDetails.defaultCard">Default Card</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="cabinet.id">
                    <Translate contentKey="periolineApp.paymentDetails.cabinet">Cabinet</Translate>
                  </Label>
                  <AvInput id="payment-details-cabinet" type="select" className="form-control" name="cabinet.id">
                    <option value="" key="0" />
                    {cabinets
                      ? cabinets.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/payment-details" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cabinets: storeState.cabinet.entities,
  paymentDetailsEntity: storeState.paymentDetails.entity,
  loading: storeState.paymentDetails.loading,
  updating: storeState.paymentDetails.updating
});

const mapDispatchToProps = {
  getCabinets,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetailsUpdate);
