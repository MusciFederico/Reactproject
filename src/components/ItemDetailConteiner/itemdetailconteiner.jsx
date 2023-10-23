import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ItemDetalContainer = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setProducto(json);
                console.log(json);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '300px',
    };

    return (
        <>
            <img src={producto?.image} alt={producto?.title} style={imageStyle} />
            <h1>{producto?.title}</h1>
            <p>{producto?.description}</p>
        </>
    );
};

export default ItemDetalContainer;
