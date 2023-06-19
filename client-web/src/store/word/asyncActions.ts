import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPromptWordRequest, IPromptWordResponse } from './types';
import { wordAPI } from '../../services/api/wordAPI';

export const promptWordAction = createAsyncThunk<IPromptWordResponse, IPromptWordRequest>(
	'word/promptWordAction',
	async (dto: IPromptWordRequest): Promise<IPromptWordResponse> => {
		return await wordAPI.promptWord(dto);
	}
);
