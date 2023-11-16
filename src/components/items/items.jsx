import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../firebase/client";
import { collection, getDocs, addDoc } from 'firebase/firestore';


const Item = () => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '10px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '250px', // Adjust the card width as needed
        textDecoration: 'none',
        color: 'inherit',
        textDecoration: 'none',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '200px', // Adjust the image height as needed
        marginBottom: '10px',
    };

    const titleStyle = {
        fontSize: '18px',
        margin: '8px 0',
        fontWeight: 'bold',
    };

    const descriptionStyle = {
        fontSize: '14px',
        margin: '8px 0',
    };

    const priceStyle = {
        fontSize: '16px',
        color: '#555',
        fontWeight: 'bold',
    };
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productsRef = collection(db, 'products');
        getDocs(productsRef)
            .then(snapshot => {
                setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            })
            .catch(e => console.error(e))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {products.map((product) => (
                <Link key={product.id} to={`/item/${product.id}`} style={cardStyle}>
                    <img src={product.image} alt={product.title} style={imageStyle} />
                    <h4 style={titleStyle}>{product.title}</h4>
                    <p style={descriptionStyle}>{product.description}</p>
                    <p style={priceStyle}>Price: USD {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    {/* Add other product details here */}
                </Link>
            ))}
        </div>
    );
};

export default Item;
