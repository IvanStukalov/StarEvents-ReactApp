import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { updateMaxDate, updateMinDate, updateStatus } from '../store/eventFilterSlice';

export function useEventList() {
	const minDate = useSelector((state: RootState) => state.eventFilter.minDate);
	const maxDate = useSelector((state: RootState) => state.eventFilter.maxDate);
	const status = useSelector((state: RootState) => state.eventFilter.status);

	const dispatch = useDispatch();

	const setMinDate = (value: string) => {
		dispatch(updateMinDate(value));
	}
	const setMaxDate = (value: string) => {
		dispatch(updateMaxDate(value));
	}
	const setStatus = (value: string) => {
		dispatch(updateStatus(value));
	}

	return {
		minDate,
		maxDate,
		status,
		setMinDate,
		setMaxDate,
		setStatus,
	}
}
