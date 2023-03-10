import { dotenvConfig } from './deps.ts';
dotenvConfig({ export: true, path: '.env' });

export default {
  JWT_SECRET: String(Deno.env.get('JWT_SECRET')) as unknown as string,
  PORT: Number(Deno.env.get('PORT')) || 3000,
  JWT_EXPIRES_IN: 30,
};
