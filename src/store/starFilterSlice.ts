import { createSlice } from '@reduxjs/toolkit';

const starFilterSlice = createSlice({
	name: 'starFilter',
	initialState: {
		distBot: 0,
		distTop: 100,
		ageBot: 0,
		ageTop: 13.8,
		magBot: -27,
		magTop: 100,
		searchValue: '',
	},
	reducers: {
		setDistBot: (state, { payload }) => {
			state.distBot = payload;
		},
		setDistTop: (state, { payload }) => {
			state.distTop = payload;
		},
		setAgeBot: (state, { payload }) => {
			state.ageBot = payload;
		},
		setAgeTop: (state, { payload }) => {
			state.ageTop = payload;
		},
		setMagBot: (state, { payload }) => {
			state.magBot = payload;
		},
		setMagTop: (state, { payload }) => {
			state.magTop = payload;
		},
		setSearchValue: (state, { payload }) => {
			state.searchValue = payload;
		},
	},
});

export default starFilterSlice.reducer;
export const { setDistBot, setDistTop, setAgeBot, setAgeTop, setMagBot, setMagTop, setSearchValue } = starFilterSlice.actions;
