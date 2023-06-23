import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptWordDto } from './dto/prompt-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word, WordType } from './entities/word.entity';
import { DictionaryRelatedWordType, RelatedWord } from './entities/related-word.entity';
import { Repository } from 'typeorm';
import { Configuration, OpenAIApi } from 'openai';
import { generateWordPrompt } from './ai.prompts';
import { ResponseAI } from './ai.types';
import { WrongWord } from './entities/wrong-word.entity';
import { SaveWordDto } from './dto/save-word.dto';

@Injectable()
export class AiService {
	private readonly openAI: OpenAIApi;

	constructor(
		@InjectRepository(Word) private readonly wordRepository: Repository<Word>,
		@InjectRepository(RelatedWord) private readonly relatedWordRepository: Repository<RelatedWord>,
		@InjectRepository(WrongWord) private readonly wrongWordRepository: Repository<WrongWord>,
		private readonly configService: ConfigService
	) {
		const apiKey = configService.getOrThrow('OPENAI_API_KEY');
		const config = new Configuration({apiKey});
		this.openAI = new OpenAIApi(config);
	};

	async promptWord(dto: PromptWordDto) {
		const wrongWord = await this.wrongWordRepository.findOneBy({content: dto.word});
		if (wrongWord) {
			throw new BadRequestException('Wrong word');
		}

		const oldWord = await this.wordRepository.findOneBy({content: dto.word});
		if (oldWord) {
			return oldWord;
		}

		const response = await this.requestAI(dto.word);
		if (!response.ok) {
			await this.wrongWordRepository.save(WrongWord.create({content: dto.word}));
			throw new BadRequestException('Wrong word');
		}

		let initialWord: Word | null = null;
		if (dto.word !== response.data.initialForm) {
			initialWord = await this.wordRepository.findOneBy({content: response.data.initialForm});
			if (!initialWord) {
				const initialWordResponse = await this.requestAI(response.data.initialForm);
				if (!initialWordResponse.ok) {
					throw new BadRequestException('Wrong word');
				}

				initialWord = await this.saveWord({
					word: response.data.initialForm,
					wordId: null,
					type: WordType.Initial,
					response: initialWordResponse.data
				});
			}
		}

		const responseWordFormType = dto.word === response.data.initialForm ? WordType.Initial : WordType.Form;
		const savedWord = await this.saveWord({
			word: dto.word,
			type: responseWordFormType,
			wordId: dto.word === response.data.initialForm ? null : initialWord?.id,
			response: response.data
		});

		for (const form of response.data.forms) {
			const oldFormWord = await this.wordRepository.findOneBy({content: form.form});
			if (oldFormWord) {
				continue;
			}

			const formResponse = await this.requestAI(form.form);
			if (formResponse.ok) {
				const formResponseWordFormType = form.form === formResponse.data.initialForm ? WordType.Initial : WordType.Form;
				await this.saveWord({
					word: form.form,
					type: formResponseWordFormType,
					wordId: dto.word === response.data.initialForm ? savedWord.id : initialWord?.id,
					response: formResponse.data
				});
			}
		}

		return savedWord;
	}

	private async saveWord({word, type, wordId, response}: SaveWordDto) {
		const savedWord = await this.wordRepository.save(Word.create({
			content: word,
			pronunciation: response.pronunciation,
			type: type,
			wordId: wordId
		}));

		for (const responseKey in response) {
			switch (responseKey) {
				case 'usageExamples':
					await Promise.all(response.usageExamples.map(async (item) => {
						await this.relatedWordRepository.save(RelatedWord.create({
							content: item.example,
							wordId: savedWord.id,
							partOfSpeech: item.partOfSpeech,
							type: DictionaryRelatedWordType.UsageExample
						}));
					}));
					break;
				case 'synonyms':
					await Promise.all(response.synonyms.map(async (item) => {
						await this.relatedWordRepository.save(RelatedWord.create({
							content: item,
							wordId: savedWord.id,
							type: DictionaryRelatedWordType.Synonym
						}));
					}));
					break;
				case 'commonPhrases':
					await Promise.all(response.commonPhrases.map(async (item) => {
						await this.relatedWordRepository.save(RelatedWord.create({
							content: item.phrase,
							meaning: item.meaning,
							wordId: savedWord.id,
							type: DictionaryRelatedWordType.CommonPhrase
						}));
					}));
					break;
				default:
					break;
			}
		}

		return savedWord;
	}

	private async requestAI(word: string): Promise<{ ok: true, data: ResponseAI } | { ok: false, error: string }> {
		try {
			const response: ResponseAI = await this.openAI.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{role: 'system', content: generateWordPrompt(word)}]
			}).then(r => r.data.choices[0].message.content)
				.then(r => JSON.parse(r));

			return {
				ok: true,
				data: response
			};
		} catch (e) {
			return {
				ok: false,
				error: 'Wrong word'
			};
		}
	}
}
