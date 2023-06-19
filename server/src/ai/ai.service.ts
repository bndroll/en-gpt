import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptWordDto } from './dto/prompt-word.dto';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { DictionaryRelatedWordType, RelatedWord } from './entities/related-word.entity';
import { Repository } from 'typeorm';
import { Configuration, OpenAIApi } from 'openai';
import { generateWordPrompt } from './ai.prompts';
import { ResponseAI } from './ai.types';
import { WrongWord } from './entities/wrong-word.entity';

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

		const oldPhrase = await this.relatedWordRepository.findOneBy({
			content: dto.word,
			type: DictionaryRelatedWordType.Form
		});
		if (oldPhrase) {
			return await this.wordRepository.findOneBy({id: oldPhrase.wordId});
		}

		try {
			const response: ResponseAI = await this.openAI.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{role: 'system', content: generateWordPrompt(dto.word)}]
			}).then(r => r.data.choices[0].message.content)
				.then(r => JSON.parse(r));

			const newWord = new Word();
			newWord.id = generateString();
			newWord.content = dto.word;
			newWord.pronunciation = response.pronunciation;
			const savedWord = await this.wordRepository.save(newWord);

			for (const responseKey in response) {
				switch (responseKey) {
					case 'usageExamples':
						await Promise.all(response.usageExamples.map(async (item) => {
							const relatedWord = new RelatedWord();
							relatedWord.id = generateString();
							relatedWord.wordId = savedWord.id;
							relatedWord.content = item.example;
							relatedWord.type = DictionaryRelatedWordType.UsageExample;
							await this.relatedWordRepository.save(relatedWord);
						}));
						break;
					case 'forms':
						await Promise.all(response.forms.map(async (item) => {
							const relatedWord = new RelatedWord();
							relatedWord.id = generateString();
							relatedWord.wordId = savedWord.id;
							relatedWord.content = item.form;
							relatedWord.pronunciation = item.pronunciation;
							relatedWord.type = DictionaryRelatedWordType.Form;
							await this.relatedWordRepository.save(relatedWord);
						}));
						break;
					case 'synonyms':
						await Promise.all(response.synonyms.map(async (item) => {
							const relatedWord = new RelatedWord();
							relatedWord.id = generateString();
							relatedWord.wordId = savedWord.id;
							relatedWord.content = item;
							relatedWord.type = DictionaryRelatedWordType.Synonym;
							await this.relatedWordRepository.save(relatedWord);
						}));
						break;
					case 'commonPhrases':
						await Promise.all(response.commonPhrases.map(async (item) => {
							const relatedWord = new RelatedWord();
							relatedWord.id = generateString();
							relatedWord.wordId = savedWord.id;
							relatedWord.content = item.phrase;
							relatedWord.meaning = item.meaning;
							relatedWord.type = DictionaryRelatedWordType.CommonPhrase;
							await this.relatedWordRepository.save(relatedWord);
						}));
						break;
					default:
						break;
				}
			}

			return savedWord;
		} catch (e) {
			const wrongWord = new WrongWord();
			wrongWord.id = generateString();
			wrongWord.content = dto.word;
			wrongWord.expDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
			await this.wrongWordRepository.save(wrongWord);
			throw new BadRequestException('Wrong word');
		}
	}
}
