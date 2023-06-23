import { Injectable } from '@nestjs/common';
import { Word, WordType } from '../../entities/word.entity';
import { PromptResponse } from '../prompt.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryRelatedWordType, RelatedWord } from '../../entities/related-word.entity';
import { CommonPhrasesInterface, FormInterface, UsageExamplesInterface } from '../../ai.types';

@Injectable()
export class PromptMapper {
	constructor(
		@InjectRepository(Word) private readonly wordRepository: Repository<Word>,
		@InjectRepository(RelatedWord) private readonly relatedWordRepository: Repository<RelatedWord>
	) {
	}

	async map(word: Word): Promise<PromptResponse> {
		let initialWord: Word = word;
		const commonPhrases: CommonPhrasesInterface[] = [];
		const forms: FormInterface[] = [];
		const synonyms: string[] = [];
		const usageExample: UsageExamplesInterface[] = [];

		if (word.type === WordType.Form) {
			initialWord = await this.wordRepository.findOneBy({id: word.wordId});
		}

		const relatedForms = await this.wordRepository.findBy({wordId: initialWord.id, type: WordType.Form});
		relatedForms.forEach(item => {
			forms.push({form: item.content, pronunciation: item.pronunciation});
		});

		const relatedWords = await this.relatedWordRepository.findBy({wordId: word.id});
		relatedWords.forEach(item => {
			switch (item.type) {
				case DictionaryRelatedWordType.Synonym:
					synonyms.push(item.content);
					break;
				case DictionaryRelatedWordType.UsageExample:
					usageExample.push({example: item.content, partOfSpeech: item.partOfSpeech});
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
			initialForm: initialWord?.content,
			commonPhrases,
			forms: forms,
			synonyms,
			usageExample
		});
	}
}