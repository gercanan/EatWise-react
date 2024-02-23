import React from 'react'
import { useRef } from 'react';
import { Row, Card, Form, Button, Alert, Collapse  } from 'react-bootstrap';
import imagen from '../imgs/imgLanding2.jpg';
import { useDispatch } from 'react-redux';
import { guardarinfo } from '../feature/usuariosSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const InicioSesion = () => {
    const campoEmail = useRef(null);
    const campoPassword = useRef(null);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [botonLogin, setBotonLogin] = useState(false);
    const [error, setError] = useState(false);
    const [msjError, setMsjError] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [open, setOpen] = useState(false);

    const cambioInput = e => {
        campoEmail.current.value && campoPassword.current.value ? setBotonLogin(true) : setBotonLogin(false);
    }


    const inicioUsuario = (event) => {
        setSpinner(true);
        setError(false);

        const bodyData = {
            usuario: `${campoEmail.current.value}`,
            password: `${campoPassword.current.value}`
        }

        fetch("https://calcount.develotion.com/login.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    localStorage.setItem("user", datos.id);
                    localStorage.setItem("apiKey", datos.apiKey);
                    localStorage.setItem("calDiarias", datos.caloriasDiarias);
                    dispatch(guardarinfo(datos));

                    navigate("/Dashboard");
                } else {
                    setError(true);
                    setMsjError(datos.mensaje);
                    setSpinner(false);
                }
            });

        event.preventDefault();
    }

    return (
        <Card className='m-2 cardLanding animate__animated animate__fadeInDown'>
            <Card.Img variant="top" src={imagen} className='imgLanding' />
            <Card.Body>
                <Card.Title className='text-center card-title-large'>Sign in</Card.Title>
                <Form onSubmit={inicioUsuario} className='m-3'>
                    <Row md>
                        <Form.Group controlId='formInicioEmail' className='m-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className='custom-input' required ref={campoEmail} type='email' placeholder='Example@email.com' onChange={cambioInput} />
                        </Form.Group>
                        <Form.Group controlId='formInicioPassword' className='m-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='custom-input' required ref={campoPassword} type='password' placeholder='Password' onChange={cambioInput} />
                        </Form.Group>
                    </Row>
                    <Button type='submit' className='m-2 botonLanding' disabled={!botonLogin}>Login</Button>
                </Form>
                {spinner && <Spinner animation="border" role="status" variant="secondary" className='m-3'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </Card.Body>

            {error ? <Alert variant='danger'>{msjError}</Alert> : null}
            <Card.Footer>
                <Button onClick={() => setOpen(!open)} aria-controls="collapse-text" aria-expanded={open} className='botonForgot'>
                    Forgot password? Click here
                </Button>
                <Collapse in={open}>
                    <div id="collapse-text">
                        Try harder
                    </div>
                </Collapse>
            </Card.Footer>

        </Card>
    )
}

export default InicioSesion