import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from "react-bootstrap";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoCantidades = () => {
    const alimentos = useSelector(state => state.alimentos.alimentos);
    const registros = useSelector(state => state.registros.registros);

    //creo un objeto para guardar las cantidades para cada alimento
    const [cantidadesPorAlimento, setCantidadesPorAlimento] = useState({});

    useEffect(() => {
        const cantidades = {};

        registros.forEach(registro => {
            //si alimento no es null, accedo a su propiedad nombre
            const nombreAlimento = alimentos.find(alimento => alimento.id === registro.idAlimento)?.nombre;
            if (nombreAlimento) {
                cantidades[nombreAlimento] = (cantidades[nombreAlimento] || 0) + 1; //si existe devuelvo lo que tiene, sino devuelve 0, y le sumo 1
            }
        });

        setCantidadesPorAlimento(cantidades);
    }, [registros]);

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

    const labels = Object.keys(cantidadesPorAlimento); //recorro las keys del objeto cantidadesPorAlimento
    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad',
                data: Object.values(cantidadesPorAlimento), //recorro los valores del objeto cantidadesPorAlimento
                backgroundColor: 'rgba(168, 231, 202, 0.5)',
            }
        ],
    };

    return (
        <>
            <Card className="p-2 animate__animated animate__fadeIn cardDashboard" style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                <Card.Title className='text-center card-title-large'>Cantidades por alimento</Card.Title>
                <div style={{ flex: '1' }}>
                    <Bar options={options} data={data} />
                </div>
                <Card.Footer>
                    <small >Este grafico muestra la cantidad de veces que consumio cada alimento en su historial</small>
                </Card.Footer>
            </Card>
        </>
    );
}

export default GraficoCantidades;