import React from 'react'

function SectionDown4() {
  return (
    <div className="h-[44rem] flex flex-col p-3 gap-4 shadow-lg bg-green-50">
      <div className=' flex p-2 gap-3 flex-row h-[13rem]'>
        <div className='w-[18%] pt-5 ml-14 pl-20 shape-1 animate-off-on '>
        <img className='h-36' src="/footer-shape-1.png" alt="" />
        </div>
        <div className=' w-[65%]'>
       <h1  className=' mt-5 text-2xl text-teal-400 pl-80'>our features</h1>
       <br />
       <h1 className='pl-12 text-5xl'>Why You Should Choose Makeit</h1>
       </div>
      </div>
      <div className='bg-white shadow-2xl rounded-xl  p-5  h-[30rem]'>
        <div className=' ml-3 mr-3 mt-2 gap-4 p-6 grid  grid-cols-4 h-[25rem]'>
            <div className="bg-[#f3f2f0] shadow-xl border border-slate-200 rounded-lg  flex  pl-10 pr-10 gap-4 flex-col">
                <div className=" h-40 w-56 ml-2 p-10  " >
                    <img src="/feature-1.svg" alt="" />
                </div> 
                <h1 className='text-xl text-center flex-w'>Expert-Led Video Courses</h1>
                <h1 className=' text-center '>Instructors from around the world teach millions of students on makeit through video.</h1>
            </div>
            <div className="bg-[#f3f2f0] shadow-xl flex border border-slate-200 rounded-lg pl-10 pr-10 gap-4 flex-col">
                <div className=" h-40 w-56 ml-2 p-10  " >
                    <img src="/feature-2.svg" alt="" />
                </div> 
                <h1 className='text-xl text-center flex-w'>Expert-Led Video Courses</h1>
                <h1 className=' text-center '>Instructors from around the world teach millions of students on makeit through video.</h1>
            </div>
            <div className="bg-[#f3f2f0] shadow-xl flex border border-slate-200 rounded-lg  pl-10 pr-10 gap-4 flex-col">
                <div className=" h-40 w-56 ml-2 p-10  " >
                    <img src="/feature-1.svg" alt="" />
                </div> 
                <h1 className='text-xl text-center flex-w'>Expert-Led Video Courses</h1>
                <h1 className=' text-center '>Instructors from around the world teach millions of students on makeit through video.</h1>
            </div>
            <div className="bg-[#f3f2f0] shadow-xl flex   pl-10 pr-10 gap-4 flex-col">
                <div className=" h-40 w-56 ml-2 p-10  " >
                    <img src="/feature-4.svg" alt="" />
                </div> 
                <h1 className='text-xl text-center flex-w'>Expert-Led Video Courses</h1>
                <h1 className=' text-center '>Instructors from around the world teach millions of students on makeit through video.</h1>
            </div>

            


        </div>
      </div>
    </div>
  )
}

export default SectionDown4