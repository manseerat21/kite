import React, { useState, useEffect } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';

function UploadImage({ setFile }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedFile) {
      // This code will only run in the browser environment
      const imageUrl = window.URL.createObjectURL(selectedFile);
      // You can use imageUrl as needed
    }
  }, [selectedFile]);

  return (
    <div className="h-[450px] lg:h-[400px] bg-[#e9e9e9] rounded-lg">
      <label className="m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600">
        {!selectedFile ? (
          <div className="flex items-center flex-col">
            <HiArrowUpCircle className="text-[22px]" />
            <h2 className="font-semibold">Click to Upload</h2>
          </div>
        ) : null}
        {selectedFile ? (
          <img
            src={
              typeof window !== 'undefined'
                ? window.URL.createObjectURL(selectedFile)
                : ''
            }
            alt="selected-image"
            width={500}
            height={800}
            className="object-contain h-[90%]"
          />
        ) : null}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}

export default UploadImage;
