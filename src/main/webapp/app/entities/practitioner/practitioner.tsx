import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './practitioner.reducer';
import { IPractitioner } from 'app/shared/model/practitioner.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPractitionerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IPractitionerState = IPaginationBaseState;

export class Practitioner extends React.Component<IPractitionerProps, IPractitionerState> {
  state: IPractitionerState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { practitionerList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="practitioner-heading">
          <Translate contentKey="periolineApp.practitioner.home.title">Practitioners</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="periolineApp.practitioner.home.createLabel">Create new Practitioner</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('gender')}>
                  <Translate contentKey="periolineApp.practitioner.gender">Gender</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('firstName')}>
                  <Translate contentKey="periolineApp.practitioner.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('lastName')}>
                  <Translate contentKey="periolineApp.practitioner.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('birthDate')}>
                  <Translate contentKey="periolineApp.practitioner.birthDate">Birth Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('civility')}>
                  <Translate contentKey="periolineApp.practitioner.civility">Civility</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('diploma')}>
                  <Translate contentKey="periolineApp.practitioner.diploma">Diploma</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('photo')}>
                  <Translate contentKey="periolineApp.practitioner.photo">Photo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('signature')}>
                  <Translate contentKey="periolineApp.practitioner.signature">Signature</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="periolineApp.practitioner.cabinet">Cabinet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="periolineApp.practitioner.practitioner">Practitioner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {practitionerList.map((practitioner, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${practitioner.id}`} color="link" size="sm">
                      {practitioner.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`periolineApp.Gender.${practitioner.gender}`} />
                  </td>
                  <td>{practitioner.firstName}</td>
                  <td>{practitioner.lastName}</td>
                  <td>
                    <TextFormat type="date" value={practitioner.birthDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{practitioner.civility}</td>
                  <td>{practitioner.diploma}</td>
                  <td>
                    {practitioner.photo ? (
                      <div>
                        <a onClick={openFile(practitioner.photoContentType, practitioner.photo)}>
                          <img src={`data:${practitioner.photoContentType};base64,${practitioner.photo}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {practitioner.photoContentType}, {byteSize(practitioner.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{practitioner.signature}</td>
                  <td>{practitioner.cabinet ? <Link to={`cabinet/${practitioner.cabinet.id}`}>{practitioner.cabinet.id}</Link> : ''}</td>
                  <td>
                    {practitioner.practitioner ? (
                      <Link to={`contact/${practitioner.practitioner.id}`}>{practitioner.practitioner.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${practitioner.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${practitioner.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${practitioner.id}/delete`} color="danger" size="sm">
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
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ practitioner }: IRootState) => ({
  practitionerList: practitioner.entities,
  totalItems: practitioner.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Practitioner);
