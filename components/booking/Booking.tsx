'use client'

import { useContext} from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cards from './Cards'
import Cars from './Cars'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

const Booking = () => {
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)

  const router = useRouter()

  return (
    <div className='p-6'>
      <h2 className='text-[24px] font-semibold'>Booking</h2>
      <div
        className='border-[1px] p-5 rounded-md h-fit'
      >
        <AutoCompleteAddress />
        <Cars/>
        <Cards />
        <button
          onClick={() => router.push('/payment')}
          className={`w-full font-medium  p-1 rounded-md mt-6 ${!carAmount ? 'bg-gray-200' : 'bg-yellow-400'}`}
          disabled={!carAmount}
        >
          Book
        </button>
      </div>
    </div>
  )
}

export default Booking