import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: -1,
	login: "",
	isAuthorized: false,
	isAdmin: false,
}

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		updateUser: (state: any, action: any) => {
			state.userID = action.payload.user_id;
			state.login = action.payload.login;
			state.isAuthorized = action.payload.isAuthorized;
			state.isAdmin = action.payload.isAdmin;
		},

		cleanUser: (state: any) => {
			state.userID = -1;
			state.login = "";
			state.isAuthorized = false;
			state.isAdmin = false;
		}
	}
});

export const { updateUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
