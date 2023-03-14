import { Router } from "express"
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const carts = new CartManager()

CartRouter.post("/", async (req, res) =>{
    let newCarts = req.body
    res.send (await carts.addCart(newCarts))
})

CartRouter.get("/", async (req, res) =>{
    res.send (await carts.readCarts())
})

CartRouter.get("/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    res.send (await carts.getCartById(id))
})



CartRouter.post("/:cid/products/:pid", async (req, res) =>{
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    res.send (await carts.addProductInCarts(cartId, productId))
})


export default CartRouter