import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { demandaReducer, usuarioReducer, demandaAtualReducer } from './reducers';

const rootReducer = combineReducers({ usuarioReducer, demandaReducer, demandaAtualReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));