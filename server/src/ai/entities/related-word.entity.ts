import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateRelatedWordEntity } from '../dto/create-related-word-entity.dto';
import { generateString } from '@nestjs/typeorm';

export enum DictionaryRelatedWordType {
	Synonym = 'Synonym',
	CommonPhrase = 'CommonPhrase',
	UsageExample = 'UsageExample'
}

@Entity()
export class RelatedWord {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar')
	content: string;

	@Column('varchar', {nullable: true})
	meaning: string | null;

	@Column('varchar', {nullable: true})
	partOfSpeech: string | null;

	@Column({type: 'enum', enum: DictionaryRelatedWordType})
	type: DictionaryRelatedWordType;

	@Column('uuid')
	wordId: string;

	static create(dto: CreateRelatedWordEntity) {
		const relatedWord = new RelatedWord();
		relatedWord.id = generateString();
		relatedWord.content = dto.content;
		relatedWord.wordId = dto.wordId;

		switch (dto.type) {
			case DictionaryRelatedWordType.Synonym:
				relatedWord.type = DictionaryRelatedWordType.Synonym;
				break;
			case DictionaryRelatedWordType.UsageExample:
				relatedWord.type = DictionaryRelatedWordType.UsageExample;
				relatedWord.partOfSpeech = dto.partOfSpeech;
				break;
			case DictionaryRelatedWordType.CommonPhrase:
				relatedWord.type = DictionaryRelatedWordType.CommonPhrase;
				relatedWord.meaning = dto.meaning;
				break;
			default:
				break;
		}

		return relatedWord;
	}
}