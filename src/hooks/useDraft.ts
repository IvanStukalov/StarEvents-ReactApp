import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { updateName } from '../store/draftSlice';

export function useDraft() {
	const draftName = useSelector((state: RootState) => state.draft.name);

	const dispatch = useDispatch();

	const setDraftName = (value: string) => {
		dispatch(updateName(value));
	}

	return {
		draftName,
		setDraftName,
	}
}
