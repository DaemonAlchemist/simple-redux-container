/// <reference types="react" />
interface IReducerContainer {
    [id: string]: (state: any, action: any) => any;
}
export declare const ReduxContainer: (props: {
    children: any;
    reducers: IReducerContainer;
}) => JSX.Element;
export {};
