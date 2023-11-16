import React from 'react';

export const ItemList = ({ products }) => {
    return (
        <div>
            {products.map((pr, index) => <Item products={pr} key={index} />)}
        </div>
    );
};
