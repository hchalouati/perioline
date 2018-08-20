import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICabinetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CabinetDetail extends React.Component<ICabinetDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cabinetEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.cabinet.detail.title">Cabinet</Translate> [<b>{cabinetEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="orgId">
                <Translate contentKey="periolineApp.cabinet.orgId">Org Id</Translate>
              </span>
            </dt>
            <dd>{cabinetEntity.orgId}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="periolineApp.cabinet.name">Name</Translate>
              </span>
            </dt>
            <dd>{cabinetEntity.name}</dd>
            <dt>
              <span id="activity">
                <Translate contentKey="periolineApp.cabinet.activity">Activity</Translate>
              </span>
            </dt>
            <dd>{cabinetEntity.activity}</dd>
            <dt>
              <span id="website">
                <Translate contentKey="periolineApp.cabinet.website">Website</Translate>
              </span>
            </dt>
            <dd>{cabinetEntity.website}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="periolineApp.cabinet.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {cabinetEntity.logo ? (
                <div>
                  <a onClick={openFile(cabinetEntity.logoContentType, cabinetEntity.logo)}>
                    <img src={`data:${cabinetEntity.logoContentType};base64,${cabinetEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {cabinetEntity.logoContentType}, {byteSize(cabinetEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
            </dt>
            <dd>{cabinetEntity.cabinet ? cabinetEntity.cabinet.id : ''}</dd>
            <dt>
              <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
            </dt>
            <dd>
              {cabinetEntity.cabinets
                ? cabinetEntity.cabinets.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === cabinetEntity.cabinets.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/cabinet" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/cabinet/${cabinetEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cabinet }: IRootState) => ({
  cabinetEntity: cabinet.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetDetail);
