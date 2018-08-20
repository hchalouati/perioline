import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPractitioner, defaultValue } from 'app/shared/model/practitioner.model';

export const ACTION_TYPES = {
  FETCH_PRACTITIONER_LIST: 'practitioner/FETCH_PRACTITIONER_LIST',
  FETCH_PRACTITIONER: 'practitioner/FETCH_PRACTITIONER',
  CREATE_PRACTITIONER: 'practitioner/CREATE_PRACTITIONER',
  UPDATE_PRACTITIONER: 'practitioner/UPDATE_PRACTITIONER',
  DELETE_PRACTITIONER: 'practitioner/DELETE_PRACTITIONER',
  SET_BLOB: 'practitioner/SET_BLOB',
  RESET: 'practitioner/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPractitioner>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PractitionerState = Readonly<typeof initialState>;

// Reducer

export default (state: PractitionerState = initialState, action): PractitionerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRACTITIONER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRACTITIONER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRACTITIONER):
    case REQUEST(ACTION_TYPES.UPDATE_PRACTITIONER):
    case REQUEST(ACTION_TYPES.DELETE_PRACTITIONER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRACTITIONER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRACTITIONER):
    case FAILURE(ACTION_TYPES.CREATE_PRACTITIONER):
    case FAILURE(ACTION_TYPES.UPDATE_PRACTITIONER):
    case FAILURE(ACTION_TYPES.DELETE_PRACTITIONER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTITIONER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTITIONER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRACTITIONER):
    case SUCCESS(ACTION_TYPES.UPDATE_PRACTITIONER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRACTITIONER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/practitioners';

// Actions

export const getEntities: ICrudGetAllAction<IPractitioner> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTITIONER_LIST,
    payload: axios.get<IPractitioner>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPractitioner> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTITIONER,
    payload: axios.get<IPractitioner>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPractitioner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRACTITIONER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPractitioner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRACTITIONER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPractitioner> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRACTITIONER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
