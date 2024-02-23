import { useSelector } from "react-redux"
import { Bar } from 'react-chartjs-2';
import { Card } from "react-bootstrap";

const GraficoCaloriasFecha = () => {

  const registros = useSelector(state => state.registros.registros);

  const unaSemanaAtras = new Date();
  unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 8);

  //primero filtro la fecha, luego los recorro. Por cada uno agrego fecha y la suma de calorias.
  const listaCaloriasXFecha = registros.filter(registro => new Date(registro.fecha) >= unaSemanaAtras).map(registro => ({
    fecha: registro.fecha,
    //filtro que la fecha sea la misma. Luego acumulo con el reduce la cantidad de calorias de ese registro.
    cantidadCalorias: registros.filter(r => r.fecha === registro.fecha).reduce((total, r) => total + r.cantidad, 0)
  })
  );

  const listaCaloriasXFechaDepurada = listaCaloriasXFecha.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.fecha === item.fecha
    ))
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const labels = listaCaloriasXFechaDepurada.map(item => item.fecha)
  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad',
        data: listaCaloriasXFechaDepurada.map(item => item.cantidadCalorias),
        backgroundColor: 'rgba(168, 231, 202, 0.5)',
      }
    ],
  };


  return (
    <Card className="p-2 animate__animated animate__fadeIn cardDashboard" style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
      <Card.Title className='text-center card-title-large'>Calorias ultima semana</Card.Title>
      <div style={{ flex: '1' }}>
        <Bar options={options} data={data} />
      </div>
      <Card.Footer>
        <small >Este grafico muestra la cantidad de calorias para cada dia de la ultima semana</small>
      </Card.Footer>
    </Card>
  );
};

export default GraficoCaloriasFecha;