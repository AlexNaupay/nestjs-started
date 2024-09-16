import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        newUser.password = await hash(newUser.password, 10);

        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        this.usersRepository.merge(user, updateUserDto);

        if (updateUserDto.password) {
            const password = await hash(updateUserDto.password, 10);
            this.usersRepository.merge(user, { password });
        }

        return this.usersRepository.save(user);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
