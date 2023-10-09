import React from 'react'
import UserTag from '../UserTag'

function PinInfo({pinDetail}) {
  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }
  return (
    <div>
      <h2 className='text-[30px] font-bold'>{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2>{pinDetail.desc}</h2>
      <button className='p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all'
      onClick={()=>window.open(`https://${pinDetail.link}`)}>Open Url</button>
    </div>
  )
}

export default PinInfo