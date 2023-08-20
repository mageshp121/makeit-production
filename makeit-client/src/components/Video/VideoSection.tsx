import React, { useEffect } from 'react'

function VideoSection({lessonUrl}:any) {
    useEffect(()=>{},[lessonUrl]);
  return (
    <div className="h-[28rem] mb-3 shadow-xl rounded-md">
    <video
className="w-full  max-w-full border border-gray-200 h-[28rem] rounded-lg dark:border-gray-700"
controls
>
{ 
    lessonUrl != null && <source src={lessonUrl}
    onError={(e:any) => {
     console.error("Error loading video:", e.target.error);
   }} />
}
Your browser does not support the video tag.
  </video>
  <span></span>
    </div>
  )
}

export default VideoSection