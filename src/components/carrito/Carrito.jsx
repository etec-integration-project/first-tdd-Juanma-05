import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carrito.css';
import { useNavigate } from 'react-router-dom';

export function Carrito() {
    const [products, setProducts] = useState([]);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            axios.get('http://localhost:3001/carrito')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the products!", error);
                });
        };

        fetchProducts();
        const intervalId = setInterval(fetchProducts, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDeleteButtonClick = () => {
        setShowDeleteIcons(!showDeleteIcons);
    };

    const handleDeleteIconClick = (product) => {
        setSelectedProduct(product);
    };

    const confirmDelete = () => {
        axios.delete('http://localhost:3001/deleteCarrito', { data: { id: selectedProduct.id } })        
        .then(response => {
            setProducts(products.filter(p => p.id !== selectedProduct.id));
            setSelectedProduct(null);
            setShowDeleteIcons(false);
            setSuccessMessage('Producto eliminado exitosamente');
            setTimeout(() => {
                setSuccessMessage('');
                navigate("/carrito");
            }, 3000);
        })
        .catch(error => {
            console.error("There was an error deleting the product!", error);
        });
    };

    return (
        <div>
            {products.length === 0 ? (
                <div className="no-products-message">
                    El carrito esta vacio
                </div>
            ) : (
                <button className="delete-button" onClick={handleDeleteButtonClick}>
                    Eliminar Producto
                </button>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="products-container-mixta">
                {products.map(product => (
                    <div className="card" key={product.id}>
                        <img src={product.url} alt={product.name} />
                        <h3>{product.product}</h3>
                        <h4>${product.price}</h4>
                        {showDeleteIcons && (
                            <button className="delete-icon" onClick={() => handleDeleteIconClick(product)}>
                                🗑️
                            </button>
                        )}
                    </div>
                ))}

                {selectedProduct && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>¿Está seguro que quiere eliminar este producto del carrito?</p>
                            <button className="cancel-button" onClick={() => setSelectedProduct(null)}>
                                Cancelar
                            </button>
                            <button className="confirm-button" onClick={confirmDelete}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
