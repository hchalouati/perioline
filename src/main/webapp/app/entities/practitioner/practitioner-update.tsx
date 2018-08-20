import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICabinet } from 'app/shared/model/cabinet.model';
import { getEntities as getCabinets } from 'app/entities/cabinet/cabinet.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './practitioner.reducer';
import { IPractitioner } from 'app/shared/model/practitioner.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPractitionerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPractitionerUpdateState {
  isNew: boolean;
  cabinetId: number;
  practitionerId: number;
  practitionerId: number;
}

export class PractitionerUpdate extends React.Component<IPractitionerUpdateProps, IPractitionerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cabinetId: 0,
      practitionerId: 0,
      practitionerId: 0,
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
    this.props.getContacts();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { practitionerEntity } = this.props;
      const entity = {
        ...practitionerEntity,
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
    this.props.history.push('/entity/practitioner');
  };

  render() {
    const { practitionerEntity, cabinets, contacts, loading, updating } = this.props;
    const { isNew } = this.state;

    const { photo, photoContentType } = practitionerEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.practitioner.home.createOrEditLabel">
              <Translate contentKey="periolineApp.practitioner.home.createOrEditLabel">Create or edit a Practitioner</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : practitionerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="practitioner-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="genderLabel">
                    <Translate contentKey="periolineApp.practitioner.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="practitioner-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && practitionerEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">
                      <Translate contentKey="periolineApp.Gender.MALE" />
                    </option>
                    <option value="FEMALE">
                      <Translate contentKey="periolineApp.Gender.FEMALE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="periolineApp.practitioner.firstName">First Name</Translate>
                  </Label>
                  <AvField id="practitioner-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="periolineApp.practitioner.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="practitioner-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="birthDateLabel" for="birthDate">
                    <Translate contentKey="periolineApp.practitioner.birthDate">Birth Date</Translate>
                  </Label>
                  <AvField id="practitioner-birthDate" type="date" className="form-control" name="birthDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="civilityLabel" for="civility">
                    <Translate contentKey="periolineApp.practitioner.civility">Civility</Translate>
                  </Label>
                  <AvField id="practitioner-civility" type="text" name="civility" />
                </AvGroup>
                <AvGroup>
                  <Label id="diplomaLabel" for="diploma">
                    <Translate contentKey="periolineApp.practitioner.diploma">Diploma</Translate>
                  </Label>
                  <AvField id="practitioner-diploma" type="text" name="diploma" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="photoLabel" for="photo">
                      <Translate contentKey="periolineApp.practitioner.photo">Photo</Translate>
                    </Label>
                    <br />
                    {photo ? (
                      <div>
                        <a onClick={openFile(photoContentType, photo)}>
                          <img src={`data:${photoContentType};base64,${photo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {photoContentType}, {byteSize(photo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('photo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_photo" type="file" onChange={this.onBlobChange(true, 'photo')} accept="image/*" />
                    <AvInput type="hidden" name="photo" value={photo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="signatureLabel" for="signature">
                    <Translate contentKey="periolineApp.practitioner.signature">Signature</Translate>
                  </Label>
                  <AvField id="practitioner-signature" type="text" name="signature" />
                </AvGroup>
                <AvGroup>
                  <Label for="cabinet.id">
                    <Translate contentKey="periolineApp.practitioner.cabinet">Cabinet</Translate>
                  </Label>
                  <AvInput id="practitioner-cabinet" type="select" className="form-control" name="cabinet.id">
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
                <AvGroup>
                  <Label for="practitioner.id">
                    <Translate contentKey="periolineApp.practitioner.practitioner">Practitioner</Translate>
                  </Label>
                  <AvInput id="practitioner-practitioner" type="select" className="form-control" name="practitioner.id">
                    <option value="" key="0" />
                    {contacts
                      ? contacts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/practitioner" replace color="info">
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
  contacts: storeState.contact.entities,
  practitionerEntity: storeState.practitioner.entity,
  loading: storeState.practitioner.loading,
  updating: storeState.practitioner.updating
});

const mapDispatchToProps = {
  getCabinets,
  getContacts,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PractitionerUpdate);
