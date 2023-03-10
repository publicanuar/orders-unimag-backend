import { Exception } from '../Exception.ts';

export class AuthException extends Exception {
  constructor(message: string, status: number = 400) {
    super(status, message);
  }
}

export class AuthPasswordNotValidException extends AuthException {
  constructor() {
    super('your password is not valid');
  }
}

export class AuthUnauthenticatedException extends AuthException {
  constructor() {
    super('you are not authorized to access');
  }
}

export class IsNotUserRoleException extends AuthException {
  constructor() {
    super('don\'t have user role', 403);
  }
}

export class IsNotAdminRoleException extends AuthException {
  constructor() {
    super('don\'t have admin role', 403);
  }
}
