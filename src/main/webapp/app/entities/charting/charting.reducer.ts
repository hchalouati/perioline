import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICharting, defaultValue } from 'app/shared/model/charting.model';

export const ACTION_TYPES = {
  FETCH_CHARTING_LIST: 'charting/FETCH_CHARTING_LIST',
  FETCH_CHARTING: 'charting/FETCH_CHARTING',
  CREATE_CHARTING: 'charting/CREATE_CHARTING',
  UPDATE_CHARTING: 'charting/UPDATE_CHARTING',
  DELETE_CHARTING: 'charting/DELETE_CHARTING',
  RESET: 'charting/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICharting>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChartingState = Readonly<typeof initialState>;

// Reducer

export default (state: ChartingState = initialState, action): ChartingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHARTING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHARTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHARTING):
    case REQUEST(ACTION_TYPES.UPDATE_CHARTING):
    case REQUEST(ACTION_TYPES.DELETE_CHARTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHARTING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHARTING):
    case FAILURE(ACTION_TYPES.CREATE_CHARTING):
    case FAILURE(ACTION_TYPES.UPDATE_CHARTING):
    case FAILURE(ACTION_TYPES.DELETE_CHARTING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHARTING):
    case SUCCESS(ACTION_TYPES.UPDATE_CHARTING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHARTING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/chartings';

// Actions

export const getEntities: ICrudGetAllAction<ICharting> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHARTING_LIST,
  payload: axios.get<ICharting>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICharting> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHARTING,
    payload: axios.get<ICharting>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICharting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHARTING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICharting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHARTING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICharting> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHARTING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
