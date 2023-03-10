import { Exception } from '../Exception.ts';

export class ProductCodeAlreadyExistsException extends Exception {
  constructor() {
    super(400, 'Code already exists');
  }
}

export class ProductCodeNotValidException extends Exception {
  constructor() {
    super(400, 'Code input is not valid ');
  }
}

export class ProductNotFoundException extends Exception {
  constructor() {
    super(404, 'Product not found');
  }
}

export class ProductCreateException extends Exception {
  constructor() {
    super(400, 'Create product error');
  }
}
