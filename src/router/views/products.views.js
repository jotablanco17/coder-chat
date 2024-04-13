import { Router } from "express";
import products from "../../data/fs/ProductManager.js";
const productsRouter = Router()

export default productsRouter

productsRouter.get("/real", async (req, res, next)=>{
    try {
        const prods = await products.read()
        return res.render("products", { prods })
    } catch (error) {
        return next(error)
    }
})

productsRouter.get("/:pid", async (req, res , next)=>{
    try {
        const { pid } = req.params
        const one = await products.readOne(pid)
        return res.render("details", { prod : one  })
    } catch (error) {
        next(error)
    }
})