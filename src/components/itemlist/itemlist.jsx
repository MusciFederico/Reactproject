import React from 'react';
import Item from '../items/items';

const ItemList = ({ products }) => {
    return (
        <div>
            {products.map((product, index) => (
                <Item product={product} key={index} />
            ))}
        </div>
    );
};

export default ItemList;

