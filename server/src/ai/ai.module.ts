import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { RelatedWord } from './entities/related-word.entity';
import { PromptMapper } from './dto/mapper/prompt.mapper';
import { WrongWord } from './entities/wrong-word.entity';
import { TasksService } from './cron/wrong-word.cron';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([Word, RelatedWord, WrongWord])
	],
	controllers: [AiController],
	providers: [AiService, PromptMapper, TasksService]
})
export class AiModule {
}
