import express from "express"
import { signUp, logIn, logOut } from "../controllers/authControllers.js";
import { signUpValidation, loginValidation } from "../middlewares/authValidation.js";

const authRouter = express.Router();

authRouter.post('/signUp', signUpValidation, signUp);
authRouter.post('/logIn', loginValidation, logIn);
authRouter.post('/logOut', logOut);

export default authRouter;