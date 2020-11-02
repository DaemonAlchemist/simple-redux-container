"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxContainer = void 0;
var atp_pointfree_1 = require("atp-pointfree");
var connected_react_router_1 = require("connected-react-router");
var history_1 = require("history");
var React = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_localstorage_simple_1 = require("redux-localstorage-simple");
var redux_logger_1 = require("redux-logger");
var redux_thunk_1 = require("redux-thunk");
exports.ReduxContainer = function (props) {
    var history = history_1.createBrowserHistory();
    var reducers = __assign({ router: connected_react_router_1.connectRouter(history) }, props.reducers);
    var useLocalStorage = typeof props.useLocalStorage === 'undefined' ? true : props.useLocalStorage;
    var forceReset = typeof props.forceReset === 'undefined' ? false : props.forceReset;
    var useLogger = typeof props.useLogger === 'undefined' ? true : props.useLogger;
    var initialState = useLocalStorage ? (forceReset ?
        (props.initialState || redux_localstorage_simple_1.load()) :
        (redux_localstorage_simple_1.load() || props.initialState)) : (props.initialState || {});
    var middleware = __spreadArrays([
        connected_react_router_1.routerMiddleware(history),
        redux_thunk_1.default
    ], (useLogger ? [redux_logger_1.createLogger()] : []), (useLocalStorage ? [redux_localstorage_simple_1.save()] : []), (props.middleware || []));
    var store = redux_1.createStore(redux_1.combineReducers(reducers), initialState, redux_1.applyMiddleware.apply(void 0, middleware));
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(connected_react_router_1.ConnectedRouter, { history: history },
            React.createElement(React.Fragment, null, React.Children.map(props.children, atp_pointfree_1.identity)))));
};
