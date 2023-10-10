import Image from 'next/image';
import React from 'react'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function UserInfo({ userInfo }) {
    const router = useRouter();
    const { data: session } = useSession();

    const onLogoutClick = async () => {
        await signOut();
        router.push("/");
    }

    const shareURL = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Share this URL',
                url: window.location.href // Use the current URL
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            alert("Web Share API is not supported in this browser.");
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <Image src={userInfo.userImage}
                alt='userImage'
                width={100}
                height={100}
                className='rounded-full' />

            <h2 className='text-[30px]
        font-semibold'>{userInfo.userName}</h2>
            <h2 className='text-gray-400'>{userInfo.email}</h2>
            <div className='flex gap-4 mb-6'>
                <button
                    className='bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full'
                    onClick={() => shareURL()}>Share</button>
                {session?.user.email === userInfo.email ? <button
                    className='bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full'
                    onClick={() => onLogoutClick()}>Logout</button> : null}
            </div>
        </div>
    )
}

export default UserInfo;
