import { Injectable } from '@nestjs/common';
import { Word } from '../../entities/word.entity';
import { PromptResponse } from '../prompt.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryRelatedWordType, RelatedWord } from '../../entities/related-word.entity';
import { CommonPhrasesInterface } from '../../ai.types';

@Injectable()
export class PromptMapper {
	constructor(
		@InjectRepository(Word) private readonly wordRepository: Repository<Word>,
		@InjectRepository(RelatedWord) private readonly relatedWordRepository: Repository<RelatedWord>
	) {
	}

	async map(word: Word): Promise<PromptResponse> {
		const relatedWords = await this.relatedWordRepository.findBy({wordId: word.id});
		const commonPhrases: CommonPhrasesInterface[] = [];
		const forms: string[] = [];
		const synonyms: string[] = [];
		const usageExample: string[] = [];

		relatedWords.forEach(item => {
			switch (item.type) {
				case DictionaryRelatedWordType.Synonym:
					synonyms.push(item.content);
					break;
				case DictionaryRelatedWordType.Form:
					forms.push(item.content);
					break;
				case DictionaryRelatedWordType.UsageExample:
					usageExample.push(item.content);
					break;
				case DictionaryRelatedWordType.CommonPhrase:
					commonPhrases.push({phrase: item.content, meaning: item.meaning});
					break;
				default:
					break;
			}
		});

		return ({
			id: word.id,
			content: word.content,
			pronunciation: word.pronunciation,
			commonPhrases,
			forms,
			synonyms,
			usageExample
		});
	}
}