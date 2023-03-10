import { create, getNumericDate, Header, Payload, verify } from '../deps.ts';
import { AuthException } from '../exceptions/auth/index.ts';

export class Jwt {
  private encoder: TextEncoder;

  constructor() {
    this.encoder = new TextEncoder();
  }

  async signJwt({
    userId,
    expiresIn,
    secretKey,
  }: {
    userId: string;
    expiresIn: number;
    secretKey: string;
  }): Promise<string> {
    const payload: Payload = {
      iss: 'admin.com',
      sub: userId,
      exp: getNumericDate(expiresIn * 60),
      iat: getNumericDate(new Date()),
      nbf: getNumericDate(new Date()),
    };

    const header: Header = {
      alg: 'HS256',
    };

    const key = await this.generateKey(secretKey);

    return create(header, payload, key);
  }

  async verifyJwt(token: string, secretKey: string): Promise<Payload> {
    try {
      const key = await this.generateKey(secretKey);
      return await verify(token, key);
    } catch (error) {
      throw new AuthException(error);
    }
  }

  private async generateKey(secretKey: string) {
    const keyBuf = this.encoder.encode(secretKey);
    return await crypto.subtle.importKey(
      'raw',
      keyBuf,
      { name: 'HMAC', hash: 'SHA-256' },
      true,
      ['sign', 'verify'],
    );
  }
}

export const jwtUtil = new Jwt();
