import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { houses } from './houses';
import { workorders } from './workorders';
import { paymentorders } from './paymentorders';
import { owners } from './owners';
import { tenants } from './tenants';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            houses,
            workorders,
            paymentorders,
            tenants,
            owners


        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}   