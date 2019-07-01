import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN =
  'pk.eyJ1IjoiYWxzbGVhZGVycyIsImEiOiJjang1aXNrcGkwMmR5M3lsZzg4OXFyNWRqIn0.qQib-cz84tOegHyTyc0U9g'

export default function HelloWorld() {
  const [view, setView] = useState({
    latitude: 27.9506,
    // this is 90
    longitude: -82.4572,
    // this is 360
    zoom: 4
  })
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [mapData, setMapData] = useState([])

  useEffect(() => {
    axios.get('https://localhost:5001/api/location').then(resp => {
      console.log(resp.data)
      setMapData(resp.data)
    })
  }, [])

  return (
    <>
      <ReactMapGL
        {...view}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={view => {
          setView(view)
        }}
      >
        <div style={{ position: 'absolute', left: 0 }}>
          <NavigationControl />
        </div>
        {mapData.map(city => {
          return (
            <Marker key={city.id} latitude={city.lat} longitude={city.long}>
              <button
                onClick={e => {
                  e.preventDefault()
                  setSelectedInfo(city)
                }}
              >
                Goal
              </button>
            </Marker>
          )
        })}

        {selectedInfo ? (
          <Popup
            latitude={selectedInfo.lat}
            longitude={selectedInfo.long}
            onClose={() => {
              setSelectedInfo(null)
            }}
          >
            <h2>{selectedInfo.place}</h2>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  )
}
