import {Router} from 'express';
const router = Router();

import * as userController from "../controllers/user.controller";
import {authJwt, verifySignUp} from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted, verifySignUp.checkDuplicateUser],userController.createUser);

export default router;