
"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch,HiBell,HiChat } from "react-icons/hi";
import app from '../Shared/firebaseConfig'
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router=useRouter();
  const db = getFirestore(app);

  useEffect(()=>{
    saveUserInfo();
  },[session])

  const saveUserInfo=async()=>{
    if(session?.user)
    {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

  const onCreateClick=()=>{
    if(session)
    {
      router.push('/upload')
    }
    else{
      signIn()
    }
  }

  
  return (
    <div className='flex gap-3 md:gap-2 p-6'>
  <Image
    src='/logo.svg'
    alt='logo'
    width={60}
    height={60}
    onClick={() => router.push('/')}
    className='cursor-pointer'
  />
  <button
    className='bg-black text-white p-3 px-6 rounded-full text-[25px] hidden md:block'
    onClick={() => router.push('/')}
  >
    Home
  </button>
  <button
    className='font-semibold p-3 px-6 rounded-full text-[25px]'
    onClick={() => onCreateClick()}
  >
    Create
  </button>
  <div className='ml-auto'> {/* Use ml-auto to push content to the far right */}
    {session?.user ? (
      <Image
        src={session.user.image}
        onClick={() => router.push('/' + session.user.email)}
        alt='user-image'
        width={60}
        height={60}
        className='rounded-full cursor-pointer'
      />
    ) : (
      <button
        className='font-semibold p-2 px-4 rounded-full'
        onClick={() => signIn()}
      >
        Login
      </button>
    )}
  </div>
</div>

  )
}

export default Header