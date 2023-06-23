import { Column, Entity, PrimaryColumn } from 'typeorm';
import { generateString } from '@nestjs/typeorm';

@Entity()
export class WrongWord {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', {unique: true})
	content: string;

	@Column('date')
	expDate: Date;

	static create(dto: {content: string}) {
		const wrongWord = new WrongWord();
		wrongWord.id = generateString();
		wrongWord.content = dto.content;
		wrongWord.expDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
		return wrongWord;
	}
}