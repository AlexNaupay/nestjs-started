import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('API_KEY_X') private apiKey: string,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/users-app/:id')
    showUser(@Param() params: any): string {
        console.log(this.apiKey);
        return `User ${params.id}`;
    }
}
