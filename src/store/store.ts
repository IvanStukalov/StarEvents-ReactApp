import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import starFilterSlice from './starFilterSlice';
import eventFilterSlice from './eventFilterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	user: userSlice,
	starFilter: starFilterSlice,
	eventFilter: eventFilterSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
