import {useContext} from "react";
import {Datacontext} from "../context/datacontext";
import './products.css';

export function Products() {
    const {data, cart, setCart}= useContext(Datacontext);

    const buyProducts = (product) =>{
        setCart([...cart, product]) /** te trae una copia del carrito y le agrega el nuevo producto que clickeaste  */
    }
    return data.map((product)=>{
        return(
            <div className="card" key={product.id}>
                <img src={product.img} alt=""/>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <button onClick={()=>buyProducts(product)}>AÑADIR AL CARRITO</button> 
            </div>
                            /**esto te detecta el producto al hacer click, te devuelve el Array  */
        )
    })

};

export function Products1() {
    const {data2, cart, setCart}= useContext(Datacontext);

    const buyProducts = (product) =>{
        setCart([...cart,product])

    }

    return data2.map((product)=>{
        return(
            <div className="card" key={product.id}>
                <img src={product.img} alt=""/>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <button onClick={()=>buyProducts(product)}>AÑADIR AL CARRITO</button>
            </div>
        )
    })

};

export function Products2() {
    const {data3, cart, setCart}= useContext(Datacontext);

    const buyProducts = (product) =>{
        setCart([...cart,product])

    }

    return data3.map((product)=>{
        return(
            <div className="card" key={product.id}>
                <img src={product.img} alt=""/>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <button onClick={()=>buyProducts(product)}>AÑADIR AL CARRITO</button>
            </div>
        )
    })

};