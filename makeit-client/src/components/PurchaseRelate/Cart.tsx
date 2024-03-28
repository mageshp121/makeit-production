import { useEffect, useState } from "react";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { Cart_Get_Api, Remove_From_Cart_Api } from "../../utils/api/endPoints/commen";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCourses } from "../../utils/api/methods/get";
import { useDispatch } from "react-redux";
import { addData } from "../../utils/ReduxStore/slices/cartSlice";
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";
import { UseCommenError } from "../../utils/toastify/toasty";

const Cart = () => {
  const params = useParams();
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
    });
  const [update,setUpdate] = useState(false)
  console.log(params, "param");
  const [cartData, setCartData] = useState([]) as any;
  const axiosPrivet = useAxiosePrivate();
  const [course, setCourse] = useState([]) as any;
  const [matched, setMatched] = useState() as any;
  const [totalamount,setTotlaEmount] = useState() as any
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const getdata = async () => {
      const response = await axiosPrivet.get(Cart_Get_Api + params.id);
      console.log(response.data, "datatatatadadd");
      setCartData(response.data.cartProductId);
    };
    const getcourse = async () => {
      const response: any = await getAllCourses();
      console.log(...response.data, "dgdjpppppp");
      setCourse(response.data);
    };
    getdata();
    getcourse();
  }, [update]);

  
  useEffect(() => {
    if (course?.length > 0 && cartData?.length > 0) {
      const matchedCourses = course?.filter((data: any) =>
        cartData?.includes(data._id)
      );
      console.log(matchedCourses, "matata");
      setMatched(matchedCourses);
     // Calculate the sum of course prices
     const totalPrice = matchedCourses.reduce((total:any, course:any) => total + course.CoursePrice, 0)
     console.log(totalPrice); // The sum of prices
     setTotlaEmount(totalPrice)

    }
  }, [course, cartData]);

  const addDataIntoRedux = () =>{
    console.log("ok adaedd");
    
    const data = {
      courses:matched,
      total:totalamount
    }
    dispatch(addData(data));
    navigate("/cart/payment");

  }
  const handleRemoveFromCart = async (courseId:string) => {
    console.log(courseId, 'dddddddddddddddddd');
  
    const requestData = {
      userId: userdata._id,
      cartProductId: courseId,
    };
  
    try {
      const response = await axiosPrivet.patch(Remove_From_Cart_Api, requestData);
      console.log(response, 'respoonseeeeeeeeeeee');
      if (response.data.updated) {
        setUpdate(true);
        return 
      }
    } catch (error) {
      return UseCommenError("Something went wrong");
    }
  }
  


  return (
    <>
      <div className="ml-28 mr-28 mt-8 p-8 bg-white rounded-md h-[45rem]">
        <div className="ml-7 pt-5">
          <span className="underline text-3xl font-medium underline-offset-8 decoration-2 decoration-teal-500 dark:decoration-blue-600">
            You'r Cart
          </span>
        </div>
        <div className="h-[36rem] p-5 pt-16 grid grid-cols-2 overflow-hidden gap-7">
          <div className="bg-[#f3f2f0] shadow-md border border-gray-100 p-5 gap-8 rounded-md overflow-auto h-[31.5rem] w-[50rem] ">
            <div className="pt-5 ">
  
     {(matched?.map((data: any, index: any) => {
                  return (
                    <article
                      key={index}
                      className="rounded-xl  shadow-xl mb-10 border-2 border-gray-100 bg-white"
                    >
                      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                        <a href="#" className="block shrink-0">
                          <img
                            alt="Speaker"
                            src="/icvgops1gqcosgv3dxde.jpg"
                            className="h-14 w-14 rounded-lg hover:scale-105 object-cover"
                          />
                        </a>
                        <div>
                          <h3 className="font-medium sm:text-lg">
                            <a href="#" className="hover:underline">
                              {data?.WorkingTitle}
                            </a>
                          </h3>
                          <p className="line-clamp-2 text-sm text-gray-700">
                           {data?.ShortDescription}
                          </p>
                          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <div className="flex items-center gap-1 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                />
                              </svg>
                              {/* <p className="text-xs">14 comments</p> */}
                            </div>
                            <span className="hidden sm:block" aria-hidden="true">
                              ·
                            </span>
                            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                              Created by
                              <a
                                href="#"
                                className="font-medium  ml-2 underline  hover:text-gray-700"
                              >
                                Magesh
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
  
                      <div className="flex gap-10 mb-4 justify-end mr-12">
                        <div className="mr-[25rem]">
                          <p className="text-xl font-bold text-teal-600">₹ {data.CoursePrice}</p>
                        </div>
                        <span onClick={()=>handleRemoveFromCart(data._id)} className="text-xl  text-red-500 underline-offset-2 cursor-pointer underline font-medium sm:text-[px]">
                          Remove
                        </span>
                      </div>
                    </article>
                  );
                }))}
              
            </div>
          </div>
          <div className="bg-[#f3f2f0] ml-60 shadow-md border p-2 border-gray-100 rounded-md h-[17rem] w-80">
            <div className=" w-full   pt-4 ml-4 mb-3  h-12">
              <p className="text-xl font-medium">Discount Code</p>
            </div>
            {/* <div className=" flex pl-2 gap-3 justify-between w-full  h-16">
              <div className="h-5 w-[75%] ">
                <input
                  type="text"
                  className="py-3 px-4 block shadow-md  border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Coupon Code..."
                />
              </div>
              <div>
                <button
                  type="button"
                  className="py-[.688rem] px-4 inline-flex justify-center shadow-md items-center gap-2 rounded-lg border-2 border-gray-200 font-semibold text-teal-500 hover:text-white hover:bg-teal-600 hover:border-teal-500 focus:outline-none   transition-all text-sm dark:border-gray-700 dark:hover:border-teal-500"
                >
                  Apply
                </button>{" "}
              </div>
            </div> */}
            {/* <div className="w-full  pl-2 gap-1 flex flex-col h-20">
              <div className="h-10  flex justify-between">
                <h1 className="ml-2 font-medium text-slate-500 mt-1">
                  Subtotal
                </h1>

                <h1 className="mr-2 font-medium text-slate-500 mt-1">₹ #</h1>
              </div>
              <div className="h-10  flex justify-between">
                <span className="ml-2 font-sm text-slate-500 mt-1">
                  Dicount
                </span>
                <span className="mr-2 font-sm text-slate-500 mt-1">₹ #</span>
              </div>
            </div> */}
            <div className=" w-full  flex justify-between  mb-3 mt-10 h-12">
              <span className="ml-4 font-semibold text-balck mt-1">
                Grand total
              </span>
              <span className="mr-2 font-semibold text-black mt-1">₹ {totalamount }</span>
            </div>
            <div onClick={addDataIntoRedux} className="items-center mt-10">
              <span className="pt-3 pl-28  cursor-pointer text-white h-12 flex gap-4 w-full ju bg-teal-600  shadow-2xl    font-medium rounded-lg text-md px-5 py-2.5 text-center  mb-2">
                Check Out
              </span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Cart;
