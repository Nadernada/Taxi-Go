import CardsList from "@/data/CardsList"
import Image from 'next/image'
import { useState } from "react"

const Cards = () => {

  const [selectedPay, setSelectedPay] = useState(0)

  return (
    <div>
      <h2 className='text-[14px] font-medium'>Payment Method</h2>
      <div className="
            grid 
            grid-cols-5
            md:grid-cols-4
            lg:grid-cols-5
            mt-2 
            pl-2"
      >
        {CardsList.map((item, i) => (
          <div
            key={i + item.name}
            onClick={() => setSelectedPay(i)}
            className={`
                  w-[50px] 
                  border-[1px]
                  mb-1 
                  flex 
                  items-center 
                  justify-center 
                  rounded-md 
                  cursor-pointer
                  hover:scale-110
                  hover:border-yellow-400
                  ${selectedPay === i ? 'border-yellow-400' : ''}
                  transition-all`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={30}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards