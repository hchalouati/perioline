import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IPractitioner } from 'app/shared/model/practitioner.model';
import { getEntities as getPractitioners } from 'app/entities/practitioner/practitioner.reducer';
import { getEntity, updateEntity, createEntity, reset } from './patient.reducer';
import { IPatient } from 'app/shared/model/patient.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPatientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPatientUpdateState {
  isNew: boolean;
  patientId: number;
  practitionerId: number;
}

export class PatientUpdate extends React.Component<IPatientUpdateProps, IPatientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      patientId: 0,
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

    this.props.getContacts();
    this.props.getPractitioners();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { patientEntity } = this.props;
      const entity = {
        ...patientEntity,
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
    this.props.history.push('/entity/patient');
  };

  render() {
    const { patientEntity, contacts, practitioners, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.patient.home.createOrEditLabel">
              <Translate contentKey="periolineApp.patient.home.createOrEditLabel">Create or edit a Patient</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : patientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="patient-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="orgIdLabel" for="orgId">
                    <Translate contentKey="periolineApp.patient.orgId">Org Id</Translate>
                  </Label>
                  <AvField id="patient-orgId" type="text" name="orgId" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="periolineApp.patient.firstName">First Name</Translate>
                  </Label>
                  <AvField id="patient-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="periolineApp.patient.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="patient-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel">
                    <Translate contentKey="periolineApp.patient.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="patient-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && patientEntity.gender) || 'MALE'}
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
                  <Label id="birthDateLabel" for="birthDate">
                    <Translate contentKey="periolineApp.patient.birthDate">Birth Date</Translate>
                  </Label>
                  <AvField id="patient-birthDate" type="date" className="form-control" name="birthDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="civilityLabel" for="civility">
                    <Translate contentKey="periolineApp.patient.civility">Civility</Translate>
                  </Label>
                  <AvField id="patient-civility" type="text" name="civility" />
                </AvGroup>
                <AvGroup>
                  <Label id="professionLabel" for="profession">
                    <Translate contentKey="periolineApp.patient.profession">Profession</Translate>
                  </Label>
                  <AvField id="patient-profession" type="text" name="profession" />
                </AvGroup>
                <AvGroup>
                  <Label id="noteLabel" for="note">
                    <Translate contentKey="periolineApp.patient.note">Note</Translate>
                  </Label>
                  <AvField id="patient-note" type="text" name="note" />
                </AvGroup>
                <AvGroup>
                  <Label for="patient.id">
                    <Translate contentKey="periolineApp.patient.patient">Patient</Translate>
                  </Label>
                  <AvInput id="patient-patient" type="select" className="form-control" name="patient.id">
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
                <AvGroup>
                  <Label for="practitioner.id">
                    <Translate contentKey="periolineApp.patient.practitioner">Practitioner</Translate>
                  </Label>
                  <AvInput id="patient-practitioner" type="select" className="form-control" name="practitioner.id">
                    <option value="" key="0" />
                    {practitioners
                      ? practitioners.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/patient" replace color="info">
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
  contacts: storeState.contact.entities,
  practitioners: storeState.practitioner.entities,
  patientEntity: storeState.patient.entity,
  loading: storeState.patient.loading,
  updating: storeState.patient.updating
});

const mapDispatchToProps = {
  getContacts,
  getPractitioners,
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
)(PatientUpdate);
