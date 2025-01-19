export class CreateUserDto {
    id : number
    username : string
    email : string
    password : string
}

class User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class UserProfileDto {
    name: string;
    email: string;
  }

