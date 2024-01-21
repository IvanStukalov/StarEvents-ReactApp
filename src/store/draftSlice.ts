import { createSlice } from '@reduxjs/toolkit';

const draftSlice = createSlice({
	name: 'draft',
	initialState: {
		name: "",
	},
	reducers: {
		updateName: (state, { payload }) => {
			state.name = payload;
		},
	},
});

export default draftSlice.reducer;
export const { updateName } = draftSlice.actions;
