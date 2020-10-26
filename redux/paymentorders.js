import * as ActionTypes from './ActionTypes';

export const paymentorders = (state = { isLoading: true,
                                     errMess: null,
                                     paymentorders: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PAYMENTORDERS:
            return {...state, isLoading: false, errMess: null, paymentorders: action.payload};

        case ActionTypes.PAYMENTORDERS_LOADING:
            return {...state, isLoading: true, errMess: null, paymentorders: []}

        case ActionTypes.PAYMENTORDERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};