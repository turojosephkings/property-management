import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchHouses = () => dispatch => {

    dispatch(housesLoading());

    return fetch(baseUrl + 'houses')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(houses => dispatch(addHouses(houses)))
        .catch(error => dispatch(housesFailed(error.message)));
};

export const housesLoading = () => ({
    type: ActionTypes.HOUSES_LOADING
});

export const housesFailed = errMess => ({
    type: ActionTypes.HOUSES_FAILED,
    payload: errMess
});

export const addHouses = houses => ({
    type: ActionTypes.ADD_HOUSES,
    payload: houses
});


export const fetchWorkorders = () => dispatch => {

    dispatch(workordersLoading());

    return fetch(baseUrl + 'workorders')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(workorders => dispatch(addWorkorders(workorders)))
        .catch(error => dispatch(workordersFailed(error.message)));
};

export const workordersLoading = () => ({
    type: ActionTypes.WORKORDERS_LOADING
});

export const workordersFailed = errMess => ({
    type: ActionTypes.WORKORDERS_FAILED,
    payload: errMess
});

export const addWorkorders = workorders => ({
    type: ActionTypes.ADD_WORKORDERS,
    payload: workorders
});