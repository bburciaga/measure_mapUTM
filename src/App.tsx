import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import logo from './logo.svg';
import Measure from './MeasureHelpers/Measure';
import './App.css';


function App() {
  const [map, setMap] = useState<any>(null);


  return (
    <div className="App">
      <MapContainer id="mapid" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexFlow: 'column wrap',
          height: '70vh'
        }}>
          { map ? <Measure map={map} /> : null }
        </div>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;
