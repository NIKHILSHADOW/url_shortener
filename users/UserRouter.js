import express from "express";
import { handleLogin, handleLogout, handleSignup } from "./UserController.js";


const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.redirect("/home")
})

userRouter.get("/login", (req, res) => {
    res.render("login")
})

userRouter.get("/signup", (req, res) => {
    res.render("signup")
})

userRouter.get("/logout", handleLogout)

userRouter.post("/login", handleLogin)
userRouter.post("/signup", handleSignup)

export {
    userRouter
};
