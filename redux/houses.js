import * as ActionTypes from './ActionTypes';

export const houses = (state = { isLoading: true,
                                     errMess: null,
                                     houses: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_HOUSES:
            return {...state, isLoading: false, errMess: null, houses: action.payload};

        case ActionTypes.HOUSES_LOADING:
            return {...state, isLoading: true, errMess: null, houses: []}

        case ActionTypes.HOUSES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};