import {promises as fs} from 'fs'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager{
    constructor(){
        this.path = "./src/data/carts.json"
    }


    readCarts = async() =>{
        let carts = await fs.readFile(this.path, "utf-8")
        return  JSON.parse(carts)
    }

    writeCarts = async (carts) =>{
        await fs.writeFile(this.path, JSON.stringify(carts))
         }

     exist = async(id) =>{
        let carts = await this.readCarts()
        return  carts.find(cart => cart.id === id)
        }
         

    addCart = async(cart) =>{
        let cartsOld = await this.readCarts()
        const carts = await this.readCarts()
        let idCarts =  carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
        cart.id = idCarts
        let id = cart.id
        let cartsConcat = [{id:id, products : []}, ... cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
        }

    getCartById = async(id)=>{
        let cartById = await  this.exist(id)
        if (!cartById) return "Carrito no encontrado"
        return cartById
    
        }

    addProductInCarts = async(cartId, productId) =>{
        let cartById = await  this.exist(cartId)
        if (!cartById) return "Carrito no encontrado"
        let productById = await productAll.exist(productId)
        if (!cartById) return "Producto no encontrado"

        let cartAll = await this.readCarts()
        let cartFilter = cartAll.filter((cart) => cart.id != cartId)

        if (cartById.products.some((prod)=> prod.id === productId)){
            let moreProductInCart = cartById.products.find ((prod) => prod.id === productId)
            moreProductInCart.cantidad++
            let cartContact = [cartById, ...cartFilter]
            await this.writeCarts(cartContact)
            return "Producto sumado al carrito"
    
        } 

        cartById.products.push({id:productById.id, cantidad: 1})
        let cartContact = [cartById, ...cartFilter]
        await this.writeCarts(cartContact)
        return "Producto Agregado al carrito"

    }    
}

export default CartManager