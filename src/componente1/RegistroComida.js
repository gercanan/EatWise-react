import { Card, Form, Button, Alert } from "react-bootstrap"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { agregarRegistro } from "../feature/registrosSlice";
import { guardarAlimentos } from "../feature/alimentosSlice";


const RegistroComida = () => {

    const apiKey = localStorage.getItem("apiKey");
    const id = localStorage.getItem("user");

    const [error, setError] = useState(false);
    const [msjError, setMsjError] = useState("");

    const campoCantidad = useRef(0);
    const campoFecha = useRef();
    const campoAlimento = useRef(0);

    const alimentos = useSelector(state => state.alimentos.alimentos);

    const dispatch = useDispatch();

    const [textoUnidades, setTextoUnidades] = useState("");

    const obtenerFechaActual = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetch("https://calcount.develotion.com/alimentos.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
                'iduser': id
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log(datos.alimentos);
                dispatch(guardarAlimentos(datos.alimentos));
            });
    }, []);

    const cambioUnidad = () => {
        const alimentoSeleccionadoId = campoAlimento.current.value;
        const alimentoSeleccionado = alimentos.find(alimento => alimento.id === parseInt(alimentoSeleccionadoId));
        
        if (alimentoSeleccionado.porcion.includes("u")) {
            setTextoUnidades("La cantidad expresada en unidades");
        } else if(alimentoSeleccionado.porcion.includes("g")) {
            setTextoUnidades("La cantidad expresada en gramos");
        } else{
            setTextoUnidades("La cantidad expresada en mililitros");
        }
    };

    const agregarComida = (event) => {
        event.preventDefault();

        const dataBody = {
            idAlimento: campoAlimento.current.value,
            idUsuario: id,
            cantidad: campoCantidad.current.value,
            fecha: campoFecha.current.value
        }

        fetch("https://calcount.develotion.com/registros.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
                'iduser': id
            },
            body: JSON.stringify(dataBody)
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                if(datos.codigo === 200){
                    //armo el objeto registro. Lo que me devuelve la api no me sirve.
                    const registro = {
                        id: datos.idRegistro,
                        idAlimento: parseInt(dataBody.idAlimento),
                        idUsuario: parseInt(dataBody.idUsuario),
                        cantidad: parseInt(dataBody.cantidad),
                        fecha: dataBody.fecha
                    }
                    dispatch(agregarRegistro(registro));
                }else{
                    setError(true);
                    setMsjError(datos.mensaje);
                }
                
            });


    }

    return (
        <>
            <Card className="p-2 animate__animated animate__bounceInLeft cardDashboard" style={{ height: '100%' }}>
                <Card.Body>
                    <Card.Title className='text-center card-title-large'>Registro de comida</Card.Title>
                    <Form onSubmit={agregarComida} className="m-3">
                        <Form.Group className='m-2'>
                            <Form.Label>Alimento</Form.Label>
                            <Form.Select className='custom-input' ref={campoAlimento} onChange={cambioUnidad}>
                                {alimentos && alimentos.length > 0 && alimentos.map(alimento => <option key={alimento.id} value={alimento.id} >{alimento.nombre}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='m-2'>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control className='custom-input' ref={campoCantidad} required type='number' placeholder='100' min={1} max={500} />
                            <Form.Text className='text-dark'>{textoUnidades}</Form.Text>
                        </Form.Group>
                        <Form.Group className='m-2'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control className='custom-input' type="date" ref={campoFecha} max={obtenerFechaActual()} />
                        </Form.Group>
                        <Button type='submit' className='m-2 botonLanding'>Add meal</Button>

                    </Form>
                </Card.Body>
                { error ? <Alert variant='danger'>{msjError}</Alert> : null}
                <Card.Footer>
                    <small >Registre su comida</small>
                </Card.Footer>
            </Card>

        </>
    )
}

export default RegistroComida