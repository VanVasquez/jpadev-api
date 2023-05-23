import express from 'express'
import controllers from '../controllers';
const authRouter = express.Router();

authRouter.post('/login', controllers.authController.LoginUser)
authRouter.post('/signin', controllers.authController.CreateUser)

export default authRouter;