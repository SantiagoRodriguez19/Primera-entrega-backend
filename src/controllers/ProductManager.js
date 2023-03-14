import {promises as fs} from 'fs'

class ProductManager {
    constructor(){
        this.path = "./src/data/products.json"
    }

    readProducts = async() =>{
        let products = await fs.readFile(this.path, "utf-8")
        return  JSON.parse(products)
    }

    writeProducts = async (product) =>{
    await fs.writeFile(this.path, JSON.stringify(product))
     }

     exist = async(id) =>{
        let products = await this.readProducts()
        return  products.find(prod => prod.id === id)
    }

    addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        const products = await this.readProducts()
        let idProducto =  products.length > 0 ? products[products.length - 1].id + 1 : 1
        product.id =  idProducto
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agrregado"
    }

    getProduct = async()=>{
        return await this.readProducts()
    }

    getProductById = async(id)=>{
        let productById = await  this.exist(id)
        if (!productById) return "Producto no encontrado"
        return productById

    }

  

    updateProducts = async (id, product) =>{
        let productById = await  this.exist(id)
        if (!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let products = [{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto modificado"
    }


    deleteProducts = async(id)=>{
        let products = await this.readProducts()
        let existProduct = products.some(prod => prod.id === id)
        if (existProduct) {
        let filterProduct = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProduct)
        return "Producto eliminado"
    }
        return " Prodcucto a eliminar inexistente"
    }
}

export default ProductManager


