'use client'

import { useContext, useEffect, useRef } from 'react';

import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Markers from './Markers';

import { UserLocationContext } from '@/context/UserLocationContext';
import { DestinationCoordsContext } from '@/context/DestinationCoordsContext';
import { SourceCoordsContext } from '@/context/SourceCoordsContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapboxRoute from './MapboxRoute';
import DistanceTime from './DistanceTime';

const SESSION_TOKEN = "0a1f4412-b20b-4aa1-88a8-e91a8c10ca71&"
const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/"


const Mapbox = () => {

  const mapRef = useRef<any>()
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const { sourceCoords, setSourceCoords } = useContext(SourceCoordsContext)
  const { destinationCoords, setDestinationCoords } = useContext(DestinationCoordsContext)
  const { directionData, setDirectionData } = useContext(DirectionDataContext)

  // use to fly to source marker
  useEffect(() => {
    if (sourceCoords) {
      mapRef.current?.flyTo({
        center: [sourceCoords.lng, sourceCoords.lat],
        duration: 2500
      })
    }
  }, [sourceCoords])

  // use to fly to destination marker
  useEffect(() => {
    if (destinationCoords) {
      mapRef.current?.flyTo({
        center: [destinationCoords.lng, destinationCoords.lat],
        duration: 2500
      })
    }

    if (sourceCoords && destinationCoords) {
      getDirectionRoute()
    }
  }, [destinationCoords])

  const getDirectionRoute = async() => {
    const res = await fetch(MAPBOX_DRIVING_ENDPOINT + sourceCoords.lng + ',' + sourceCoords.lat + ';' + destinationCoords.lng + ',' + destinationCoords.lat + '?overview=full&geometries=geojson&access_token=' + process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    {
      headers: {
        "Content-Type": "application-text"
      }
    }
    )

    const result = await res.json()
    console.log(result);
    setDirectionData(result)
}

  

  return (
    <div className='p-5 h-full'>
      <h2 className='tex-[20px] font-semibold'>Map</h2>
      <div className='rounded-lg overflow-hidden'>
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14
            }}
            style={{width: '100%', height: 550, borderRadius: 10}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            
            {directionData?.routes ? (
              <MapboxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
          ) : null
        }
      </div>
      <div className='absolute bottom-[40px] right-[20px] z-20 hidden md:block'>
        <DistanceTime />
      </div>
    </div>
  )
}

export default Mapbox