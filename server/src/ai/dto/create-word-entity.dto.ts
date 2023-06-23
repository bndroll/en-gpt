import { WordType } from '../entities/word.entity';

export type CreateWordEntity = {
	content: string;
	pronunciation: string;
	type: WordType;
	wordId: string | null;
};