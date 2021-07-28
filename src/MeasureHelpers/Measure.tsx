import React, { useEffect, useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { FeatureGroup, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import proj4 from 'proj4';
import ruler from './ruler.png';
import dotMarker from './dotMarker.png';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const useStyles = makeStyles((theme) => ({
  image: {
    height: 24,
    width: 24
  },
  rulerButton: {
    margin: '5px',
    background: 'white',
    zIndex: 1500,
    height: '48px', width: '48px',
    borderRadius: '4px'
  }
}));

const utm_zone = (longitude: any, latitude: any) => {
  let utmZone = ((Math.floor((longitude + 180) / 6) % 60) + 1).toString(); //getting utm zone
        proj4.defs([
            ['EPSG:4326', '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
            ['EPSG:AUTO', `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`]
        ]);
        const en_m = proj4('EPSG:4326', 'EPSG:AUTO', [longitude, latitude]); // conversion from (long/lat) to UTM (E/N)
        let utmEasting = Number(en_m[0].toFixed(4));
        let utmNorthing = Number(en_m[1].toFixed(4));
        return ('UTM  Zone:' + utmZone + ' UTM Easting:' + utmEasting + ' UTM Northing:' + utmNorthing);
}

const Measure = ({ map } : { map: any }) => {
  const classes = useStyles();
  const [position, setPosition] = useState(map.getCenter());
  const [measureMode, setMeasureMode] = useState(false);

  const [mapLayers, setMapLayers] = useState([]);
  
  map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    } 
  });

  const _onCreate = (e: any) => {
    console.log(e);
    const {layerType, layer} = e;
    if(layerType === 'polyline') {
      const {_leaflet_id} = layer;
    }
  };

  const _onEdited = (e: any) => {
    
  }

  const _onDelete = (e: any) => {
    
  };

  const _onDrawStart = (e: any) => {
    
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    setMeasureMode(!measureMode);
  };
  //console.log(measureMode);
  //console.log(position);

  const icon = L.icon({ iconUrl: dotMarker, iconSize: [16,16] });

	return (
		<div style={{zIndex: 500}}>
			<IconButton className={classes.rulerButton} onClick={handleClick}>
				<img className={classes.image} src={ruler} />
      </IconButton>
      <FeatureGroup>
        <EditControl
          position='topright' 
          onCreated={_onCreate}
          onEdited={_onEdited} 
          onDeleted={_onDelete}
          onDrawStart={_onDrawStart}
          draw={{
            rectangle: false,
            polyline: true,
            circle: false,
            circlemarker: false,
            marker: false
          }}
        />
      </FeatureGroup>
      { measureMode ? 
        <Marker position={position} icon={icon} >
          <Popup>{utm_zone(position.lng, position.lat)}</Popup>
        </Marker> : null
      }
		</div>
	);
};

export default Measure;