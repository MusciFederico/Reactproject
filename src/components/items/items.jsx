import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => {
    const cardStyle = {
        display: 'flex', // Establece el contenedor de la tarjeta como un flex container
        flexDirection: 'column', // Muestra los elementos apilados verticalmente
        alignItems: 'center', // Centra los elementos horizontalmente
        textAlign: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxWidth: '150px',
        textDecoration: 'none',
        color: 'inherit',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '150px',
    };

    const titleStyle = {
        fontSize: '14px',
        margin: '8px 0',
    };

    const priceStyle = {
        fontSize: '12px',
        color: '#555',
    };

    return (
        <Link to={`/item/${producto.id}`} style={cardStyle}>
            <img src={producto.image} alt={producto.title} style={imageStyle} />
            <h4 style={titleStyle}>{producto.title}</h4>
            <p style={priceStyle}>USD {producto.price}</p>
        </Link>
    );
};

export default Item;
