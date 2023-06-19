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
	usageExample: string[];
	forms: string[];
	synonyms: string[];
	commonPhrases: CommonPhrasesInterface[];
}

export interface CommonPhrasesInterface {
	phrase: string;
	meaning: string;
}

export interface IPromptWordRequest {
	word: string;
	language?: string;
}