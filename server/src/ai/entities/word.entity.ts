import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Word {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', {unique: true})
	content: string;

	@Column('varchar')
	pronunciation: string;
}