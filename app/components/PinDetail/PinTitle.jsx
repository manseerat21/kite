import React from 'react';

function PinTitle({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const openLink = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://${pinDetail.link}`);
    }
  };

  return (
    <div>
      <h2 className="text-[20px] mr-auto font-bold">{pinDetail.title}</h2>
    </div>
  );
}

export default PinTitle;
