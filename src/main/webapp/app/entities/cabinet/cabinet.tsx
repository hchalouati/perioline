import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICabinetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Cabinet extends React.Component<ICabinetProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cabinetList, match } = this.props;
    return (
      <div>
        <h2 id="cabinet-heading">
          <Translate contentKey="periolineApp.cabinet.home.title">Cabinets</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="periolineApp.cabinet.home.createLabel">Create new Cabinet</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.orgId">Org Id</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.activity">Activity</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.website">Website</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.logo">Logo</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
                </th>
                <th>
                  <Translate contentKey="periolineApp.cabinet.cabinet">Cabinet</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cabinetList.map((cabinet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cabinet.id}`} color="link" size="sm">
                      {cabinet.id}
                    </Button>
                  </td>
                  <td>{cabinet.orgId}</td>
                  <td>{cabinet.name}</td>
                  <td>{cabinet.activity}</td>
                  <td>{cabinet.website}</td>
                  <td>
                    {cabinet.logo ? (
                      <div>
                        <a onClick={openFile(cabinet.logoContentType, cabinet.logo)}>
                          <img src={`data:${cabinet.logoContentType};base64,${cabinet.logo}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {cabinet.logoContentType}, {byteSize(cabinet.logo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{cabinet.cabinet ? <Link to={`contact/${cabinet.cabinet.id}`}>{cabinet.cabinet.id}</Link> : ''}</td>
                  <td>
                    {cabinet.cabinets
                      ? cabinet.cabinets.map((val, j) => (
                          <span key={j}>
                            <Link to={`practitioner/${val.id}`}>{val.id}</Link>
                            {j === cabinet.cabinets.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cabinet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cabinet.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cabinet.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cabinet }: IRootState) => ({
  cabinetList: cabinet.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cabinet);
