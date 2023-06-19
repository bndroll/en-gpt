import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WrongWord {
	@PrimaryColumn('uuid')
	id: string;

	@Column('varchar', {unique: true})
	content: string;

	@Column('date')
	expDate: Date;
}