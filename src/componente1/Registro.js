import React, { useRef } from 'react'
import { Button, Form, Row, Card, Alert, Collapse } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import imagen from '../imgs/imgLanding1.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { guardarinfo } from '../feature/usuariosSlice';
import Spinner from 'react-bootstrap/Spinner';
import { guardarPaises } from '../feature/registrosSlice';


const Registro = () => {
    const campoEmail = useRef(null);
    const campoPassword = useRef(null);
    const campoPais = useRef(null);
    const campoCalorias = useRef(null);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [error, setError] = useState(false);
    const [msjError, setMsjError] = useState("");
    const [paises, setPaises] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("https://calcount.develotion.com/paises.php")
            .then(respuesta => respuesta.json())
            .then(datos => {
                setPaises(datos.paises)
                dispatch(guardarPaises(datos.paises));
            });
    }, []);

    const fetchRegistro = (event) => {
        setSpinner(true);
        setError(false);

        event.preventDefault();
        const bodyData = {
            usuario: campoEmail.current.value,
            password: campoPassword.current.value,
            idPais: campoPais.current.value,
            caloriasDiarias: campoCalorias.current.value
        };

        fetch("https://calcount.develotion.com/usuarios.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        })
            .then(respuesta => respuesta.json())
            .then(data => {
                console.log(data);
                if (data.codigo === 200) {
                    localStorage.setItem("user", data.id);
                    localStorage.setItem("apiKey", data.apiKey);
                    localStorage.setItem("calDiarias", data.caloriasDiarias);
                    dispatch(guardarinfo(data));

                    navigate("/Dashboard");
                } else {
                    setError(true);
                    setMsjError(data.mensaje);
                    setSpinner(false);
                }
            });
    }

    return (

        <Card className='m-2 cardLanding animate__animated animate__fadeInUp'>

            <Card.Body>
                <Card.Title className='text-center card-title-large'>Sign up</Card.Title>
                <Form onSubmit={fetchRegistro} className='m-3'>
                    <Row md>
                        <Form.Group controlId='formRegistroEmail' className='m-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className='custom-input' required ref={campoEmail} type='email' placeholder='Example@email.com' />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId='formRegistroPassword' className='m-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='custom-input' required ref={campoPassword} type='password' placeholder='Password' />

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className='m-2'>
                            <Form.Label>Country</Form.Label>
                            <Form.Select className='custom-input' required ref={campoPais}>
                                {paises.map(pais => <option key={pais.id} value={pais.id}>{pais.name}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Form.Group className='m-2'>
                                <Form.Label>Calories</Form.Label>
                                <Form.Control className='custom-input' required ref={campoCalorias} type='number' placeholder='2000' min={1500} />
                                <Form.Text className='text-dark'>Maintenance calories.</Form.Text>
                            </Form.Group>
                        </Row>
                    </Row>
                    <Button type='submit' className='m-2 botonLanding'>Create account</Button>
                </Form>
                { spinner && <Spinner animation="border" role="status" variant="secondary" className='m-3'> 
                    <span className="visually-hidden">Loading...</span>
                </Spinner>} 
            </Card.Body>
            
            { error ? <Alert variant='danger'>{msjError}</Alert> : null}
            <Card.Img variant='bottom' src={imagen} className='imgLanding' />
            <Card.Footer>
                <Button onClick={() => setOpen(!open)} aria-controls="collapse-text" aria-expanded={open} className='botonForgot'>
                    Terms of Service
                </Button>
                <Collapse in={open}>
                    <div id="collapse-text">
                        We can access your bank account
                    </div>
                </Collapse>
            </Card.Footer>


        </Card>



    )
}

export default Registro