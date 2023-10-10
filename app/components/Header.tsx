"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import app from '../Shared/firebaseConfig';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, []);

  const saveUserInfo = async () => {
    if (session?.user) {
      // @ts-ignore
      const userDocRef = doc(db, "user", session.user.email)      
      await setDoc(userDocRef, {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });    }
  };  

  const onCreateClick = () => {
    if (session) {
      router.push('/upload');
    } else {
      signIn();
    }
  }

  return (
    <div className='flex gap-3 md:gap-2 sm:p-3 md:p-4 p-2 md:h-full h-12.5'>
  <Image
    src='/logo.svg'
    alt='logo'
    width={60}
    height={60}
    onClick={() => router.push('/')}
    className='cursor-pointer'
  />
  <button
    className='bg-black text-white p-3 px-6 rounded-full text-[18px] hidden sm:block'
    onClick={() => router.push('/')}
  >
    Home
  </button>
  <button
    className='font-semibold p-3 px-6 rounded-full text-[18px] hover:bg-neutral-200 hidden sm:block'
    onClick={() => onCreateClick()}
  >
    Create
  </button>
  <div className="flex sm:hidden px-2 items-center ml-auto">
                <button
                  onClick={() => onCreateClick()}
                  className="
                    text-[30px]
                    text-[#262626] 
                    cursor-pointer 
                    hover:text-black
                    transition
                    hover:scale-110
                  "
                >&#43;</button>
              </div>
  {session?.user ? (
      <Image
      // @ts-ignore
        src={session.user.image}
        // @ts-ignore
        onClick={() => router.push('/'+session.user.email)}
        alt='user-image'
        width={60}
        height={60}
        className='p-1 rounded-full cursor-pointer sm:ml-auto'
      />
    ) : (
      <button
        className='font-semibold p-3 px-4 rounded-full text-[18px] hover:bg-neutral-200 sm:ml-auto'
        onClick={() => signIn()}
      >
        Login
      </button>
    )}</div>
  )
}

export default Header