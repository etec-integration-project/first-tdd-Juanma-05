import {useContext} from "react";
import {Datacontext} from "../context/datacontext";
import './carrito.css'

export function CartElements() {
    const{cart, setCart} = useContext(Datacontext);

    const deleteProduct = (id) => {
        const updatecart= cart.filter( product => product.id !== id )
        setCart(updatecart);

    }
    return cart.map((product)=>{
        return(
            <div className="cartContent" key={product.id}>
                <img src={product.img} alt="" />
                <h3 className="name">{product.name}</h3>
                <h4 className="price">${product.price}</h4>
                <button onClick={()=>deleteProduct(product.id)}>Eliminar</button> 
            </div>
        )
    })
    
};

