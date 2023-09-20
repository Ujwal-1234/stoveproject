import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Maps() {
  const position = [51.505, -0.09]
  return (
    <div className='max-h-screen w-full shadow-inner shadow-white h-screen flex flex-wrap items-center overflow-auto justify-center lg:w-11/12'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          className=' h-96 w-96'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>,
    </div>
  )
}
