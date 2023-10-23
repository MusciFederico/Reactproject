import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Item from '/src/components/items/items.jsx';

const ItemListContainer = ({ greeting }) => {
    const { categoria } = useParams();
    const [producto, setProducto] = useState();

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
        flexWrap: 'wrap', // Permite que las tarjetas pasen a la siguiente fila si no caben en el ancho de la pantalla
        justifyContent: 'center',
    };

    const ringCardStyle = {
        textAlign: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxWidth: '200px',
    };

    const ringImageStyle = {
        maxWidth: '100%',
    };

    useEffect(() => {
        const url = categoria ? `https://fakestoreapi.com/products/category/${categoria}` : 'https://fakestoreapi.com/products?limit=14'
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setProducto(json)
                console.log(json)
            })
            .catch(err => console.error(err))
    }, [categoria]);

    return (
        <div style={containerStyle}>
            <p style={greetingStyle}>{greeting}</p>
            <Link to={'/productos'}>Ir a productos</Link>
            <div style={ringCardContainerStyle}>
                {producto?.map(pr => <Item producto={pr} key={pr.id} style={ringCardStyle} />)}
            </div>
        </div>
    );
};

export default ItemListContainer;
