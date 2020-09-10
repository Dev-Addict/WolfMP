import {combineReducers, createStore} from 'redux';

import {songsReducer} from "./songs/reducers";


export const rootReducer = combineReducers({
    songs: songsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;

export default store;
