import { RootState } from '../store';
import { IPromptWordResponse, Status } from './types';

export const selectWord = (state: RootState): IPromptWordResponse | null => state.word.word;
export const selectStatus = (state: RootState): Status => state.word.status;