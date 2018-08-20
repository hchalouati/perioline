import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './charting.reducer';
import { ICharting } from 'app/shared/model/charting.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChartingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChartingDetail extends React.Component<IChartingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chartingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="periolineApp.charting.detail.title">Charting</Translate> [<b>{chartingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="orgId">
                <Translate contentKey="periolineApp.charting.orgId">Org Id</Translate>
              </span>
            </dt>
            <dd>{chartingEntity.orgId}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="periolineApp.charting.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{chartingEntity.notes}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="periolineApp.charting.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={chartingEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="periolineApp.charting.patient">Patient</Translate>
            </dt>
            <dd>{chartingEntity.patient ? chartingEntity.patient.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/charting" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/charting/${chartingEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ charting }: IRootState) => ({
  chartingEntity: charting.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartingDetail);
