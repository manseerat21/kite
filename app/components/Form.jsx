"use client"
import React,{useState} from 'react'
import UploadImage from './UploadImage'
import { useSession} from "next-auth/react"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import UserTag from './UserTag'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

function Form() {
    const {data:session}=useSession();
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [link, setLink] = useState("kite-world.vercel.app"); 
    const [file,setFile]=useState();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const storage=getStorage(app)
    const db=getFirestore(app);
    const postId=Date.now().toString();
    const onSave=()=>{
       setLoading(true)
       uploadFile();

    }

    const uploadFile=()=>{
        const storageRef=ref(storage,'kite/'+file.name);
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log("File Uploaded")
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(url)=>{
                const postData={
                    title: title || null,
                    desc: desc || null,
                    link: link || "kite-world.vercel.app",
                    image:url,
                    userName:session.user.name,
                    email:session.user.email,
                    userImage:session.user.image,
                    id:postId
                }

                await setDoc(doc(db,'kite-post',postId),
                postData).then(resp=>{
                    console.log("Saved")
                    setLoading(true);
                    router.push('/'+session.user.email)
                })
                
            })
        })
    }

   
   
  return (
    <div className='bg-white flex-col p-8 rounded-2xl flex-grow'>
  <div className='flex justify-end mb-6'>
    <button onClick={() => onSave()} style={{ width: '90px' }} className='bg-[#BFD7EA] p-2 text-neutral-800 font-semibold px-3 rounded-lg hidden lg:block'>
      {loading ? (
        <div className='text-loading-spinner'></div>
      ) : (
        <span>Post</span>
      )}
    </button>
  </div>
  <div className='grid grid-cols-1 w-fill lg:grid-cols-3 gap-y-7 lg:gap-x-10 lg:gap-y-0'>

    <UploadImage setFile={(file)=>setFile(file)} />
          
    <div className="col-span-2 flex flex-col">
      <div className='w-full flex flex-col justify-between h-full'>
        <div>
          <input
            type="text"
            placeholder='add your title'
            onChange={(e) => setTitle(e.target.value)}
            className='text-[25px] outline-none font-bold w-full
            border-b-[2px] border-gray-400 placeholder-gray-400'
          />
          <h2 className='text-[12px] mb-8 w-full  text-gray-400'>the first 40 Charaters are 
            what usually show up in feeds
          </h2>
          <UserTag user={session?.user} />
          <textarea
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            placeholder='tell everyone what your pin is about' 
            className='outline-none flex flex-grow w-full lg:mt-8 mb-14 px-2 text-[14px]
            border-b-[2px] border-gray-400 placeholder-gray-400'
          />
        </div>
        <div className='pb-14'>
          <input
            type="text"
            onChange={(e) => setLink(e.target.value)}
            placeholder='add a destination link' 
            className='outline-none px-2 w-full flex
            border-b-[2px] border-gray-400 placeholder-gray-400 mt-auto'
          />
        </div>
      </div>
    </div>
  </div>
  <div className='flex justify-end'>
    <button onClick={() => onSave()} style={{ width: '90px' }} className='bg-[#BFD7EA] p-2 text-neutral-800 font-semibold px-3 rounded-lg lg:hidden'>
      {loading ? (
        <div className='text-loading-spinner'></div>
      ) : (
        <span>Post</span>
      )}
    </button>
  </div>
</div>


  )
}

export default Form