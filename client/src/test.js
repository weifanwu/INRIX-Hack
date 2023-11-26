import React, { useState, useRef } from 'react';
import './App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { CircularProgress, Button } from '@mui/material';
// import { getGeocode, getLatLng } from 'use-places-autocomplete'

// the center Marker at the beginning
const center = { lat: 47.625168, lng: -122.337751 };
const lib = ['places'];
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;


function App() {
  const [view, setView] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  const destiantionRef = useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
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

    // convert address to la/ln
    // const originData = await getGeocode(origin);
    // const {lat, lng} = await getLatLng(originData[0]);
    // console.log(lat, lng);

    // test for fetch a geocoder information
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`, {
      method: "GET"
    }).then((res => res.json()))
    .then(data => {
      console.log(data.results[0].geometry.location);
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      console.log(lat, lng);
    })
    .catch((err) => console.log(err))

    await showRoute()
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
    <div className='all'>
    { view === 0 ?
      <div className='form-part'>
        <h1>Create Your Post Here!</h1>
        <form onSubmit={handleSubmit} method='post' className='post-form'>
          <label>Origin:</label>
          <Autocomplete>
          <input type="text" name="start" ref={originRef}/>
          </Autocomplete>

          <label>Destination:</label>
          <Autocomplete>
          <input type="text" name="end" ref={destiantionRef} />
          </Autocomplete>

          <label htmlFor='date'>Date:</label>
          <input type="date" name="time" id="date" />

          <label htmlFor='date'>Content:</label>
          <input type="text" name="end" id='content'/>

          <Button type="submit" className="form-btn">Submit</Button>
        </form>
      </div>
      :
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
