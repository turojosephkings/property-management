import * as ActionTypes from './ActionTypes';

export const tenants = (state = { isLoading: true,
                                     errMess: null,
                                     tenants: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TENANTS:
            return {...state, isLoading: false, errMess: null, tenants: action.payload};

        case ActionTypes.TENANTS_LOADING:
            return {...state, isLoading: true, errMess: null, tenants: []}

        case ActionTypes.TENANTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};