import Image from 'next/image';
import React, { useState } from 'react';
import UserTag from '../UserTag';
import Modal from 'react-modal';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

function PinItem({ pin }) {
  const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
    id: pin?.id
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(pin.image); // Replace 'pin.image' with your image URL
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = pin.id+'.jpeg';
      console.log(pin.id+'.jpeg')
      document.body.appendChild(a);
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
      closeModal();
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };
  

  const handleShareClick = () => {
    if (navigator.share) {
      // Check if the navigator.share API is supported by the browser
      navigator.share({
        title: 'Share this pin', // Optional title
        text: 'Check out this pin', // Optional description
        url: `https://kite-world.vercel.app/pin/${pin.id}`, // The shareable link
      })
        .then(() => {
          console.log('Shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      // Fallback for browsers that do not support the share API
      const shareableLink = `https://kite-world.vercel.app/pin/${pin.id}`;
      console.log("Share this link:", shareableLink);
    }
  
    // Close the modal
    closeModal();
  };
  

  const modalStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '250px',
      maxWidth: '300px',
      padding: '20px',
      height: '230px',
      border: 'none',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      
    },
  };
  
  

  return (
    <div className="flex flex-col overflow-auto">
      <div onClick={()=>router.push("/pin/"+pin.id)} className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-gray-100 before:opacity-20 cursor-pointer">
        <Image src={pin.image} alt={pin.title} width={500} height={500} className="rounded-3xl cursor-pointer relative z-0" />
        <div className="user-tag-overlay">
          <UserTag user={user} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-0.5">
        <h2 className="font-bold text-[12px] line-clamp-2">{pin.title}</h2>
        <button onClick={openModal} className="hover:text-gray-600 text-gray-800">
          <BsThreeDots size={24} />
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h2 className="text-xl font-bold mb-4">Options</h2>
          <button onClick={handleDownloadClick} className="hover:text-gray-600 text-gray-800 w-full mb-1 pt-2.5 border-b border-gray-300 pb-3">
            <a>Download</a>
          </button>
          <button onClick={handleShareClick} className="hover:text-gray-600 text-gray-800 w-full mb-1 pt-2 border-b border-gray-300 pb-3">
            Share
          </button>
          <button onClick={closeModal} className="hover:text-gray-600 text-gray-800 w-full mb-1 pt-2 pb-3">
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default PinItem;
