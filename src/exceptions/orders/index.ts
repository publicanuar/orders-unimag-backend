import { Exception } from '../Exception.ts';

export class OrderNotFoundException extends Exception {
  constructor() {
    super(404, 'Order not found');
  }
}

export class OrderIDNotValidException extends Exception {
  constructor() {
    super(400, 'id param is not valid ');
  }
}

export class OrderCreateException extends Exception {
  constructor() {
    super(400, 'Error creating order');
  }
}
