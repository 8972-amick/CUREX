import React from 'react'
import Bar from '../Components/HomePage'

const home = () => {
  return (
    <>
   
  {/* HERO SECTION */}
<div className="relative w-full h-[70vh] overflow-hidden flex bg-gradient-to-r from-green-700 to-green-500">

  {/* LEFT GREEN DIAGONAL SHAPE */}
  <div
    className="relative w-[40%] h-full text-white flex items-center px-16"
    style={{
      clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)", 
    }}
  >
    {/* TEXT CONTENT */}
    <div className="max-w-lg z-20">
      <p className="text-5xl font-bold ">WELCOME</p>
      <h1 className="text-5xl font-extrabold mt-2">TO THE CUREX</h1>
      <h1 className="mt-2 text-5xl font-extrabold">HOMEPAGE</h1>
      <p className="mt-4 text-white/90">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
    </div>
  </div>

  {/* RIGHT DIAGONAL IMAGE AREA */}
  <div
    className="relative w-[60%] h-full overflow-hidden"
    style={{
      clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)", 
    }}
  >
    <img
      src="/src/assets/rescue-team-navigating-flooded-residential-260nw-2511305493.jpg"
      alt="hero"
      className="w-full h-full object-cover"
    />
  </div>

</div>


  {/* WE CAN HELP SECTION */}
  <div className="text-center mt-16 px-4">
    <h2 className="text-3xl font-bold text-gray-800">
      WE CAN <span className="text-green-700">HELP</span>
    </h2>
    <p>Where every problems meet solutions</p>
  </div>

  {/* CARDS SECTION */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pr-20 pl-20 pb-20 pt-0 mt-10 ">

    <div className="bg-white shadow-lg rounded-xl border-t-4 border-green-500 p-6 h-[50vh]">
  <h3 className="text-xl font-bold text-green-700">PLANNER</h3>
  <p className="mt-3 text-gray-600">Lorem ipsum dolor sit amet.</p>
</div>


    <div className="bg-white shadow-lg rounded-xl  border-t-4 border-green-500 p-6">
      <h3 className="text-xl font-bold text-green-700">COURSE</h3>
      <p className="mt-3 text-gray-600">Lorem ipsum dolor sit amet.</p>
      
    </div>

    <div className="bg-white shadow-lg rounded-xl  border-t-4 border-green-500 p-6">
      <h3 className="text-xl font-bold text-green-700">RADIO</h3>
      <p className="mt-3 text-gray-600">Lorem ipsum dolor sit amet.</p>
     
    </div>

  </div>

    </>
  
    
  )
}

export default home