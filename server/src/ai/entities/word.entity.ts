import { Column, Entity, PrimaryColumn } from 'typeorm';
import { generateString } from '@nestjs/typeorm';
import { CreateWordEntity } from '../dto/create-word-entity.dto';

export enum WordType {
	Initial = 'Initial',
	Form = 'Form',
}

@Entity()
export class Word {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', {unique: true})
	content: string;

	@Column('varchar')
	pronunciation: string;

	@Column('uuid', {nullable: true})
	wordId: string | null;

	@Column({type: 'enum', enum: WordType})
	type: WordType;

	static create(dto: CreateWordEntity) {
		const word = new Word();
		word.id = generateString();
		word.content = dto.content;
		word.pronunciation = dto.pronunciation;
		word.type = dto.type;
		word.wordId = dto.wordId;
		return word;
	}
}