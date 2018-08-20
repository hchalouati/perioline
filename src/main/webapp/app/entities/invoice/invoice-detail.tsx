import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class InvoiceDetail extends React.Component<IInvoiceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { invoiceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.invoice.detail.title">Invoice</Translate> [<b>{invoiceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="orgId">
                <Translate contentKey="periolineApp.invoice.orgId">Org Id</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.orgId}</dd>
            <dt>
              <span id="productName">
                <Translate contentKey="periolineApp.invoice.productName">Product Name</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.productName}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="periolineApp.invoice.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="total">
                <Translate contentKey="periolineApp.invoice.total">Total</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.total}</dd>
            <dt>
              <span id="invoicePDF">
                <Translate contentKey="periolineApp.invoice.invoicePDF">Invoice PDF</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.invoicePDF}</dd>
            <dt>
              <Translate contentKey="periolineApp.invoice.cabinet">Cabinet</Translate>
            </dt>
            <dd>{invoiceEntity.cabinet ? invoiceEntity.cabinet.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/invoice" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/invoice/${invoiceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
