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
        userImage: session.user.image,
      });
    }
  };

  const onCreateClick = () => {
    if (session) {
      router.push('/upload');
    } else {
      signIn();
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
  <div className='ml-auto'>
    {session?.user ? (
      <Image
      // @ts-ignore
        src={session.user.image}
        // @ts-ignore
        onClick={() => router.push('/account')}
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