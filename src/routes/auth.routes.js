import {Router} from 'express';
import * as AuthController from '../controllers/auth.controller'
const router = Router();

import {verifySignUp} from '../middlewares';

router.post('/signin', AuthController.signIn);
router.post('/signup', [verifySignUp.checkDuplicateUser, verifySignUp.checkRolesExisted], AuthController.signUp);

export default router;