'use client'

import { DirectionDataContext } from "@/context/DirectionDataContext"
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext"
import CarsList from "@/data/CarsList"

import Image from 'next/image'
import { useContext, useState } from "react"

const Cars = () => {

  const [selectedCar, setSelectedCar] = useState(0)
  const { directionData, setDirectionData } = useContext(DirectionDataContext)
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)

  const getCost = (item:any) => {
    return (item * directionData.routes[0].distance * 0.000621371).toFixed(2)
  }

  console.log(carAmount);


  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="
            grid
            grid-col-3
            md:grid-cols-2
            lg-grid-cols-3
            m-1
            p-2
          ">
        {CarsList.map((item, i) => (
          <div
              key={i}
              onClick={() => {
                setSelectedCar(i)
                setCarAmount(getCost(item.charges))
              }}
              className={`
                m-2
                p-2
                border-[2px]
                rounded-md
                hover:border-yellow-400
                cursor-pointer
                ${selectedCar === i ? 'border-yellow-400' : ''}`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={85}
              height={100}
            />
            <h2 className="text-[12px]">
              {item.name}
              {directionData.routes ?  (
              <span className="float-right font-medium">
                {getCost(item.charges)} $
              </span>
              ): (
                <span className="float-right font-medium">
                  {item.charges} $
                </span>
                ) }
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cars