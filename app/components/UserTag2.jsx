"use client"
import React from 'react'

function UserTag2({user}) {
  return (
    <div className=''>
       {user?
       <div className='flex gap-3 
       items-center'>
       <div>
        <h2 className='text-[15px] px-3 my-1 py-1 font-medium rounded-full text-neutral-900'>{user.name}</h2>
        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag2