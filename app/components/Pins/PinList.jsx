import React from 'react'
import PinItem from './PinItem'

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function PinList({ listOfPins }) {
  // Shuffle the listOfPins array before rendering
  const shuffledPins = shuffleArray(listOfPins);

  return (
    <div className='px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 2xl:columns-6 space-y-3 mx-auto'>
      {shuffledPins.map((item, index) => (
        <div key={index}>
          <PinItem pin={item} />
        </div>
      ))}
    </div>
  )
}

export default PinList
