import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './practitioner.reducer';
import { IPractitioner } from 'app/shared/model/practitioner.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPractitionerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PractitionerDetail extends React.Component<IPractitionerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { practitionerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.practitioner.detail.title">Practitioner</Translate> [<b>{practitionerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="gender">
                <Translate contentKey="periolineApp.practitioner.gender">Gender</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.gender}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="periolineApp.practitioner.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="periolineApp.practitioner.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.lastName}</dd>
            <dt>
              <span id="birthDate">
                <Translate contentKey="periolineApp.practitioner.birthDate">Birth Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={practitionerEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="civility">
                <Translate contentKey="periolineApp.practitioner.civility">Civility</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.civility}</dd>
            <dt>
              <span id="diploma">
                <Translate contentKey="periolineApp.practitioner.diploma">Diploma</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.diploma}</dd>
            <dt>
              <span id="photo">
                <Translate contentKey="periolineApp.practitioner.photo">Photo</Translate>
              </span>
            </dt>
            <dd>
              {practitionerEntity.photo ? (
                <div>
                  <a onClick={openFile(practitionerEntity.photoContentType, practitionerEntity.photo)}>
                    <img
                      src={`data:${practitionerEntity.photoContentType};base64,${practitionerEntity.photo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {practitionerEntity.photoContentType}, {byteSize(practitionerEntity.photo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="signature">
                <Translate contentKey="periolineApp.practitioner.signature">Signature</Translate>
              </span>
            </dt>
            <dd>{practitionerEntity.signature}</dd>
            <dt>
              <Translate contentKey="periolineApp.practitioner.cabinet">Cabinet</Translate>
            </dt>
            <dd>{practitionerEntity.cabinet ? practitionerEntity.cabinet.id : ''}</dd>
            <dt>
              <Translate contentKey="periolineApp.practitioner.practitioner">Practitioner</Translate>
            </dt>
            <dd>{practitionerEntity.practitioner ? practitionerEntity.practitioner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/practitioner" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/practitioner/${practitionerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ practitioner }: IRootState) => ({
  practitionerEntity: practitioner.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PractitionerDetail);
