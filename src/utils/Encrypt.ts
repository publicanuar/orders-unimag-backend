import { bcrypt } from '../deps.ts';

export class Encrypt {
  async validate(value: string, compare: string): Promise<boolean> {
    return await bcrypt.compare(value, compare);
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value);
  }
}
