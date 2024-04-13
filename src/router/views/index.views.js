import { Router } from "express";
import usersRouter from "./users.view.js";
import productsRouter from "./products.views.js";
import registerView from "./register.views.js";
import products from "../../data/fs/ProductManager.js";

const viewsRouter = Router()


viewsRouter.use('/users', registerView)
viewsRouter.use("/users", usersRouter)
viewsRouter.use("/products", productsRouter)
viewsRouter.get("/chat", async(req, res, next) => {
    try {
        return res.render("chat",{title : 'chat'})
    } catch (error) {
        next(error)
    }
}) 




viewsRouter.get("/",async (req, res, next)=>{
    try {
        const prods = await products.read()
        return res.render("index", { prods })
    } catch (error) {
        return next(error)
    }
})

export default viewsRouter
