import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { tenants } from './tenants';
import { owners } from './owners';

export const postHouse = (address, imageUrl, sqft, hoa, electricprovider, waterprovider, fuelprovider, bedrooms, bathrooms, halfbathroom, waterheater, airconditioner, furnace, washer, dryer, dishwasher, stove, rangehood, microwaverangehood, refrigerator, garagedooropener, sewertype, petfriendly, pool, notes) => dispatch =>  {

    const newHouse = {
        address,
        imageUrl,
        sqft,
        hoa,
        electricprovider,
        waterprovider,
        fuelprovider,
        bedrooms,
        bathrooms,
        halfbathroom,
        appliances: {
            waterheater,
            airconditioner,
            furnace,
            washer,
            dryer,
            dishwasher,
            stove,
            rangehood,
            microwaverangehood,
            refrigerator,
            garagedooropener
        },
        sewertype,
        petfriendly,
        pool,
        notes
    };

    setTimeout(() => {
        dispatch(addHouse(newHouse));
    }, 2000);

    fetch(baseUrl + "houses", {
        method: "POST",
        body: JSON.stringify(newHouse),
        headers: {
            "Content-Type" : "application/json",
        },
    })
}

export const addHouse  = house => ({
    type: ActionTypes.ADD_HOUSE,
    payload: house
});

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


export const fetchPaymentorders = () => dispatch => {

    dispatch(paymentordersLoading());

    return fetch(baseUrl + 'paymentorders')
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
        .then(paymentorders => dispatch(addPaymentorders(paymentorders)))
        .catch(error => dispatch(paymentordersFailed(error.message)));
};

export const paymentordersLoading = () => ({
    type: ActionTypes.PAYMENTORDERS_LOADING
});

export const paymentordersFailed = errMess => ({
    type: ActionTypes.PAYMENTORDERS_FAILED,
    payload: errMess
});

export const addPaymentorders = paymentorders => ({
    type: ActionTypes.ADD_PAYMENTORDERS,
    payload: paymentorders
});

export const fetchTenants = () => dispatch => {

    dispatch(tenantsLoading());

    return fetch(baseUrl + 'tenants')
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
        .then(tenants => dispatch(addTenants(tenants)))
        .catch(error => dispatch(tenantsFailed(error.message)));
};

export const tenantsLoading = () => ({
    type: ActionTypes.TENANTS_LOADING
});

export const tenantsFailed = errMess => ({
    type: ActionTypes.TENANTS_FAILED,
    payload: errMess
});

export const addTenants = tenants => ({
    type: ActionTypes.ADD_TENANTS,
    payload: tenants
});



export const fetchOwners = () => dispatch => {

    dispatch(ownersLoading());

    return fetch(baseUrl + 'owners')
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
        .then(tenants => dispatch(addOwners(owners)))
        .catch(error => dispatch(tenantsFailed(error.message)));
};

export const ownersLoading = () => ({
    type: ActionTypes.OWNERS_LOADING
});

export const ownersFailed = errMess => ({
    type: ActionTypes.OWNERS_FAILED,
    payload: errMess
});

export const addOwners = owners => ({
    type: ActionTypes.ADD_OWNERS,
    payload: owners
});