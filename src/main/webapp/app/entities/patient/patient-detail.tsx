import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './patient.reducer';
import { IPatient } from 'app/shared/model/patient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPatientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PatientDetail extends React.Component<IPatientDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { patientEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.patient.detail.title">Patient</Translate> [<b>{patientEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="orgId">
                <Translate contentKey="periolineApp.patient.orgId">Org Id</Translate>
              </span>
            </dt>
            <dd>{patientEntity.orgId}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="periolineApp.patient.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{patientEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="periolineApp.patient.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{patientEntity.lastName}</dd>
            <dt>
              <span id="gender">
                <Translate contentKey="periolineApp.patient.gender">Gender</Translate>
              </span>
            </dt>
            <dd>{patientEntity.gender}</dd>
            <dt>
              <span id="birthDate">
                <Translate contentKey="periolineApp.patient.birthDate">Birth Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={patientEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="civility">
                <Translate contentKey="periolineApp.patient.civility">Civility</Translate>
              </span>
            </dt>
            <dd>{patientEntity.civility}</dd>
            <dt>
              <span id="profession">
                <Translate contentKey="periolineApp.patient.profession">Profession</Translate>
              </span>
            </dt>
            <dd>{patientEntity.profession}</dd>
            <dt>
              <span id="note">
                <Translate contentKey="periolineApp.patient.note">Note</Translate>
              </span>
            </dt>
            <dd>{patientEntity.note}</dd>
            <dt>
              <Translate contentKey="periolineApp.patient.patient">Patient</Translate>
            </dt>
            <dd>{patientEntity.patient ? patientEntity.patient.id : ''}</dd>
            <dt>
              <Translate contentKey="periolineApp.patient.practitioner">Practitioner</Translate>
            </dt>
            <dd>{patientEntity.practitioner ? patientEntity.practitioner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/patient" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/patient/${patientEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ patient }: IRootState) => ({
  patientEntity: patient.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetail);
