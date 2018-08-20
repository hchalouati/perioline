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
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IInvoiceUpdateState {
  isNew: boolean;
  cabinetId: number;
}

export class InvoiceUpdate extends React.Component<IInvoiceUpdateProps, IInvoiceUpdateState> {
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
      const { invoiceEntity } = this.props;
      const entity = {
        ...invoiceEntity,
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
    this.props.history.push('/entity/invoice');
  };

  render() {
    const { invoiceEntity, cabinets, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.invoice.home.createOrEditLabel">
              <Translate contentKey="periolineApp.invoice.home.createOrEditLabel">Create or edit a Invoice</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : invoiceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="orgIdLabel" for="orgId">
                    <Translate contentKey="periolineApp.invoice.orgId">Org Id</Translate>
                  </Label>
                  <AvField id="invoice-orgId" type="text" name="orgId" />
                </AvGroup>
                <AvGroup>
                  <Label id="productNameLabel" for="productName">
                    <Translate contentKey="periolineApp.invoice.productName">Product Name</Translate>
                  </Label>
                  <AvField id="invoice-productName" type="text" name="productName" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="periolineApp.invoice.date">Date</Translate>
                  </Label>
                  <AvField id="invoice-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalLabel" for="total">
                    <Translate contentKey="periolineApp.invoice.total">Total</Translate>
                  </Label>
                  <AvField id="invoice-total" type="number" className="form-control" name="total" />
                </AvGroup>
                <AvGroup>
                  <Label id="invoicePDFLabel" for="invoicePDF">
                    <Translate contentKey="periolineApp.invoice.invoicePDF">Invoice PDF</Translate>
                  </Label>
                  <AvField id="invoice-invoicePDF" type="text" name="invoicePDF" />
                </AvGroup>
                <AvGroup>
                  <Label for="cabinet.id">
                    <Translate contentKey="periolineApp.invoice.cabinet">Cabinet</Translate>
                  </Label>
                  <AvInput id="invoice-cabinet" type="select" className="form-control" name="cabinet.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/invoice" replace color="info">
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
  invoiceEntity: storeState.invoice.entity,
  loading: storeState.invoice.loading,
  updating: storeState.invoice.updating
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
)(InvoiceUpdate);
