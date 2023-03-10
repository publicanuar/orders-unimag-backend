import { Exception } from '../Exception.ts';

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super(400, 'User Already Exists');
  }
}

export class UserPhoneNotValidException extends Exception {
  constructor() {
    super(411, 'Phone input is not valid, required 10 digits');
  }
}

export class UserNotFoundException extends Exception {
  constructor() {
    super(404, 'User not found');
  }
}

export class UserCreateException extends Exception {
  constructor() {
    super(400, 'Error creating user');
  }
}
