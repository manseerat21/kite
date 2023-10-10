"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import app from '../Shared/firebaseConfig';
import UserInfo from './../components/UserInfo';
import { collection, getDocs, doc, getFirestore, query, where, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PinList from '../components/Pins/PinList';
import Header from '../components/Header';

function Profile() {
  const { data: session } = useSession();
  console.log(session);
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState(null);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    if (session?.user) {
      saveUserInfo(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (userInfo) {
      getUserPins(userInfo.email);
    }
  }, [userInfo]);

  const saveUserInfo = async (email) => {
    console.log(session);
    const userDocRef = doc(db, 'user', email);
    await setDoc(userDocRef, {
      userName: session.user.name,
      email: session.user.email,
      userImage: session.user.image,
    });
    setUserInfo({
      userName: session.user.name,
      email: session.user.email,
      userImage: session.user.image,
    });
  };
  console.log(session);

  const getUserPins = async (email) => {
    console.log(session);
    setListOfPins([]);
    const q = query(collection(db, 'kite-post'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Profile;
