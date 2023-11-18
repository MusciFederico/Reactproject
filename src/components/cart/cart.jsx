import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/client';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Popup from '../popup/popup';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [isOrderValid, setIsOrderValid] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showEmptyCart, setShowEmptyCart] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartCollection = collection(db, 'cartItems');
                const querySnapshot = await getDocs(cartCollection);

                const items = [];
                let total = 0;

                querySnapshot.forEach((doc) => {
                    const itemData = doc.data();
                    items.push({ id: doc.id, ...itemData });

                    const itemPrice = parseFloat(itemData.price);
                    const itemQuantity = parseFloat(itemData.quantity);

                    if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                        total += itemPrice * itemQuantity;
                    }
                });

                setCartItems(items);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        setIsOrderValid(buyerName !== '' && buyerPhone !== '' && buyerEmail !== '');
    }, [buyerName, buyerPhone, buyerEmail, cartItems]);

    const handleCreateOrder = async () => {
        if (isOrderValid) {
            const order = {
                buyer: { name: buyerName, phone: buyerPhone, email: buyerEmail },
                items: cartItems,
                total: totalPrice
            };

            try {
                const refOrder = collection(db, 'orders');
                const newOrder = await addDoc(refOrder, order);

                const cartCollection = collection(db, 'cartItems');
                cartItems.forEach(async (item) => {
                    const cartItemDoc = doc(cartCollection, item.id);
                    await deleteDoc(cartItemDoc);
                });

                setPopupMessage('Order received! Your cart has been cleared.');
                setShowPopup(true);
                setCartItems([]);

                setTimeout(() => {
                    setShowEmptyCart(true);
                }, 1000);

                console.log('Order created with ID:', newOrder.id);
            } catch (error) {
                console.error('Error creating order:', error);
            }
        } else {
            setPopupMessage('Please enter all buyer information before creating the order.');
            setShowPopup(true);
            console.log('Please enter all buyer information before creating the order.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        card: {
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
            width: '200px',
        },
        emptyCart: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#888',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Your Cart</h2>
            {!showEmptyCart ? (
                <>
                    {cartItems.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={styles.card}>
                                    <h3>{item.title}</h3>
                                    <img src={item.image} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    <p>Description: {item.description}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.emptyCart}>
                            <p>Your cart is empty.</p>
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <>
                            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Total Price: ${totalPrice.toFixed(2)}</p>

                            <div style={{ marginTop: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    pattern="[0-9]*"
                                    value={buyerPhone}
                                    onChange={(e) => setBuyerPhone(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={buyerEmail}
                                    onChange={(e) => setBuyerEmail(e.target.value)}
                                />
                            </div>

                            <button onClick={handleCreateOrder} disabled={!isOrderValid}>
                                Create Order
                            </button>

                            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
                        </>
                    )}
                </>
            ) : (
                <div style={styles.emptyCart}>
                    <p>Your cart is empty.</p>
                    {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
                </div>
            )}
        </div>
    );
};

export default Cart;
