import { Router } from "express"
const registerView = Router()


registerView.get("/register",(req, res, next)=>{
    try {
        return res.render("register")
    } catch (error) {
        next(error)
    }
})




export default registerView