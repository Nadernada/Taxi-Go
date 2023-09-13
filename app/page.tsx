'use client'

import Booking from "@/components/booking/Booking";
import Mapbox from '@/components/map/Mapbox'
import { DestinationCoordsContext } from "@/context/DestinationCoordsContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {

  const [userLocation, setUserLocation] = useState<any>()
  const [sourceCoords, setSourceCoords] = useState<any>([])
  const [destinationCoords, setDestinationCoords] = useState<any>([])
  const [directionData, setDirectionData] = useState<any>([])
  const [carAmount, setCarAmount] = useState<any>()


  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
  }

  return (
    <div>
      <UserLocationContext.Provider
        value={{ userLocation, setUserLocation}}
      >
      <SourceCoordsContext.Provider
        value={{ sourceCoords, setSourceCoords }}
      >
      <DestinationCoordsContext.Provider
        value={{ destinationCoords, setDestinationCoords }}
      >
      <DirectionDataContext.Provider
      value={{ directionData, setDirectionData }}
      >
      <SelectedCarAmountContext.Provider
        value={{ carAmount, setCarAmount }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <Booking />
          </div>
          <div className="col-span-2">
            <Mapbox />
          </div>
        </div>
      </SelectedCarAmountContext.Provider>
      </DirectionDataContext.Provider>
      </DestinationCoordsContext.Provider>
      </SourceCoordsContext.Provider>
      </UserLocationContext.Provider>
    </div>
  )
}
