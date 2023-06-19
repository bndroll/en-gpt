import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum DictionaryRelatedWordType {
	Form = 'Form',
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
	pronunciation: string | null;

	@Column('varchar', {nullable: true})
	meaning: string | null;

	@Column({type: 'enum', enum: DictionaryRelatedWordType})
	type: DictionaryRelatedWordType;

	@Column('uuid')
	wordId: string;
}