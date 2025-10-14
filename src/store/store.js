import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import { thunk } from "redux-thunk";
import { claiminatorReducer } from "./claiminatorreducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  claim: claiminatorReducer,
});

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
