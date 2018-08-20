import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContactUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IContactUpdateState {
  isNew: boolean;
}

export class ContactUpdate extends React.Component<IContactUpdateProps, IContactUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { contactEntity } = this.props;
      const entity = {
        ...contactEntity,
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
    this.props.history.push('/entity/contact');
  };

  render() {
    const { contactEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.contact.home.createOrEditLabel">
              <Translate contentKey="periolineApp.contact.home.createOrEditLabel">Create or edit a Contact</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contactEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="contact-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="phone1Label" for="phone1">
                    <Translate contentKey="periolineApp.contact.phone1">Phone 1</Translate>
                  </Label>
                  <AvField id="contact-phone1" type="text" name="phone1" />
                </AvGroup>
                <AvGroup>
                  <Label id="email1Label" for="email1">
                    <Translate contentKey="periolineApp.contact.email1">Email 1</Translate>
                  </Label>
                  <AvField id="contact-email1" type="text" name="email1" />
                </AvGroup>
                <AvGroup>
                  <Label id="phone2Label" for="phone2">
                    <Translate contentKey="periolineApp.contact.phone2">Phone 2</Translate>
                  </Label>
                  <AvField id="contact-phone2" type="text" name="phone2" />
                </AvGroup>
                <AvGroup>
                  <Label id="email2Label" for="email2">
                    <Translate contentKey="periolineApp.contact.email2">Email 2</Translate>
                  </Label>
                  <AvField id="contact-email2" type="text" name="email2" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetAddressLabel" for="streetAddress">
                    <Translate contentKey="periolineApp.contact.streetAddress">Street Address</Translate>
                  </Label>
                  <AvField id="contact-streetAddress" type="text" name="streetAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    <Translate contentKey="periolineApp.contact.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField id="contact-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    <Translate contentKey="periolineApp.contact.country">Country</Translate>
                  </Label>
                  <AvField id="contact-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    <Translate contentKey="periolineApp.contact.city">City</Translate>
                  </Label>
                  <AvField id="contact-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="stateProvince">
                    <Translate contentKey="periolineApp.contact.stateProvince">State Province</Translate>
                  </Label>
                  <AvField id="contact-stateProvince" type="text" name="stateProvince" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contact" replace color="info">
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
  contactEntity: storeState.contact.entity,
  loading: storeState.contact.loading,
  updating: storeState.contact.updating
});

const mapDispatchToProps = {
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
)(ContactUpdate);
