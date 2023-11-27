import React, {useState} from "react";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { useLocation } from 'react-router-dom';


export default function Map(props) {
    const center = { lat: 47.625168, lng: -122.337751 };
    let location = useLocation();

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))

    return (
        <div className='show-map'>
        <h1>Find and Match Your Post!</h1>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '1000px', height: '1000px' }}
          options={{
            // in order to do not show unuseful information
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
          >
          <Marker position={center} />
          <DirectionsRenderer directions={props.directions} />
        </GoogleMap>
      </div>
    )
}