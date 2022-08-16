import { compose, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import combineReducer from "./combineReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducer,
    compose(composeWithDevTools(applyMiddleware(...[sagaMiddleware])))
);

export type AppDispatch = typeof store.dispatch;
