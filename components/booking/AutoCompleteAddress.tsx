import { DestinationCoordsContext } from '@/context/DestinationCoordsContext'
import { SourceCoordsContext } from '@/context/SourceCoordsContext'
import { useContext, useEffect, useState } from 'react'

const SESSION_TOKEN = "0a1f4412-b20b-4aa1-88a8-e91a8c10ca71&"
const RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/"


const AutoCompleteAddress = () => {

  const [source, setSource] = useState<any>()
  const [sourceChange, setSourceChange] = useState<any>(false)
  const {sourceCoords, setSourceCoords} = useContext(SourceCoordsContext)

  const [destination, setDestination] = useState<any>()
  const [destinationChange, setDestinationChange] = useState<any>(false)
  const {destinationCoords, setDestinationCoords} = useContext(DestinationCoordsContext)

  const [addressList,setAddressList] = useState<any>([])

  useEffect(() => { 
    const delayDebounce = setTimeout(() => {
      getAddress()
    }, 1000)
    return () => clearTimeout(delayDebounce)
  }, [source, destination])

  const getAddress = async() => {
    const query = sourceChange ? source : destination
    const res = await fetch('/api/search-address?q=' + query, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await res.json()
    setAddressList(result)
  }

  const onSourceAddressClick = async(item:any) => {
    setSource(item.full_address)
    setSourceChange(false)
    setAddressList([])

    const res = await fetch(RETRIEVE_URL + item.mapbox_id + "?session_token=" + SESSION_TOKEN + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_TOKEN)

    const result = await res.json()

    setSourceCoords({
      lng: result?.features[0].geometry.coordinates[0],
      lat: result?.features[0].geometry.coordinates[1]
    })

    console.log(sourceCoords);
    
    
  }

  const onDestinationAddressClick = async(item:any) => {
    setDestination(item.full_address)
    setDestinationChange(false)
    setAddressList([])

    const res = await fetch(RETRIEVE_URL + item.mapbox_id + "?session_token=" + SESSION_TOKEN + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_TOKEN)

    const result = await res.json()

    setDestinationCoords({
      lng: result?.features[0].geometry.coordinates[0],
      lat: result?.features[0].geometry.coordinates[1],
    })

    console.log(result);
    
  }
  

  return (
    <div className='mt-5'>
        <div className='relative'>
          <label className='text-gray-400'>Where from?</label>
            <input
              value={source}
              onChange={
                (e) => {
                  setSource(e.target.value)
                  setSourceChange(true)
              }}
              type='text'
              className='bg-white
              p-1
              border-[1px]
              w-full
              rounded-md
              outline-none
              focus:border-yellow-300
              '
            />

            {addressList?.suggestions && sourceChange ? (
              <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                {addressList.suggestions.map(( item:any, i:number ) => (
                  <h2
                    key={item.full_address}
                    onClick={() => onSourceAddressClick(item)}
                    className='p-3 hover:bg-gray-100 cursor-pointer'
                  >
                    {item.full_address}
                  </h2>
                ))}
              </div>
            ) : null}
        </div>
        <div className='mt-3'>
          <label className='text-gray-400'>Where to?</label>
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                setDestinationChange(true)
              }}
              type='text'
              autoComplete='address-level2'
              className='bg-white
              p-1
              border-[1px]
              w-full
              rounded-md
              outline-none
              focus:border-yellow-300
              '
              />
              {addressList.suggestions && destinationChange ? (
                <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                  {addressList.suggestions.map(( item:any, i:number) => (
                    <h2
                      key={item.full_address}
                      onClick={() => onDestinationAddressClick(item)}
                      className='p-3 hover:bg-gray-100 cursor-pointer'
                    >
                      {item.full_address}
                    </h2>
                  ))}
                </div>
              ) : null}
        </div>
    </div>
  )
}

export default AutoCompleteAddress