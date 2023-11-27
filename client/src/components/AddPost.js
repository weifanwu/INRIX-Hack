import React, { useState, useRef } from 'react';
import '../App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { CircularProgress, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

// import { getGeocode, getLatLng } from 'use-places-autocomplete'

// the center Marker at the beginning
const center = { lat: 47.625168, lng: -122.337751 };
const lib = ['places'];
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;


function App(props) {
  const [view, setView] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const navigate = useNavigate();
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

    // convert address to la/ln
    // const originData = await getGeocode(origin);
    // const {lat, lng} = await getLatLng(originData[0]);
    // console.log(lat, lng);

    // test for fetch a geocoder information
    // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Space+Needle,+Broad+Street,+Seattle,+WA&key=${API_KEY}`, {
      method: "GET"
    }).then((res => res.json()))
    .then(data => {
      console.log(data.results[0]);
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      console.log(lat, lng);
    })
    .catch((err) => console.log(err))


    await showRoute()
    navigate("/map");
  }

  async function showRoute() {
    const origin = originRef.current.value;
    const destination = destiantionRef.current.value;
  
    if (origin === '' || destination === '') {
      return;
    }
  
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
  
    try {
      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      // Assuming that props.setDirections is a function that sets directions in the parent component
      props.setDirections(results);
  
      console.log("JSON data:");
      console.log(JSON.stringify({
        start: origin,
        end: destination,
      }));
  
      // Send data to the Flask server
      const response = await fetch("/postData", {
        credentials: 'include',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({
          start: origin,
          end: destination,
        }),
      });
  
      // Check if the fetch was successful
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response from server:");
        console.log(responseData);
      } else {
        // Handle errors if the fetch was not successful
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className='all'>
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
    </div>

  );
}

export default App;
