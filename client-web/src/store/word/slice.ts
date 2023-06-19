import { IWordSliceState, Status } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { promptWordAction } from './asyncActions';

const initialState: IWordSliceState = {
	word: null,
	status: Status.NEVER
};

const wordSlice = createSlice({
	name: 'word',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(promptWordAction.fulfilled, (state, action) => {
			state.word = action.payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(promptWordAction.rejected, (state, action) => {
			state.word = null;
			state.status = Status.ERROR;
		});

		builder.addCase(promptWordAction.pending, (state, action) => {
			state.word = null;
			state.status = Status.LOADING;
		});
	}
});

export default wordSlice.reducer;