import { Context, State } from '../deps.ts';
import { Exception } from '../exceptions/Exception.ts';

export const errorHandler = async (
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof Exception) {
      const { message, name, status } = err;
      ctx.response.body = { message, name, status };
      ctx.response.status = status;
    }
  }
};
