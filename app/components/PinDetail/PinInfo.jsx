import React from 'react';
import UserTag2 from '../UserTag2';
import { IoIosLink } from 'react-icons/io'

function PinInfo({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const openLink = () => {
    if (typeof window !== 'undefined') {
      window.open(`${pinDetail.link}`);
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-grow'>    
    <h2 className='pt-3 pl-2'>{pinDetail.desc}</h2>
    <UserTag2 user={user} />
    </div>
    <div className='ml-2'>
    <button
      className="p-2 text-[15px] mt-3 px-4 flex flex-row hover:scale-110 transition-all bg-[#e9e9e9] rounded-full"
      onClick={openLink}
    >
      <IoIosLink className='mt-1 mr-1' />
         visit
    </button>
    </div>
  </div>
  );
}

export default PinInfo;
