import { DictionaryRelatedWordType } from '../entities/related-word.entity';

export type CreateRelatedWordEntity = CreateSynonymEntity | CreateUsageExampleEntity | CreateCommonPhraseEntity;
export type BaseRelatedWordEntity = {
	content: string;
	wordId: string;
	type: DictionaryRelatedWordType;
}
export type CreateSynonymEntity = BaseRelatedWordEntity & {
	type: DictionaryRelatedWordType.Synonym;
}
export type CreateUsageExampleEntity = BaseRelatedWordEntity & {
	partOfSpeech: string;
	type: DictionaryRelatedWordType.UsageExample;
}
export type CreateCommonPhraseEntity = BaseRelatedWordEntity & {
	meaning: string;
	type: DictionaryRelatedWordType.CommonPhrase;
}