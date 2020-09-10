export interface IsLoadingState {
    isLoading: boolean
}

export const SET_LOADING_STATE = 'SET_LOAD';

interface SetLoadingState {
    type: typeof SET_LOADING_STATE
    payload: boolean
}

export type IsLoadingActionTypes = SetLoadingState;
