import {IsLoadingActionType, SET_LOADING_STATE} from "./types";

export const setLoadingState = (loadingState: boolean): IsLoadingActionType => ({
    type: SET_LOADING_STATE,
    payload: loadingState
});
