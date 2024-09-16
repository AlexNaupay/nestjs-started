import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        // const hashPassword = await bcrypt.hash(newUser.password, 10);
        // newUser.password = hashPassword;

        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find({
            relations: ['customer'],
        });
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
        return this.usersRepository.save(user);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
