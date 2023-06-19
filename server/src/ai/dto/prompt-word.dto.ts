import { IsString } from 'class-validator';

export class PromptWordDto {
	@IsString()
	word: string;

	@IsString()
	language: string;
}