import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { WrongWord } from '../entities/wrong-word.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(WrongWord) private readonly wrongWordRepository: Repository<WrongWord>
	) {
	}

	@Cron('0 4 * * *')
	async clearWrongWords() {
		await this.wrongWordRepository.findBy({expDate: LessThan(new Date())});
	}
}