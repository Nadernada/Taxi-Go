'use client'

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Image from 'next/image'

const Navbar = () => {

  const router = useRouter()

  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm">
      <div
        onClick={() => router.push('/')}
        className="flex gap-10 items-center"
      >
        <Image
          src='/logo.png'
          alt='logo'
          width={120}
          height={60}
        />
        <div className='hidden md:flex gap-6'>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">Home</h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">History</h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">Help</h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default Navbar