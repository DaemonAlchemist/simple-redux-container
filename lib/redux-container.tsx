import {identity} from 'atp-pointfree';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {load, save} from 'redux-localstorage-simple';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

interface IReducerContainer {
    [id:string]:(state:any, action:any) => any;
}

export const ReduxContainer = (props:{children:any, reducers:IReducerContainer, initialState?: any}) => {
    const history = createBrowserHistory();

    const reducers = {
        router: connectRouter(history),
        ...props.reducers
    };

    const store = createStore(
        combineReducers(reducers),
        load() || props.initialState,
        applyMiddleware(routerMiddleware(history), thunk, createLogger(), save())
    );

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <>{React.Children.map(props.children, identity)}</>
            </ConnectedRouter>
        </Provider>
    );
}
