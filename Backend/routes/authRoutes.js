import express from "express"
import { signUp, logIn, logOut } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post('/signUp',signUp);
authRouter.post('/logIn',logIn);
authRouter.post('/logOut',logOut);

export default authRouter;