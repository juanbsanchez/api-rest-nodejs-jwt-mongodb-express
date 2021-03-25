import {Router} from 'express';
import * as productsController from '../controllers/product.controller'
const router = Router();

import {authJwt} from '../middlewares';

router.get('/',  productsController.getProducts);
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsController.createProduct);
router.get('/:productId',  productsController.geteProductById);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.updateProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin],  productsController.deleteProductById);


export default router;