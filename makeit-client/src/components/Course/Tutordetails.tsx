import React, { useEffect, useState } from "react";
import { getuserBYId } from "../../utils/api/methods/get";

function Tutordetails(props: any) {
  console.log(props, "porprprr");
  const [tutorData, setTutorData] = useState({}) as any;
  const fetData = async (id: any) => {
    console.log(id, "uiduddud");
    const data: any = await getuserBYId(id);
    setTutorData(data.data);
  };
  useEffect(() => {
    const id = props.data;
    fetData(id);
  }, []);
  return (
    <div className=" w-[75%] flex items-center  gap-x-4">
      <img
        src="/photo-1633332755192-727a05c4013d.jpeg"
        alt=""
        className="h-10 w-10 rounded-full bg-gray-50"
      />
      <div className="text-sm leading-6">
        <p className="font-semibold text-gray-900">{tutorData?.firstName}</p>
        <p className="text-gray-600">instructor</p>
      </div>
    </div>
  );
}

export default Tutordetails;
