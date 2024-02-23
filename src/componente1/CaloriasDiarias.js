import { useState } from "react";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

const CaloriasDiarias = () => {

    const registros = useSelector(state => state.registros.registros);
    const alimentos = useSelector(state => state.alimentos.alimentos);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const fechaHoy = `${year}-${month}-${day}`;

    const [total, setTotal] = useState(0);
    const [color, setColor] = useState("red");

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

        //filtro por la fecha de hoy
        const registrosHoy = registros.filter(registro => registro.fecha === fechaHoy);

        // Calculo las calorias totales sumando las calorias de cada registro
        const totalCalorias = registrosHoy.reduce((total, registro) => {
            const caloriasAlimento = obtenerCaloriasPorIdAlimento(registro.idAlimento);
            return total + caloriasAlimento * registro.cantidad;
        }, 0);

        setTotal(totalCalorias);


        //colorcito
        const calDiarias = parseInt(localStorage.getItem("calDiarias"));
        const porcentaje = totalCalorias * 100 / calDiarias;

        if (porcentaje > 100) {
            setColor("danger");
        } else if (porcentaje >= 90 && porcentaje <= 100) {
            setColor("warning ");
        } else {
            setColor("success ");
        }

    }, [registros]);

    return (
        <Alert variant={color} className="animate__animated animate__swing cardDashboard">
            <Alert.Heading>{Math.trunc(total)}</Alert.Heading>
            <hr />
            <p className="mb-0">
                Calorias consumidas hoy
            </p>
        </Alert>
    );

}

export default CaloriasDiarias