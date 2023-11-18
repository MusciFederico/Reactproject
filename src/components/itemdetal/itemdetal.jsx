import React, { useState } from 'react';
import CounterContainer from '../CounterContainer/CounterContainer';
import { db } from '../../firebase/client';
import { collection, addDoc } from 'firebase/firestore';
import Popup from '../popup/popup';

const ItemDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = async () => {
        const cartItem = {
            productId: product.id,
            quantity: quantity,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            title: product.title,
        };

        try {
            const cartItemsRef = collection(db, 'cartItems');
            await addDoc(cartItemsRef, cartItem);
            console.log(`Added ${quantity} ${product.title} to the cart`);
            setShowPopup(true);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        textAlign: 'center',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '10px 0',
    };

    const descriptionStyle = {
        fontSize: '18px',
        margin: '10px 0',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        marginTop: '20px',
    };
    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', marginBottom: '10px' }} />
            <p style={descriptionStyle}>{product.description}</p>
            <CounterContainer quantity={quantity} setQuantity={setQuantity} />
            <button style={buttonStyle} onClick={handleAddToCart}>
                Add to Cart
            </button>
            {showPopup && (
                <Popup message={`${quantity} ${product.title} added to cart`} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default ItemDetail;