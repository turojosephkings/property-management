import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { houses } from './houses';
import { workorders } from './workorders';
import { paymentorders } from './paymentorders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            houses,
            workorders,
            paymentorders

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}   