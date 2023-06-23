export interface IWordSliceState {
	word: IPromptWordResponse | null;
	status: Status;
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	NEVER = 'NEVER',
}

export interface IPromptWordResponse {
	id: string;
	content: string;
	pronunciation: string;
	initialForm: string;
	usageExample: UsageExamplesInterface[];
	forms: FormInterface[];
	synonyms: string[];
	commonPhrases: CommonPhrasesInterface[];
}

export interface FormInterface {
	form: string;
	pronunciation: string;
}

export interface UsageExamplesInterface {
	example: string;
	partOfSpeech: string;
}

export interface CommonPhrasesInterface {
	phrase: string;
	meaning: string;
}

export interface IPromptWordRequest {
	word: string;
	language?: string;
}