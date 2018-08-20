import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IPractitioner } from 'app/shared/model/practitioner.model';
import { getEntities as getPractitioners } from 'app/entities/practitioner/practitioner.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICabinetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICabinetUpdateState {
  isNew: boolean;
  idscabinet: any[];
  cabinetId: number;
  cabinetId: number;
}

export class CabinetUpdate extends React.Component<ICabinetUpdateProps, ICabinetUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscabinet: [],
      cabinetId: 0,
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

    this.props.getContacts();
    this.props.getPractitioners();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cabinetEntity } = this.props;
      const entity = {
        ...cabinetEntity,
        ...values,
        cabinets: mapIdList(values.cabinets)
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
    this.props.history.push('/entity/cabinet');
  };

  render() {
    const { cabinetEntity, contacts, practitioners, loading, updating } = this.props;
    const { isNew } = this.state;

    const { logo, logoContentType } = cabinetEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="periolineApp.cabinet.home.createOrEditLabel">
              <Translate contentKey="periolineApp.cabinet.home.createOrEditLabel">Create or edit a Cabinet</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cabinetEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cabinet-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="orgIdLabel" for="orgId">
                    <Translate contentKey="periolineApp.cabinet.orgId">Org Id</Translate>
                  </Label>
                  <AvField id="cabinet-orgId" type="text" name="orgId" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="periolineApp.cabinet.name">Name</Translate>
                  </Label>
                  <AvField id="cabinet-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="activityLabel" for="activity">
                    <Translate contentKey="periolineApp.cabinet.activity">Activity</Translate>
                  </Label>
                  <AvField id="cabinet-activity" type="text" name="activity" />
                </AvGroup>
                <AvGroup>
                  <Label id="websiteLabel" for="website">
                    <Translate contentKey="periolineApp.cabinet.website">Website</Translate>
                  </Label>
                  <AvField id="cabinet-website" type="text" name="website" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="logoLabel" for="logo">
                      <Translate contentKey="periolineApp.cabinet.logo">Logo</Translate>
                    </Label>
                    <br />
                    {logo ? (
                      <div>
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {logoContentType}, {byteSize(logo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('logo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_logo" type="file" onChange={this.onBlobChange(true, 'logo')} accept="image/*" />
                    <AvInput type="hidden" name="logo" value={logo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="cabinet.id">
                    <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
                  </Label>
                  <AvInput id="cabinet-cabinet" type="select" className="form-control" name="cabinet.id">
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
                  <Label for="practitioners">
                    <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
                  </Label>
                  <AvInput
                    id="cabinet-cabinet"
                    type="select"
                    multiple
                    className="form-control"
                    name="cabinets"
                    value={cabinetEntity.cabinets && cabinetEntity.cabinets.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/cabinet" replace color="info">
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
  cabinetEntity: storeState.cabinet.entity,
  loading: storeState.cabinet.loading,
  updating: storeState.cabinet.updating
});

const mapDispatchToProps = {
  getContacts,
  getPractitioners,
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
)(CabinetUpdate);
