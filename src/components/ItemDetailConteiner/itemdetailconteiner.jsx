import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/client";
import { doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';


const ItemDetailContainer = () => {
    const { id } = useParams(); // Retrieve the id parameter from the URL

    const [products, setProduct] = useState(); // Change products to product here
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const productRef = doc(db, "products", id);
                const snapshot = await getDoc(productRef);

                if (snapshot.exists()) {
                    setProduct({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full height of the viewport
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '300px',
        marginBottom: '20px',
        borderRadius: '8px',
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

    if (isLoading) return <Spinner />

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <img src={products?.image} alt={products?.title} style={imageStyle} />
                <h1>{products?.title}</h1>
                <p>{products?.description}</p>
                <button style={buttonStyle}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
