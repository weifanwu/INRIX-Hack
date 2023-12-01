import React, {useState} from "react";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { useLocation } from 'react-router-dom';
import { InfoWindow } from "@react-google-maps/api";


export default function Map(props) {
    const center = { lat: 47.625168, lng: -122.337751 };
    let location = useLocation();

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState();


    // Get all nearest posts from backend later
    // set up new posts data for testing multiple markers
    let posts = [
      {
        id: 1,
        start: { lat:47.627349, lng: -122.350069 },
        end: {lat: 47.618956, lng: -122.344144}
      },
      {
        id: 2,
        start: { lat: 47.618956, lng: -122.344144 },
        end: { lat: 47.36171, lng: -122.18576 },
      },
      {
        id: 3,
        start: { lat: 47.36171, lng: -122.18576 },
        end: { lat: 47.613086, lng: -122.347959 }
      },
      {
        id: 4,
        start: { lat: 47.613086, lng: -122.347959 },
        end: { lat:47.627349, lng: -122.350069 }
      }
    ];

    function testGetData() {
      fetch("/testGetPost", {
        method: "GET"
      }).then((res => res.json()))
      .then(data => {
        console.log(data);
        console.log("start for loop");
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          console.log(data[i].start);
          console.log(data[i].end);
          console.log(data[i].post_id);
          posts.push({
            id: parseInt(data[i].post_id),
            start: {lat: data[i].start[0], lng: data[i].start[1]},
            end: {lat: data[i].end[0], lng: data[i].end[1]}
          })
        }
        console.log(posts);
      })
      .catch((err) => console.log(err))
    }

    testGetData();

    return (
      <div className='show-map'>
        <h1>Find and Match Your Post!</h1>
        <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: '1000px', height: '1000px' }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => setMap(map)}
    >
      {/* <Marker position={center} /> */}
      {posts.map((object, i) => (
        <Marker
          key={i}
          position={object.start}
          onClick={() => {
            setStart(object.start);
            setOpen(true);
          }}
        />
      ))}
      <DirectionsRenderer directions={props.directions} />
      {open && (
        <InfoWindow position={start} onCloseClick={() => setOpen(false)}>
          <div style={{ width: '200px', height: '100px' }}>
            <p>It's a start position!</p>
            <button>Start Chat</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
        
      </div>
    );
}