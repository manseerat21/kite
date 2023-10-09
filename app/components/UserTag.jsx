"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

function UserTag({user}) {
  return (
    <div className=''>
       {user?
       <div className='flex gap-3 
       items-center'>
       <div>
        <h2 className='text-[11px] px-3 py-3 font-medium text-yellow-50'>{user.name}</h2>
        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag