"use client"
import React, { useEffect, useState } from 'react'
import PinImage from './../../components/PinDetail/PinImage'
import PinInfo from './../../components/PinDetail/PinInfo'
import { doc, getDoc, getFirestore, collection, getDocs, query } from 'firebase/firestore'
import app from '@/app/Shared/firebaseConfig'
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import PinTitle from './../../components/PinDetail/PinTitle'
import PinList from '@/app/components/Pins/PinList';

function PinDetail({params}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [pinDetail,setPinDetail]=useState([]);
  const [listOfPins,setListOfPins]=useState([]);
  useEffect(()=>{
    getPinDetail();
    getAllPins();
  },[])

 const getPinDetail=async()=>{
      const docRef = doc(db, 'kite-post',params.pinId );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setPinDetail(docSnap.data())
      } else {
       
        console.log("No such document!");
      }
  }

  const getAllPins = async () => {
    setListOfPins([]);
    const q = query(collection(db, 'kite-post'));
    const pinsData = [];
   
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        pinsData.push(doc.data()); // Accumulate data in the temporary array
      });
  
      
      setListOfPins(pinsData);
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  }
  return (
    <>
   {pinDetail? 
   <div className=' bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
       <div className='flex flex-row items-center'>
          <HiArrowSmallLeft 
            className='
              text-[60px] 
              font-bold
              cursor-pointer 
              hover:bg-gray-200 
              rounded-full p-2 
              '
            onClick={()=>router.back()}
          />
          <PinTitle pinDetail={pinDetail}/>
       </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 ' 
      >
        <PinImage pinDetail={pinDetail} />
        <div>
        <PinInfo pinDetail={pinDetail}/>
        </div>
        </div>
    </div>
    :null}
    <div className='p-3 pt-6'>
    <PinList listOfPins={listOfPins} />
    </div>
    </>
    
  )
}

export default PinDetail