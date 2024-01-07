import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import starFilterSlice from './starFilterSlice';
import eventFilterSlice from './eventFilterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import draftSlice from './draftSlice';

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	user: userSlice,
	starFilter: starFilterSlice,
	eventFilter: eventFilterSlice,
	draft: draftSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer
})

export const persistor = persistStore(store)
