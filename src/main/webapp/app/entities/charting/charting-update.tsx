import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { getEntity, updateEntity, createEntity, reset } from './charting.reducer';
import { ICharting } from 'app/shared/model/charting.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChartingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IChartingUpdateState {
  isNew: boolean;
  patientId: number;
}

export class ChartingUpdate extends React.Component<IChartingUpdateProps, IChartingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      patientId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPatients();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { chartingEntity } = this.props;
      const entity = {
        ...chartingEntity,
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
    this.props.history.push('/entity/charting');
  };

  render() {
    const { chartingEntity, patients, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.charting.home.createOrEditLabel">
              <Translate contentKey="periolineApp.charting.home.createOrEditLabel">Create or edit a Charting</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chartingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="charting-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="orgIdLabel" for="orgId">
                    <Translate contentKey="periolineApp.charting.orgId">Org Id</Translate>
                  </Label>
                  <AvField id="charting-orgId" type="text" name="orgId" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="periolineApp.charting.notes">Notes</Translate>
                  </Label>
                  <AvField id="charting-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="periolineApp.charting.date">Date</Translate>
                  </Label>
                  <AvField id="charting-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label for="patient.id">
                    <Translate contentKey="periolineApp.charting.patient">Patient</Translate>
                  </Label>
                  <AvInput id="charting-patient" type="select" className="form-control" name="patient.id">
                    <option value="" key="0" />
                    {patients
                      ? patients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/charting" replace color="info">
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
  patients: storeState.patient.entities,
  chartingEntity: storeState.charting.entity,
  loading: storeState.charting.loading,
  updating: storeState.charting.updating
});

const mapDispatchToProps = {
  getPatients,
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
)(ChartingUpdate);
