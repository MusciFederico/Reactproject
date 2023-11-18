import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import CardWidget from '../cardwidget/cardwidget';
import imagenCarrito from '../../assets/img/fedemusci-fotor-20231003154747.png';
import { NavLink } from 'react-router-dom';

const navItemStyle = {
    fontSize: '20px',
    color: 'white',
};

const navbarStyle = {
    width: '100%',
    margin: '0 auto',
};

const dropdownStyle = {
    backgroundColor: 'dark',
};

const dropdownItemStyle = {
    fontSize: '16px',
    color: 'black',
};

const arraydeproductos = [
    "gold",
    "silver",
    "tungsten",
];

const Navbarapp = () => {
    const cantidadProductosEnCarrito = 5;

    return (
        <Navbar bg="dark" expand="lg" variant="dark" style={navbarStyle}>
            <Container fluid>
                <Nav className="d-flex justify-content-around w-100">
                    <NavDropdown title="Productos" style={navItemStyle}>
                        {arraydeproductos.map((cat, index) => (
                            <Nav.Link
                                key={index}
                                as={NavLink}
                                to={`/category/${cat}`}
                                style={{ ...navItemStyle, ...dropdownItemStyle }}
                            >
                                {cat}
                            </Nav.Link>
                        ))}
                    </NavDropdown>
                    <NavLink to="/" style={navItemStyle}>
                        Contactos
                    </NavLink>
                    <NavDropdown
                        title={
                            <>
                                <img src={imagenCarrito} alt="Carrito" style={{ width: '30px', height: '30px' }} />
                            </>
                        }
                        id="basic-nav-dropdown"
                        style={dropdownStyle}
                    >
                        <Nav.Link as={NavLink} to="/" style={dropdownItemStyle}>
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/" style={dropdownItemStyle}>
                            Configuración
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/" style={dropdownItemStyle}>
                            Ayuda
                        </Nav.Link>
                    </NavDropdown>
                    <NavLink to="/" style={navItemStyle}>
                        Novedades
                    </NavLink>
                    <NavLink to="/cart" style={navItemStyle}>
                        <CardWidget cantidad={cantidadProductosEnCarrito} />
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navbarapp;