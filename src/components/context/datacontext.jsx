import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const Datacontext = createContext();

const Dataprovider =({children}) => {
        const [data, setData] =useState ([]);    
        //setdata una funcion que te permite meter un valor dentro de data, ya que nuestro array comienza vacio
        // useEffect llama a los productos 
        const [cart, setCart] =useState ([]);
        useEffect(()=>{
            // axios.get("http://localhost:8080/api/products/").then((res)=>setData(res.data))
        },[])

        const [data2, setData2,] =useState ([]);    
        useEffect(()=>{
            // axios("http://localhost:8080/api/products1/").then((res)=>setData2(res.data))
        },[])

        const [data3, setData3] =useState ([]);    //setdata una funcion que te permite meter un valor dentro de data, ya que nuestro array comienza vacio
        // useEffect llama a los productos 
        useEffect(()=>{
            // axios("http://localhost:8080/api/products2/").then((res)=>setData3(res.data))
        },[])

    return(
        <Datacontext.Provider value={{ data, data2, data3, cart, setCart }}>{children}</Datacontext.Provider>
        //data te permite usar data en cualquier componente usando los useContext y Datacontext
    )
};

export default Dataprovider; 
