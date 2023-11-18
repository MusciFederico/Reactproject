import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemList from '../../components/itemlist/itemlist';
import Spinner from 'react-bootstrap/Spinner';
import { db } from '../../firebase/client';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    };

    const greetingStyle = {
        fontSize: '46px',
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
    };

    const ringCardContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    useEffect(() => {
        const fetchProducts = () => {
            setIsLoading(true);
            const productRef = collection(db, 'products');

            getDocs(productRef)
                .then((snapshot) => {
                    const productsData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    const filteredProducts = id
                        ? productsData.filter((product) => product.categoryId === id)
                        : productsData;

                    setProducts(filteredProducts);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchProducts();
    }, [id]);

    if (isLoading) return <Spinner />

    return (
        <div style={containerStyle}>
            <p style={greetingStyle}>{greeting}</p>
            <Link to={'/productos'}>Ir a productos</Link>
            <div style={ringCardContainerStyle}>
                <ItemList products={products} />
            </div>
        </div>
    );
};

export default ItemListContainer;

