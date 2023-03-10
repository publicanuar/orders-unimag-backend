import { logout, signin, signup } from '../controllers/auth.controller.ts';
import { Router } from '../deps.ts';
import { isAuthMiddleware } from '../middlewares/auth.middleware.ts';

const router = new Router();

router.post('/register', signup);

router.post('/login', signin);

router.get('/logout', isAuthMiddleware, logout);

export { router };
