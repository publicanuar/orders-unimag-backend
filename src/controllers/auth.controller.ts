import { Context } from '../deps.ts';
import { UserCreateDto } from '../dto/user-create.dto.ts';
import { UserLoginDto } from '../dto/user-login.dto.ts';
import { authService } from '../services/auth.service.ts';
import config from '../config.ts';

export const signup = async ({ response, request }: Context) => {
  const { name, dni, password, phone, address }: UserCreateDto = await request
    .body()
    .value;

  const userId = await authService.signup({
    dni,
    name,
    password,
    phone,
    address,
  });

  response.body = {
    message: 'User register successfully',
    id: userId,
  };
  response.status = 201;
};

export const signin = async ({ response, request, cookies }: Context) => {
  const { password, phone }: UserLoginDto = await request.body().value;

  const token = await authService.signin({ password, phone });

  cookies.set('token', token, {
    expires: new Date(Date.now() + config.JWT_EXPIRES_IN * 60 * 1000),
    maxAge: config.JWT_EXPIRES_IN * 60,
    httpOnly: true,
    secure: false,
  });

  response.body = {
    message: 'User login successfully',
    token,
  };
};

export const logout = ({ response, cookies, state }: Context) => {
  cookies.set('token', '', {
    httpOnly: true,
    secure: false,
    maxAge: -1,
  });

  state['userId'] = '';

  response.body = {
    message: 'User logout successfully',
  };
};
