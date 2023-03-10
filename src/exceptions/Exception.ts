export class Exception extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export class UuidNotValidException extends Exception {
  constructor() {
    super(400, 'uuid is not valid');
  }
}
