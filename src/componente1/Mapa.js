import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../imgs/pinpoint.png';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const Mapa = () => {

    const apiKey = localStorage.getItem("apiKey");
    const id = localStorage.getItem("user");
    const [paises, setPaises] = useState([]);
    const [dataPaises, setDataPaises] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://calcount.develotion.com/usuariosPorPais.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
                'iduser': id
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    setDataPaises(datos.paises);
                } else {
                    //setError(true);
                    //setMsjError(datos.mensaje);
                }

            });

        //voy a buscar los paises
        fetch("https://calcount.develotion.com/paises.php")
            .then(respuesta => respuesta.json())
            .then(datos => {
                setPaises(datos.paises)
            });

        setLoading(false);

    }, [])

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    const listaMapa = paises.map(pais => {
        const paisData = dataPaises.find(data => data.name === pais.name);
        const cantidad = paisData ? paisData.cantidadDeUsuarios : 0;
        return {
            nombre: pais.name,
            latitude: pais.latitude,
            longitude: pais.longitude,
            cantidad: cantidad
        };
    });

    return (
        <Card className="p-2 animate__animated animate__fadeIn cardDashboard">
            <MapContainer center={[-17, -60.7129]} zoom={2.6} style={{ height: '400px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {!loading ? listaMapa.map(marker => (
                    <Marker key={`${marker.latitude}-${marker.longitude}`} position={[marker.latitude, marker.longitude]} icon={customMarkerIcon}>
                        <Popup>
                            <h3 style={{color: "#a8e7ca"}}>{marker.nombre}</h3>
                            <p>Cantidad de usuarios registrados: {marker.cantidad}</p>
                        </Popup>
                    </Marker>
                )) : null}
            </MapContainer>
        </Card>
    )
}

export default Mapa