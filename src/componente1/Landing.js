import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Landing = () => {

    let navigate = useNavigate();    

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            navigate("/Dashboard");
        }
    }, [])

    return (
        <Container className='mt-4' style={{ maxWidth: '900px' }}>
            <Row xs={1} md={2}>
                <Col className="h-100"><Registro /></Col>
                <Col className="h-100"><InicioSesion /></Col>
            </Row>
        </Container>
    )
}

export default Landing