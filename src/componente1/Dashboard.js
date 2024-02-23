import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import RegistroComida from './RegistroComida';
import ListadoComidas from './ListadoComidas';
import Logout from './Logout';
import CaloriasTotales from './CaloriasTotales';
import CaloriasDiarias from './CaloriasDiarias';
import GraficoCantidades from './GraficoCantidades';
import TiempoRestante from './TiempoRestante';
import GraficoCaloriasPorFecha from './GraficoCaloriasFecha';
import Mapa from './Mapa';
import 'leaflet/dist/leaflet.css';


const Dashboard = () => {

  return (
    <Container fluid style={{ maxWidth: '1400px' }} className='mt-4'>
      <Row className='m-2 mb-3' style={{ display: 'flex'}}>
        <Col xs={12} md={3} className="m-2">
          <RegistroComida />
        </Col>
        <Col xs={12} md={6} className="m-2">
          <GraficoCantidades />
        </Col>
        <Col xs={12} md={2} className="m-2" style={{ display: 'flex', flexDirection: 'column' }}>
          <Row style={{ flex: '2', marginBottom: '10px', marginRight: '12px' }}><CaloriasTotales /></Row>
          <Row style={{ flex: '2', marginBottom: '10px', marginRight: '12px' }}><CaloriasDiarias /></Row>
          <Row style={{ flex: '2', marginBottom: '10px', marginRight: '12px' }}><TiempoRestante/></Row>
          <Row style={{ flex: '1', marginBottom: '2px', marginRight: '12px' }}><Logout /></Row>
        </Col>
      </Row>
      <Row className='m-3'>
        <Col xs={12} md={4} className="m-2">
          <Row className='mb-4'><GraficoCaloriasPorFecha /></Row>
          <Row><Mapa/></Row>
        </Col>
        <Col xs={12} md={7} className="m-2">
          <ListadoComidas />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard