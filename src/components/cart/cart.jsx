import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/client'; // Importa tu configuración de Firebase

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [confirmarCorreo, setConfirmarCorreo] = useState('');
    const [errorCorreo, setErrorCorreo] = useState(false);

    useEffect(() => {
        const obtenerProductosCarrito = async () => {
            try {
                const referenciaProductos = db.collection('productosCarrito'); // Reemplaza con el nombre de tu colección
                const snapshot = await referenciaProductos.get();

                const productos = [];
                let precioTotal = 0;

                snapshot.forEach((doc) => {
                    const producto = doc.data();
                    precioTotal += producto.precio * producto.cantidad;
                    productos.push({ id: doc.id, ...producto });
                });

                setCartItems(productos);
                setTotalPrice(precioTotal);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerProductosCarrito();
    }, []);

    const confirmarOrden = () => {
        // Lógica para confirmar la orden
        console.log('Orden confirmada!');
    };

    const cambiarCorreo = (e) => {
        setCorreo(e.target.value);
        setErrorCorreo(false);
    };

    const cambiarConfirmarCorreo = (e) => {
        setConfirmarCorreo(e.target.value);
        setErrorCorreo(e.target.value !== correo);
    };

    const esFormularioValido = () => {
        return nombre !== '' && apellido !== '' && telefono !== '' && correo !== '' && correo === confirmarCorreo;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2>Carrito</h2>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Tu carrito está vacío.</p>
            ) : (
                <div>
                    {cartItems.map((producto) => (
                        <div key={producto.id}>
                            <p>{producto.nombre} - Cantidad: {producto.cantidad}</p>
                        </div>
                    ))}
                    <p>Total: USD {totalPrice}</p>

                    <div>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <input type="email" placeholder="Correo electrónico" value={correo} onChange={cambiarCorreo} />
                        <input type="email" placeholder="Confirmar correo electrónico" value={confirmarCorreo} onChange={cambiarConfirmarCorreo} />
                        {errorCorreo && <p>Los correos electrónicos no coinciden.</p>}
                    </div>

                    <button onClick={confirmarOrden} disabled={!esFormularioValido()}>Confirmar Orden</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
