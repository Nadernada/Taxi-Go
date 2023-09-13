import { Marker } from 'react-map-gl';
import { UserLocationContext } from '@/context/UserLocationContext';
import { useContext } from 'react';
import { SourceCoordsContext } from '@/context/SourceCoordsContext';
import { DestinationCoordsContext } from '@/context/DestinationCoordsContext';

const Markers = () => {

  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const { sourceCoords, setSourceCoords } = useContext(SourceCoordsContext)
  const { destinationCoords, setDestinationCoords } = useContext(DestinationCoordsContext)

  return (
    <div>
      {/* Source Marker */}
      {sourceCoords.length != 0 ? (
        <Marker
          longitude={sourceCoords?.lng}
          latitude={sourceCoords?.lat}
          anchor="bottom" >
            <img
              src="./pin.png"
              className='w-10 h-10'
              />
        </Marker>
      ) : null}

      {/* Destination Marker */}
      {destinationCoords.length != 0 ? (
        <Marker
          longitude={destinationCoords?.lng}
          latitude={destinationCoords?.lat}
          anchor="bottom" >
            <img
              src="./pin.png"
              className='w-10 h-10'
              />
        </Marker>
      ) : null}
    </div>
  )
}

export default Markers