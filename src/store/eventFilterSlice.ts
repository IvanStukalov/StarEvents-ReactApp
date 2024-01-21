import { createSlice } from '@reduxjs/toolkit';

const eventFilterSlice = createSlice({
	name: 'eventFilter',
	initialState: {
		minDate: "",
		maxDate: "",
		status: "",
	},
	reducers: {
		updateMinDate: (state, { payload }) => {
			state.minDate = payload;
		},
		updateMaxDate: (state, { payload }) => {
			state.maxDate = payload;
		},
		updateStatus: (state, { payload }) => {
			state.status = payload;
		},
	},
});

export default eventFilterSlice.reducer;
export const { updateMinDate, updateMaxDate, updateStatus } = eventFilterSlice.actions;
