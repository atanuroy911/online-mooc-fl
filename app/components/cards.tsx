import React from 'react';

const Cards = () => {
  return (
    <div className="flex justify-center">
      {/* Column 1 */}
      <div className="w-1/3 p-4 relative">
        <img src="/image1.jpg" alt="Image 1" className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute inset-x-0 bottom-0">
          <p className="text-6xl font-bold text-center text-orange-400 relative z-10">
            1200+ Students
          </p>
          <div className="absolute inset-0 rounded-lg"></div>
          <p className="text-6xl font-bold text-center text-white absolute inset-x-0 bottom-0 py-2 px-4 z-20">
            1200+ Students
          </p>
        </div>
      </div>
      {/* Column 2 */}
      <div className="w-1/3 p-4 relative">
        <img src="/image2.jpg" alt="Image 2" className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute inset-x-0 bottom-0">
          <p className="text-6xl font-bold text-center text-orange-400 relative z-10">
            500+ <br></br> Courses
          </p>
          <div className="absolute inset-0 rounded-lg"></div>
          <p className="text-6xl font-bold text-center text-white absolute inset-x-0 bottom-0 py-2 px-4 z-20">
            500+ Courses
          </p>
        </div>
      </div>
      {/* Column 3 */}
      <div className="w-1/3 p-4 relative">
        <img src="/image3.jpg" alt="Image 3" className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute inset-x-0 bottom-0">
          <p className="text-6xl font-bold text-center text-orange-400 relative z-10">
            30+ <br></br> Teachers
          </p>
          <div className="absolute inset-0 rounded-lg"></div>
          <p className="text-6xl font-bold text-center text-white absolute inset-x-0 bottom-0 py-2 px-4 z-20">
            30+ Teachers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
