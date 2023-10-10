import React from 'react';
import UserTag2 from '../UserTag2';
import { IoIosLink } from 'react-icons/io';
import { useRouter } from 'next/navigation';

function PinInfo({ pinDetail }) {
  const router = useRouter();
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const openLink = () => {
    if (typeof window !== 'undefined') {
      if (pinDetail.link === 'kite-world.vercel.app' || pinDetail.link === 'www.kite-world.vercel.app') {
        router.push('/');
      } else {
        let linkToOpen = pinDetail.link;
        if (!linkToOpen.startsWith('http://') && !linkToOpen.startsWith('https://')) {
          linkToOpen = `http://${linkToOpen}`;
        }
        window.open(linkToOpen, '_blank');
      }
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
