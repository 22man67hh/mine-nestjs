import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'manish raj acharya',
      email: 'manishacharya843@gmail.com',
      role: 'admin',
    },
    {
      id: 2,
      name: ' raj acharya',
      email: 'charya843@gmail.com',
      role: 'intern',
    },
    {
      id: 3,
      name: 'manish  acharya',
      email: 'manishacharya@gmail.com',
      role: 'staff',
    },
    {
      id: 4,
      name: 'anish raj acharya',
      email: 'manishacharya843@gmail.com',
      role: 'intern',
    },
  ];
  findAll(role?: 'admin' | 'intern' | 'staff') {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);
      if(filteredUsers.length){
        return filteredUsers
      }
      throw new NotFoundException('user not found')
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userHighestId = [...this.users].sort((a, b) => (b.id = a.id));
    const newUser = {
      id: userHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(
    id: number,
    updateUser: UpdateUserDto,
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return this.findOne(id)
  }

  delete(id:number){
    const removeUser=this.findOne(id)
    this.users=this.users.filter(user=>user.id !==id)
    return removeUser
  }
}
