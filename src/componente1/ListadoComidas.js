import { Card, Form, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Comida from "./Comida";
import { guardarRegistros } from "../feature/registrosSlice";

const ListadoComidas = () => {

  const id = localStorage.getItem("user");
  const apiKey = localStorage.getItem("apiKey");
  const registros = useSelector(state => state.registros.registros);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://calcount.develotion.com/registros.php?idUsuario=" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': apiKey,
        'iduser': id
      }
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        dispatch(guardarRegistros(data));
      })
      .catch(error => {
        console.log(error);
      });


  }, [])


  const [filtro, setFiltro] = useState("");

  const filtrarRegistros = (registro) => {
    const fechaRegistro = new Date(registro.fecha);
    const fechaLimite = new Date();

    switch (filtro) {
      case "ultimaSemana":
        fechaLimite.setDate(fechaLimite.getDate() - 7);
        return fechaRegistro >= fechaLimite;
      case "ultimoMes":
        fechaLimite.setDate(fechaLimite.getMonth() - 1);
        return fechaRegistro >= fechaLimite;
      default:
        return true;
    }

  };


  return (
    <>
      <Card className="p-3 cardDashboard">
        <Card.Title className='text-center card-title-large'>Listado de comidas</Card.Title>
        <Form.Select onChange={(e) => setFiltro(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="ultimaSemana">Ultima semana</option>
          <option value="ultimoMes">Ultimo mes</option>
        </Form.Select>
        <br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registros && registros.length > 0 && registros.filter(filtrarRegistros).reverse().map(registro => (
              <tr key={registro.idRegistro}>
                <Comida {...registro} />
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default ListadoComidas