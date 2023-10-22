import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): User {
    return new User(
      'ca7b91c5-b825-482b-9b8b-af9c538bd1fe',
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
    );
  }

  findAll(): User[] {
    return [
      new User(
        'ca7b91c5-b825-482b-9b8b-af9c538bd1fe',
        'Dave',
        'Nothere',
        'dave@nothere.com',
      ),
    ];
  }

  findOne(id: string): User {
    return new User(id, 'Dave', 'Nothere', 'dave@nothere.com');
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    return new User(
      id,
      updateUserDto.firstName,
      updateUserDto.lastName,
      updateUserDto.email,
    );
  }

  remove(id: string) {
    console.log(`removed ${id}`);
  }
}
