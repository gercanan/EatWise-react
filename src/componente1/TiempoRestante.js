import { Alert } from "react-bootstrap"
import { useState, useEffect } from "react";
import moment from 'moment';


const TiempoRestante = () => {

  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    const fechaHoy = moment();

    const fechaLimite = moment('2024-03-31');

    const diferenciaDias = fechaLimite.diff(fechaHoy, 'days');

    setDiasRestantes(diferenciaDias);
    
  }, [])


  return (
    <Alert variant="info " className="animate__animated animate__swing cardDashboard">
      <Alert.Heading>{diasRestantes} dias</Alert.Heading>
      <hr />
      <p className="mb-0">
        Restantes hasta nuevo plan
      </p>
    </Alert>
  )
}

export default TiempoRestante