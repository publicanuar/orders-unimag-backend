import { Context, State } from '../deps.ts';
import { jwtUtil } from '../utils/Jwt.ts';
import config from '../config.ts';
import {
  AuthUnauthenticatedException,
  IsNotAdminRoleException,
  IsNotUserRoleException,
} from '../exceptions/auth/index.ts';
import { userService } from '../services/user.service.ts';

export const isAuthMiddleware = async (
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
) => {
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get('Authorization');
  const cookieToken = await ctx.cookies.get('token');
  let token;

  if (authorization) {
    token = authorization.split(' ')[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = {
      message: 'You are not logged in',
    };
    return;
  }

  const decoded = await jwtUtil.verifyJwt(token, config.JWT_SECRET);
  const userExists = await userService.me(decoded.sub!);

  if (!userExists) throw new AuthUnauthenticatedException();
  ctx.state['userId'] = userExists.uuid;
  await next();

  delete ctx.state.userId;
};

export const isUserMiddleware = async (
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
) => {
  const user = await userService.me(ctx.state['userId']);
  if (user.rol != 'user') throw new IsNotUserRoleException();
  await next();
};

export const isAdminMiddleware = async (
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
) => {
  const user = await userService.me(ctx.state['userId']);
  if (user.rol != 'admin') throw new IsNotAdminRoleException();
  await next();
};
