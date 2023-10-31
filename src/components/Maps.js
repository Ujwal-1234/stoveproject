import React, { useRef, useEffect, useState } from 'react';
import { Marker } from 'mapbox-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidWp3YWw5OTM0IiwiYSI6ImNsbmN1NG8yMjBrZnQyb2xxY2J6aDZ4enMifQ.l0W1vYO-GreEptUWQjvIaA';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(73.759026);
  const [lat, setLat] = useState(20.017596);
  const [zoom, setZoom] = useState(19);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      
    });
    map.current.on('load', () => {
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    });
  }, [lng, lat]);

  return (
    <div className='w-11/12 min-h-screen'>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="w-full min-h-screen" />
    </div>
  );
}
