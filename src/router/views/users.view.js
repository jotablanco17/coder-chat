import { Router } from "express";
const usersRouter = Router()

import users from "../../data/fs/UsersManager.js";


export default usersRouter

usersRouter.get("/", async (req, res, next)=>{
    try {
        const all = await users.read()
        return res.render("users", { all })
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/:uid", async (req, res, next)=>{
    try {
        const { uid } = req.params
        const one = await users.readOne(uid)
        return res.render("detailsUser", { user : one })
    } catch (error) {
        return next(error)
    }
})


