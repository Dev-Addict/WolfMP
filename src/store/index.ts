import {combineReducers, createStore} from 'redux';

import {songsReducer} from "./songs/reducers";
import {isLoadingReducer} from "./isLoading/reducers";


export const rootReducer = combineReducers({
    songs: songsReducer,
    isLoading: isLoadingReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;

export default store;
