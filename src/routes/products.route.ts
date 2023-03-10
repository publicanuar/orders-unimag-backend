import {
  createProduct,
  getProduct,
  getProducts,
} from '../controllers/product.controller.ts';
import { Router } from '../deps.ts';
import {
  isAdminMiddleware,
  isAuthMiddleware,
} from '../middlewares/auth.middleware.ts';

const router = new Router();

router.get('/', getProducts);
router.get('/:code', getProduct);
router.post('/', isAuthMiddleware, isAdminMiddleware, createProduct);

export { router };
