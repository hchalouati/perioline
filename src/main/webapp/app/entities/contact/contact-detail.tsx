import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ContactDetail extends React.Component<IContactDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contactEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.contact.detail.title">Contact</Translate> [<b>{contactEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="phone1">
                <Translate contentKey="periolineApp.contact.phone1">Phone 1</Translate>
              </span>
            </dt>
            <dd>{contactEntity.phone1}</dd>
            <dt>
              <span id="email1">
                <Translate contentKey="periolineApp.contact.email1">Email 1</Translate>
              </span>
            </dt>
            <dd>{contactEntity.email1}</dd>
            <dt>
              <span id="phone2">
                <Translate contentKey="periolineApp.contact.phone2">Phone 2</Translate>
              </span>
            </dt>
            <dd>{contactEntity.phone2}</dd>
            <dt>
              <span id="email2">
                <Translate contentKey="periolineApp.contact.email2">Email 2</Translate>
              </span>
            </dt>
            <dd>{contactEntity.email2}</dd>
            <dt>
              <span id="streetAddress">
                <Translate contentKey="periolineApp.contact.streetAddress">Street Address</Translate>
              </span>
            </dt>
            <dd>{contactEntity.streetAddress}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="periolineApp.contact.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{contactEntity.postalCode}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="periolineApp.contact.country">Country</Translate>
              </span>
            </dt>
            <dd>{contactEntity.country}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="periolineApp.contact.city">City</Translate>
              </span>
            </dt>
            <dd>{contactEntity.city}</dd>
            <dt>
              <span id="stateProvince">
                <Translate contentKey="periolineApp.contact.stateProvince">State Province</Translate>
              </span>
            </dt>
            <dd>{contactEntity.stateProvince}</dd>
          </dl>
          <Button tag={Link} to="/entity/contact" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/contact/${contactEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ contact }: IRootState) => ({
  contactEntity: contact.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetail);
