import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import {songsReducer} from "./songs/reducers";
import {isLoadingReducer} from "./isLoading/reducers";
import {audioReducer} from "./audio/reducers";


export const rootReducer = combineReducers({
    songs: songsReducer,
    isLoading: isLoadingReducer,
    audio: audioReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export type AppDispatch = typeof store.dispatch;

export default store;
