import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ParseIntegerIdPipe } from '../common/parse-integer-id.pipe';
import { AuthJwtGuard } from '../auth/common/auth-jwt.guard';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User not found: ${id}`);
        }

        return user;
    }

    @Patch('/:id')
    update(@Param('id', ParseIntegerIdPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
