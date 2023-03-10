import { dotenvConfig } from '../../../deps.ts';
dotenvConfig({ export: true, path: '.env' });

export default {
  DENO_ENV: Deno.env.get('DENO_ENV'),
  MONGO_DB: Deno.env.get('MONGO_DB') || 'orders',
  MONGO_HOST: Deno.env.get('MONGO_HOST') || 'mongo',
  MONGO_PORT: Number(Deno.env.get('MONGO_PORT')) || 27017,
  MONGO_PASSWORD: Deno.env.get('MONGO_PASSWORD') || 'password',
  MONGO_USER: Deno.env.get('MONGO_USER') || 'anuarserp',
};
