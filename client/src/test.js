import React, { useState, useRef } from 'react';
import './App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { CircularProgress } from '@mui/material';

// the center Marker at the beginning
const center = { lat: 47.625168, lng: -122.337751 };
const lib = ['places'];


function App() {
  const [view, setView] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  const destiantionRef = useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: lib,
  })

  // If it's not loaded
  if (!isLoaded) {
    return <CircularProgress />
  }

  // A function to handle submission of a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const origin = originRef.current.value;
    const destination = destiantionRef.current.value;
    console.log(origin, destination);

    // await showRoute()
    setView(1);
    console.log("test submit!")
  }

  async function showRoute() {
    const origin = originRef.current.value;
    const destination = destiantionRef.current.value;
    if (origin === '' || destination === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)

    // send data to backend
    console.log(origin, destination);
    fetch("/postData", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        start: origin,
        end: destination,
      })
    })
    .then(res => res.json())
  }

  return (
    <div>
    { view === 0 ?
      <div className='post-form'>
        <form onSubmit={handleSubmit} method='post'>
          <Autocomplete>
          <input type="text" name="start" placeholder='Origin' ref={originRef}/>
          </Autocomplete>
          <br></br>
          <Autocomplete>
          <input type="text" name="end" placeholder='Destination' ref={destiantionRef} />
          </Autocomplete>
          <br></br>
          <input type='submit' value='submit' />
      </form>
      </div>
      :
      <div className='show-map'>
        <h1>Show Maps</h1>
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
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    }
    </div>

  );
}

export default App;
