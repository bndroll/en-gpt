export interface ResponseAI {
	pronunciation: string;
	usageExamples: UsageExamplesInterface[];
	forms: FormInterface[];
	synonyms: string[];
	commonPhrases: CommonPhrasesInterface[];
}

export interface FormInterface {
	form: string;
	pronunciation: string;
}

export interface CommonPhrasesInterface {
	phrase: string;
	meaning: string;
}

export interface UsageExamplesInterface {
	example: string;
	partOfSpeech: string;
}