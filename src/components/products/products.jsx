import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import { useNavigate } from 'react-router-dom';


export function ProductsMixta() {
    const [products, setProducts] = useState([]);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [buttonText, setButtonText] = useState('Eliminar Producto'); // Nuevo estado para el texto del botón
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            axios.get('/api/products')
                .then(response => {
                    const filteredProducts = response.data.filter(product => product.suela === 'MIXTA');
                    setProducts(filteredProducts);
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
        setButtonText(showDeleteIcons ? 'Eliminar Producto' : 'Cancelar'); // Cambiar el texto del botón
    };

    const handleDeleteIconClick = (product) => {
        setSelectedProduct(product);
    };

    const confirmDelete = () => {
        axios.delete('/api/delete', { data: { id: selectedProduct.id } })        
            .then(response => {
                setProducts(products.filter(p => p.id !== selectedProduct.id));
                setSelectedProduct(null);
                setShowDeleteIcons(false);
                setSuccessMessage('Producto eliminado exitosamente');
                setButtonText('Eliminar Producto'); // Resetear el texto del botón
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate("/suelamixta");
                }, 2000);        
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };

    const handleAddToCart = (product) => {
        axios.post('/api/carrito', {
            id: product.id,
            product: product.product,
            price: product.price,
            url: product.url,
            suela: product.suela
        })
        .then(response => {
            setSuccessMessage('Producto agregado al carrito');
            setTimeout(() => setSuccessMessage(''), 2000);
        })
        .catch(error => {
            console.error("There was an error adding the product to the cart!", error);
        });
    };

    return (
        <div>
            {products.length === 0 ? (
                <div className="no-products-message">
                    No hay productos
                </div>
            ) : (
                <button className="delete-button" onClick={handleDeleteButtonClick}>
                    {buttonText}
                </button>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="products-container-SG">
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
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                            Añadir al Carrito
                        </button>
                    </div>
                ))}
                {selectedProduct && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>¿Está seguro que quiere eliminar este producto?</p>
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

export function ProductsFG() {
    const [products, setProducts] = useState([]);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [buttonText, setButtonText] = useState('Eliminar Producto'); // Nuevo estado para el texto del botón

    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = () => {
            axios.get('/api/products')
                .then(response => {
                    const filteredProducts = response.data.filter(product => product.suela === 'FG');
                    setProducts(filteredProducts);
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
        setButtonText(showDeleteIcons ? 'Eliminar Producto' : 'Cancelar'); // Cambiar el texto del botón

    };

    const handleDeleteIconClick = (product) => {
        setSelectedProduct(product);
    };

    const confirmDelete = () => {
        axios.delete('/api/delete', { data: { id: selectedProduct.id } })
        .then(response => {
                setProducts(products.filter(p => p.id !== selectedProduct.id));
                setSelectedProduct(null);
                setShowDeleteIcons(false);
                setSuccessMessage('Producto eliminado exitosamente');
                setButtonText('Eliminar Producto'); // Resetear el texto del botón
                setTimeout(() => {
                    setSuccessMessage('')
                    navigate("/suelaSG");
                  }, 2000);
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };

    const handleAddToCart = (product) => {
        axios.post('/api/carrito', {
            id: product.id,
            product: product.product,
            price: product.price,
            url: product.url,
            suela: product.suela
        })
        .then(response => {
            setSuccessMessage('Producto agregado al carrito');
            setTimeout(() => setSuccessMessage(''), 2000);
        })
        .catch(error => {
            console.error("There was an error adding the product to the cart!", error);
        });
    };



    return (
        <div>
            {products.length === 0 ? (
                <div className="no-products-message">
                    No hay productos
                </div>
            ) : (
                <button className="delete-button" onClick={handleDeleteButtonClick}>
                    {buttonText}
                    </button>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="products-container-SG">
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
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                            Añadir al Carrito
                        </button>
                </div>
            ))}

        {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>¿Está seguro que quiere eliminar este producto?</p>
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

export function ProductsSG() {
    const [products, setProducts] = useState([]);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [buttonText, setButtonText] = useState('Eliminar Producto'); // Nuevo estado para el texto del botón

    const navigate = useNavigate();



    useEffect(() => {
        const fetchProducts = () => {
            axios.get('/api/products')
                .then(response => {
                    const filteredProducts = response.data.filter(product => product.suela === 'SG');
                    setProducts(filteredProducts);
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
        setButtonText(showDeleteIcons ? 'Eliminar Producto' : 'Cancelar'); // Cambiar el texto del botón

    };

    const handleDeleteIconClick = (product) => {
        setSelectedProduct(product);
    };

    const confirmDelete = () => {
        axios.delete('/api/delete', { data: { id: selectedProduct.id } })
        .then(response => {
                setProducts(products.filter(p => p.id !== selectedProduct.id));
                setSelectedProduct(null);
                setShowDeleteIcons(false);
                setSuccessMessage('Producto eliminado exitosamente');
                setButtonText('Eliminar Producto'); // Resetear el texto del botón

                setTimeout(() => {
                    setSuccessMessage('')
                    navigate("/suelaSG");
                  }, 2000);
            })
            
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };

    const handleAddToCart = (product) => {
        axios.post('/api/carrito', {
            id: product.id,
            product: product.product,
            price: product.price,
            url: product.url,
            suela: product.suela
        })
        .then(response => {
            setSuccessMessage('Producto agregado al carrito');
            setTimeout(() => setSuccessMessage(''), 2000);
        })
        .catch(error => {
            console.error("There was an error adding the product to the cart!", error);
        });
    };


    return (
        <div>
            {products.length === 0 ? (
                <div className="no-products-message">
                    No hay productos
                </div>
            ) : (
                <button className="delete-button" onClick={handleDeleteButtonClick}>
                    {buttonText}
                </button>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="products-container-SG">
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
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                            Añadir al Carrito
                        </button>
                </div>
            ))}

        {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>¿Está seguro que quiere eliminar este producto?</p>
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
