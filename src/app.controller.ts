import { Controller, Get, HttpException, HttpStatus, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';

let counter = 1;

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('API_KEY_X') private apiKey: string,
    ) {}

    @Get()
    getHello(): string {
        console.log(`Request ... ${counter++}`);
        return this.appService.getHello();
        //throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Get('/users-app/:id')
    showUser(@Param() params: any): string {
        console.log(this.apiKey);
        return `User ${params.id}`;
    }
}
