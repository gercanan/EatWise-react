import { useDispatch } from "react-redux";
import { eliminarRegistro } from "../feature/registrosSlice";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";


const Comida = ({ id, idAlimento, cantidad, fecha }) => {

  const apiKey = localStorage.getItem("apiKey");
  const user = localStorage.getItem("user");

  const dispatch = useDispatch();

  const alimentos = useSelector(state => state.alimentos.alimentos);


  const obtenerNombreAlimento = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    return alimentoEncontrado ? alimentoEncontrado.nombre : "Alimento no encontrado";
  };

  const obtenerUrlFotoAlimento = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    return alimentoEncontrado ? `https://calcount.develotion.com/imgs/${alimentoEncontrado.imagen}.png` : "Alimento no encontrado";
  };

  const eliminarRegistroComida = () => {

    fetch("https://calcount.develotion.com/registros.php?idRegistro=" + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': apiKey,
        'iduser': user
      }
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        //mando solo el id del registro
        dispatch(eliminarRegistro(id));
      }).catch(error => {
        console.log(error);
      });

  }


  return (
    <>
      <td><img src={obtenerUrlFotoAlimento(idAlimento)}/></td>
      <td>{obtenerNombreAlimento(idAlimento)}</td>
      <td>{cantidad}</td>
      <td>{fecha}</td>
      <td>
        <Button variant="danger" onClick={eliminarRegistroComida}>Delete</Button>
      </td>
    </>
  );
}

export default Comida