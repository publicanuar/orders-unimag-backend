import { v5 } from '../deps.ts';

export class Uuid {
  encoder: TextEncoder;

  constructor() {
    this.encoder = new TextEncoder();
  }
  generate(): string {
    return crypto.randomUUID();
  }

  validate(uuid: string): boolean {
    return v5.validate(uuid);
  }
}
