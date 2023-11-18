import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '10px',
        padding: '15px',
        width: '250px',
        display: 'inline-block',
    };

    const imageStyle = {
        maxWidth: '100%',
        marginBottom: '10px',
    };

    return (
        <Link to={`/item/${product.id}`}>
            <div style={cardStyle}>
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.title} style={imageStyle} />
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
            </div>
        </Link>
    );
};

export default Item;
