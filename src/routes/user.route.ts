import { Router } from '../deps.ts';
import { getMe } from '../controllers/user.controller.ts';
import { isAuthMiddleware } from '../middlewares/auth.middleware.ts';

const router = new Router();

router.get('/', isAuthMiddleware, getMe);

export { router };
