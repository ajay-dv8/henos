import React from 'react'

export default function WhyUs() {
  return (
    <div className='w-full h-screen'>
      <img src={"/images/wu.webp"}/>  

      {/* center text : display these texts in the middle of the image, the will be displayed one after the other in a scroll animation  */}
      <div className="">
        <div className="w-full">
          <p className="max-w-4xl text-center">Count on dependable LPG supply and responsive service to keep your home or business running without unnecessary interruptions.</p>
        </div>

        <div className="w-full">
          <p className="max-w-4xl text-center">From cylinder handling to delivery, we put safety and care at the centre of every step, giving you greater confidence in your energy supply.</p>
        </div>

        <div className="w-full">
          <p className="max-w-4xl text-center">Get the LPG you need without the hassle. With convenient delivery and cylinder exchange services, getting your next refill is easier.</p>
        </div>
      </div>
    </div>
  )
}
