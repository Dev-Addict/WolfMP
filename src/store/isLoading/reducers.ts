import {IsLoadingState, IsLoadingActionTypes, SET_LOADING_STATE} from "./types";

const initialState: IsLoadingState = {
    isLoading: true
};

export const isLoadingReducer = (
    state = initialState,
    action: IsLoadingActionTypes
) => {
    switch (action.type) {
        case "SET_LOAD":
            return action.payload;
        default:
            return state;
    }
};
