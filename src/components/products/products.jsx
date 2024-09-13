import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
// import { Datacontext } from '../context/datacontext';
import './products.css';

export function ProductsMixta() {
    // const { cart, setCart } = useContext(Datacontext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                const filteredProducts = response.data.filter(product => product.suela === 'mixta');
                setProducts(filteredProducts);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div className="products-container-mixta">
            {products.map(product => (
                <div className="card" key={product.id}>
                    <img src={product.url} alt={product.name} />
                    <h3>{product.product}</h3>
                    <h4>${product.price}</h4>
                    {/* <button onClick={() => buyProducts(product)}>AÑADIR AL CARRITO</button> */}
                </div>
            ))}
        </div>
    );
}

export function ProductsFG() {
    // const { cart, setCart } = useContext(Datacontext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                const filteredProducts = response.data.filter(product => product.suela === 'FG');
                setProducts(filteredProducts);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    // const buyProducts = (product) => {
    //     setCart([...cart, product]);
    // };

    return (
        <div className="products-container-FG">
            {products.map(product => (
                <div className="card" key={product.id}>
                    <img src={product.url} alt={product.name} />
                    <h3>{product.product}</h3>
                    <h4>${product.price}</h4>
                    {/* <button onClick={() => buyProducts(product)}>AÑADIR AL CARRITO</button> */}
                </div>
            ))}
        </div>
    );
}

export function ProductsSG() {
    // const { cart, setCart } = useContext(Datacontext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                const filteredProducts = response.data.filter(product => product.suela === 'SG');
                setProducts(filteredProducts);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    // const buyProducts = (product) => {
    //     setCart([...cart, product]);
    // };

    return (
        <div className="products-container-SG">
            {products.map(product => (
                <div className="card" key={product.id}>
                    <img src={product.url} alt={product.name} />
                    <h3>{product.product}</h3>
                    <h4>${product.price}</h4>
                    {/* <button onClick={() => buyProducts(product)}>AÑADIR AL CARRITO</button> */}
                </div>
            ))}
        </div>
    );
}
