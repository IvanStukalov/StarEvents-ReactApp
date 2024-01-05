import { useDispatch, useSelector } from "react-redux"
import { cleanUser, updateUser } from "../store/userSlice"
import { RootState } from "../store/types"
import { api } from "../api"

export const useUser = () => {
	const { userID, login, isAuthorized, isAdmin } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const setUser = (value: any) => {
		dispatch(updateUser(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const authorize = async () => {
		const response = await api.api.checkAuthList();

		if (response.status === 200) {
			const user = {
				userID: response.data["userId"],
				login: response.data["login"],
				isAuthorized: true,
				isAdmin: response.data["isAdmin"],
			}

			setUser(user)

			return true;
		} else {
			return false;
		}
	}

	return {
		userID,
		login,
		isAuthorized,
		isAdmin,
		setUser,
		resetUser,
		authorize,
	}
}
