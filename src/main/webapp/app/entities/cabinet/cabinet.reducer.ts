import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICabinet, defaultValue } from 'app/shared/model/cabinet.model';

export const ACTION_TYPES = {
  FETCH_CABINET_LIST: 'cabinet/FETCH_CABINET_LIST',
  FETCH_CABINET: 'cabinet/FETCH_CABINET',
  CREATE_CABINET: 'cabinet/CREATE_CABINET',
  UPDATE_CABINET: 'cabinet/UPDATE_CABINET',
  DELETE_CABINET: 'cabinet/DELETE_CABINET',
  SET_BLOB: 'cabinet/SET_BLOB',
  RESET: 'cabinet/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICabinet>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CabinetState = Readonly<typeof initialState>;

// Reducer

export default (state: CabinetState = initialState, action): CabinetState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CABINET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CABINET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CABINET):
    case REQUEST(ACTION_TYPES.UPDATE_CABINET):
    case REQUEST(ACTION_TYPES.DELETE_CABINET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CABINET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CABINET):
    case FAILURE(ACTION_TYPES.CREATE_CABINET):
    case FAILURE(ACTION_TYPES.UPDATE_CABINET):
    case FAILURE(ACTION_TYPES.DELETE_CABINET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CABINET_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CABINET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CABINET):
    case SUCCESS(ACTION_TYPES.UPDATE_CABINET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CABINET):
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

const apiUrl = 'api/cabinets';

// Actions

export const getEntities: ICrudGetAllAction<ICabinet> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CABINET_LIST,
  payload: axios.get<ICabinet>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICabinet> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CABINET,
    payload: axios.get<ICabinet>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICabinet> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CABINET,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICabinet> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CABINET,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICabinet> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CABINET,
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
