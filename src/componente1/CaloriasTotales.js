import { useState } from "react";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { Alert } from "react-bootstrap";


const CaloriasTotales = () => {
    const registros = useSelector(state => state.registros.registros);
    const alimentos = useSelector(state => state.alimentos.alimentos);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Función para obtener las calorías de un registro dado su id de alimento
        const obtenerCaloriasPorIdAlimento = (idAlimento) => {
            const alimento = alimentos.find(alimento => alimento.id === idAlimento);
            if (alimento) {
                return alimento.porcion.includes("u") ? alimento.calorias : alimento.calorias / 100;
            } else {
                return 0;
            }
        };

        // Calculo las calorias totales sumando las calorias de cada registro
        const totalCalorias = registros.reduce((total, registro) => {
            const caloriasAlimento = obtenerCaloriasPorIdAlimento(registro.idAlimento);
            return total + caloriasAlimento * registro.cantidad;
        }, 0);

        setTotal(totalCalorias);

    }, [registros]);

    return (
        <Alert variant="info " className="animate__animated animate__swing cardDashboard">
            <Alert.Heading>{Math.trunc(total)}</Alert.Heading>
            <hr />
            <p className="mb-0">
                Calorias Totales
            </p>
        </Alert>
    );
}

export default CaloriasTotales