import { Context } from '../deps.ts';
import { userService } from '../services/user.service.ts';

export const getMe = async ({ state, response }: Context) => {
  const user = await userService.me(state.userId);

  response.body = {
    user,
    message: 'successfully',
  };
};
