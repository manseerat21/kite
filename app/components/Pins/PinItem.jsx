import Image from 'next/image'
import React from 'react'
import UserTag from '../UserTag'
import { useRouter } from 'next/navigation'

function PinItem({pin}) {
  const router=useRouter();
    const user={
        name:pin?.userName,
        image:pin?.userImage,

    }
  return (
    <div className='flex flex-col overflow-auto'>
      <div className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-gray-100 before:opacity-20 cursor-pointer" onClick={() => router.push("/pin/" + pin.id)}>
        <Image src={pin.image} alt={pin.title} width={500} height={500} className='rounded-3xl cursor-pointer relative z-0' />
        <div className="user-tag-overlay">
          <UserTag user={user} />
        </div>
      </div>
      <div>
      <h2 className='font-bold text-[12px] mt-1 line-clamp-2'>{pin.title}</h2>
      </div>
    </div>
  )
}

export default PinItem