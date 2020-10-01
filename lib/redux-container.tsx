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

interface IReduxContainerProps {
    children: any;
    reducers:IReducerContainer;
    initialState?:any;
    middleware?:any[];
    useLocalStorage?: boolean;
    forceReset?:boolean;
    useLogger?: boolean;
}

export const ReduxContainer = (props:IReduxContainerProps) => {
    const history = createBrowserHistory();

    const reducers = {
        router: connectRouter(history),
        ...props.reducers
    };

    const useLocalStorage = typeof props.useLocalStorage === 'undefined' ? true : props.useLocalStorage;
    const forceReset = typeof props.forceReset === 'undefined' ? false : props.forceReset;
    const useLogger = typeof props.useLogger === 'undefined' ? true : props.useLogger;

    const initialState = useLocalStorage ? (
        forceReset ?
            (props.initialState || load()) :
            (load() || props.initialState)
    ) : (props.initialState || {});
    
    const middleware = [
        routerMiddleware(history),
        thunk,
        ...(useLogger ? [createLogger()] : []),
        ...(useLocalStorage ? [save()] : []),
        ...(props.middleware || [])
    ];

    const store = createStore(combineReducers(reducers), initialState, applyMiddleware(...middleware));

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <>{React.Children.map(props.children, identity)}</>
            </ConnectedRouter>
        </Provider>
    );
}
