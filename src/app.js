import express from "express"
import ProductRouter from "./router/product.js";
import CartRouter from "./router/carts.js";

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)




export const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
  });

server.on("error", (error) => console.log(`Error en servidor: ${error}`))


/*app.listen(PORT, ()=>{
    console.log(`Servidor express puerto ${PORT}`)
})*/