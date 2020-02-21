/// <reference types="react" />
interface IReducerContainer {
    [id: string]: (state: any, action: any) => any;
}
interface IReduxContainerProps {
    children: any;
    reducers: IReducerContainer;
    initialState?: any;
    middleware?: any[];
    useLocalStorage?: boolean;
    forceReset?: boolean;
}
export declare const ReduxContainer: (props: IReduxContainerProps) => JSX.Element;
export {};
