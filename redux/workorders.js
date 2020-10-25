import * as ActionTypes from './ActionTypes';

export const workorders = (state = { isLoading: true,
                                     errMess: null,
                                     workorders: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WORKORDERS:
            return {...state, isLoading: false, errMess: null, workorders: action.payload};

        case ActionTypes.WORKORDERS_LOADING:
            return {...state, isLoading: true, errMess: null, workorders: []}

        case ActionTypes.WORKORDERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};