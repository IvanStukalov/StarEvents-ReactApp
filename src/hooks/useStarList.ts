import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setAgeBot, setAgeTop, setDistBot, setDistTop, setMagBot, setMagTop, setSearchValue } from '../store/starFilterSlice';

export function useStarList() {
	const distBot = useSelector((state: RootState) => state.starFilter.distBot);
	const distTop = useSelector((state: RootState) => state.starFilter.distTop);
	const ageBot = useSelector((state: RootState) => state.starFilter.ageBot);
	const ageTop = useSelector((state: RootState) => state.starFilter.ageTop);
	const magBot = useSelector((state: RootState) => state.starFilter.magBot);
	const magTop = useSelector((state: RootState) => state.starFilter.magTop);
	const searchValue = useSelector((state: RootState) => state.starFilter.searchValue);

	const dispatch = useDispatch();

	const setDistMin = (value: number) => {
		dispatch(setDistBot(value));
	}
	const setDistMax = (value: number) => {
		dispatch(setDistTop(value));
	}
	const setAgeMin = (value: number) => {
		dispatch(setAgeBot(value));
	}
	const setAgeMax = (value: number) => {
		dispatch(setAgeTop(value));
	}
	const setMagMin = (value: number) => {
		dispatch(setMagBot(value));
	}
	const setMagMax = (value: number) => {
		dispatch(setMagTop(value));
	}
	const setSearchName = (value: string) => {
		dispatch(setSearchValue(value));
	}

	return {
		distBot,
		distTop,
		ageBot,
		ageTop,
		magBot,
		magTop,
		searchValue,
		setDistMin,
		setDistMax,
		setAgeMin,
		setAgeMax,
		setMagMin,
		setMagMax,
		setSearchName,
	}
}
