import { CommonPhrasesInterface, FormInterface, UsageExamplesInterface } from '../ai.types';

export class PromptResponse {
	id: string;
	content: string;
	pronunciation: string;
	initialForm: string;
	usageExample: UsageExamplesInterface[];
	forms: FormInterface[];
	synonyms: string[];
	commonPhrases: CommonPhrasesInterface[];
}