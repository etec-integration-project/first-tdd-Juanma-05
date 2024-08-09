import {useContext} from "react";
import {Datacontext} from "../context/datacontext";
import { CartElements } from "./CartelEments"

export function CartContent() {
    const{cart} = useContext(Datacontext);
    //condicion

    return cart.length > 0 ? (     //renderizame esto solo si el array del carrito es mayor a 0
        <CartElements/>        
    ): (
        <h1 className="cartvacio">El carrito esta vacio</h1>
    )
    
}
