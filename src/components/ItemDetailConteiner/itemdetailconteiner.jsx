import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/client";
import { doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import Itemdetal from "../itemdetal/itemdetal";

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
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

    if (isLoading) return <Spinner />

    return <Itemdetal product={product} />;
};

export default ItemDetailContainer;

