import { CommonPhrasesInterface } from '../ai.types';

export class PromptResponse {
	id: string;
	content: string;
	pronunciation: string;
	usageExample: string[];
	forms: string[];
	synonyms: string[];
	commonPhrases: CommonPhrasesInterface[];
}