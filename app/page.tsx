"use client"
import { DocumentData, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';

export default function Home() {
  const db=getFirestore(app);
  const [listOfPins,setListOfPins]=useState([]);
  
  useEffect(()=>{
    getAllPins();
  },[])
  const getAllPins = async () => {
    setListOfPins([]); // Clear the list before fetching new data
    const q = query(collection(db, 'kite-post'));
    const pinsData: ((prevState: never[]) => never[]) | DocumentData[] = []; // Create a temporary array to accumulate data
  
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        pinsData.push(doc.data()); // Accumulate data in the temporary array
      });
  
      // @ts-ignore
      setListOfPins(pinsData); // Set the state once after the loop
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  };
  return (
    <>
    <div className='p-3'>
      <PinList listOfPins={listOfPins} />
      </div>
    </>
  )
}