

import { Navigate,Link, useNavigate } from 'react-router-dom';

function Navbottom(props:any) {
    const Title=props.Title
    const subTitle=props. subTitle
   
  return (
    <>
    <div className='pt-16' >
    <div className='bg-gradient-to-r  text-center z-1  shadow-xl  flex gap-4   from-green-300  to-teal-600 via-teal-400 sm:ws md:w-screen h-72 p-5 ' >
      <div className='  py-10 px-20  sm:w-1/3 flex-auto h-60'>
      <img src="/page-banner-shape-1.svg" alt="cour" />
      </div>
      <div className='flex  ml-12'>
      <div className=' flex-auto mt-10  flex-col justify-center sm:w-1/2 text-center h-60'>
          <h1 className='text-7xl font-semibold text-white '>
           {Title}
          </h1>
          <br />
          <h2 className="text-2xl  text-white">{subTitle}</h2>
          <br />
          {Title != 'Authentication' && (
          <div className='text-center'>

        </div>
      )}
          
      </div>
      
      </div>
      
      <div className='  ml-48  flex flex-col justify-end px-24 py-14    flex-auto h-60' >
      <img className='w-32   shape-1 animate-off-on'src="/business-3d-stack-of-different-books.png" alt="cour" />
      </div>
    </div>
    </div>
    </>
  )
        
}

export default Navbottom