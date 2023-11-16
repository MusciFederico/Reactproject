// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import ItemList from '/src/components/items/items.jsx';
// import { db } from '../../firebase/client';
// import { doc, getDocs, updateDoc, query, collection, where, addDoc } from "firebase/firestore";

// const ItemListContainer = ({ greeting }) => {
//     const { id } = useParams();
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const containerStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//         backgroundColor: '#f5f5f5',
//         padding: '20px',
//     };

//     const greetingStyle = {
//         fontSize: '46px',
//         color: 'black',
//         textAlign: 'center',
//         fontStyle: 'italic',
//     };

//     const ringCardContainerStyle = {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//     };

//     const order = {
//         buyer: { name: 'Lucho', phone: '65656565', email: 'test@test.com' },
//         items: [
//             {
//                 categoryId: 'pantalones',
//                 description: 'Pantalon jogging negro',
//                 image: '',
//                 price: 5000,
//                 stock: 100,
//                 title: 'Jogging'
//             },
//             {
//                 categoryId: 'remeras',
//                 description: 'Remera oversize desc',
//                 image: '',
//                 price: 5000,
//                 stock: 100,
//                 title: 'Jogging'
//             },
//         ],
//         total: 10000
//     };

//     const crearOrdenDeCompra = () => {
//         const refOrder = collection(db, 'orders');
//         addDoc(refOrder, order).then(({ id }) => console.log(id));
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             setIsLoading(true);
//             try {
//                 const productRef = collection(db, "products");
//                 const snapshot = await getDocs(productRef);

//                 const productsData = snapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 // Filter the products based on categoryId if available
//                 const filteredProducts = id
//                     ? productsData.filter((product) => product.categoryId === id)
//                     : productsData;
//                 console.log(filteredProducts);
//                 console.log(id);
//                 console.log(products);
//                 console.log(productsData);
//                 setProducts(filteredProducts);
//                 console.log(filteredProducts);
//                 console.log(id);
//                 console.log(products);
//                 console.log(productsData);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };


//         fetchProducts();
//     }, [id]);

//     return (
//         <div style={containerStyle}>
//             <p style={greetingStyle}>{greeting}</p>
//             <Link to={'/productos'}>Ir a productos</Link>
//             <div style={ringCardContainerStyle}>
//                 <ItemList products={products} />
//             </div>
//             <div>
//                 <button onClick={crearOrdenDeCompra}>Crear orden</button>
//             </div>
//         </div>
//     );
// };

// export default ItemListContainer;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemList from '/src/components/items/items.jsx';
import Spinner from 'react-bootstrap/Spinner';
import { db } from '../../firebase/client';
import { collection, getDocs } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    const order = {
        buyer: { name: 'Fede', phone: '65656565', email: 'test@test.com' },
        items: [
            {
                categoryId: 'pantalones',
                description: 'Pantalon jogging negro',
                image: '',
                price: 5000,
                stock: 100,
                title: 'Jogging'
            },
            {
                categoryId: 'remeras',
                description: 'Remera oversize desc',
                image: '',
                price: 5000,
                stock: 100,
                title: 'Jogging'
            },
        ],
        total: 10000
    };

    const crearOrdenDeCompra = () => {
        const refOrder = collection(db, 'orders');
        addDoc(refOrder, order).then(({ id }) => console.log(id));
    };

    useEffect(() => {
        const fetchProducts = () => {
            setIsLoading(true);
            const productRef = collection(db, 'products');

            getDocs(productRef)
                .then((snapshot) => {
                    const productsData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    const filteredProducts = id
                        ? productsData.filter((product) => product.categoryId === id)
                        : productsData;

                    setProducts(filteredProducts);
                    console.log(filteredProducts);
                    console.log(id);
                    console.log(products);
                    console.log(productsData);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchProducts();
    }, [id]);

    if (isLoading) return <Spinner />

    return (
        <div style={containerStyle}>
            <p style={greetingStyle}>{greeting}</p>
            <Link to={'/productos'}>Ir a productos</Link>
            <div style={ringCardContainerStyle}>
                <ItemList products={products} />
            </div>
            <div>
                <button onClick={crearOrdenDeCompra}>Crear orden</button>
            </div>
        </div>
    );
};

export default ItemListContainer;

