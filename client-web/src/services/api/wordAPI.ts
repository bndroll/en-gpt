import { IPromptWordRequest, IPromptWordResponse } from '../../store/word/types';
import axios from 'axios';

export const wordAPI = {
	async promptWord(dto: IPromptWordRequest): Promise<IPromptWordResponse> {
		const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/ai`, {
			word: dto.word,
			language: dto.language ?? 'english'
		});
		return res.data;
	}
};