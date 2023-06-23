import { WordType } from '../entities/word.entity';
import { ResponseAI } from '../ai.types';

export class SaveWordDto {
	word: string;
	type: WordType;
	response: ResponseAI;
	wordId: string | null;
}