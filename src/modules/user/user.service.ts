import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findUsername(username: string): Promise<User> {
    const postExist = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (!postExist) throw new NotFoundException('Este username no existe');
    return postExist;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.save({
      username: createUserDto.username,
      password: createUserDto.password,
    });
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const postExist = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!postExist) throw new NotFoundException('Este user no existe');
    return postExist;
  }

  async update(updateUserDto: UpdateUserDto) {
    const postExist = await this.usersRepository.findOne({
      where: { id: updateUserDto.id },
    });
    if (!postExist) throw new NotFoundException('Este user no existe');
    const updatedPost = Object.assign(postExist, updateUserDto);

    return await this.usersRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const postExist = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!postExist) throw new NotFoundException('Este user no existe');

    await this.usersRepository.delete(id);
  }
}
