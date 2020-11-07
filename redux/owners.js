import * as ActionTypes from './ActionTypes';

export const owners = (state = { isLoading: true,
                                     errMess: null,
                                     owners: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_OWNERS:
            return {...state, isLoading: false, errMess: null, owners: action.payload};

        case ActionTypes.OWNERS_LOADING:
            return {...state, isLoading: true, errMess: null, owners: []}

        case ActionTypes.OWNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};