import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptWordDto } from './dto/prompt-word.dto';
import { PromptMapper } from './dto/mapper/prompt.mapper';

@Controller('ai')
export class AiController {
	constructor(
		private readonly apiService: AiService,
		private readonly promptMapper: PromptMapper
	) {
	}

	@Post()
	@HttpCode(200)
	async promptWord(@Body() dto: PromptWordDto) {
		return await this.promptMapper.map(await this.apiService.promptWord(dto));
	}
}
