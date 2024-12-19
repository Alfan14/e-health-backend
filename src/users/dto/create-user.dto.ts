export class CreateUserDto {
    id : number
    name : string
    address : string
    born : Date
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

