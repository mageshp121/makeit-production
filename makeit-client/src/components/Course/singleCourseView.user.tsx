import React, { useEffect, useState } from "react";

// import SingleCourseHome from './SingleCourseHome'
import { getAllCourses } from "../../utils/api/methods/get";
import Shimmer from "../Commoncomponents/Shimmer";
// import { useAddTocart } from "../../utils/customHooks/hook";
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { Link, useNavigate } from "react-router-dom";
import { Cart_Api } from "../../utils/api/endPoints/commen";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";

export default function SingleCourseViewUser() {
  const [isLoading, setIsLoading] = useState(true); 
  const [coursedata, setCoursesData] = useState([]) as any;
  const [filteringData, setFilteringData] = useState([]) as any;
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPriceFilter, setMinPriceFilter] = useState<string>("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searcheror, setSearchError] = useState<string>("");
  const [priceerror, setPriceError] = useState<string>("");
  const axiosPrivet = useAxiosePrivate()
  const navigate = useNavigate()
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
   })

  const recordperPage = 6
  const lastIndex = currentPage * recordperPage ;
  const firstIndex = lastIndex - recordperPage  ; 

  // This useEffect() is fetching the data from server
  useEffect(() => {
    console.log("fetch use effetctctctctctctc");
    const fetData = async () => {
      const response: any = await getAllCourses();
      const resPublishedData = response.data.filter((item:any) => item.drafted === false)
      setCoursesData(resPublishedData);
      setFilteringData(resPublishedData);
      setIsLoading(false);
    };
    fetData();
  }, []);

  const isValidAlphabetic = (value: string) => {
    return /^[a-zA-Z]+$/.test(value);
  };

  // handle event changing for filtering data
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value); 
    console.log(event.target.value, "<= handleCategoryChange =>");
    setCurrentPage(1);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceFilter(event.target.value);
    console.log(event.target.value, "<= handleMinPriceChange =>");
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceFilter(event.target.value);
    console.log(event.target.value, "<= handleMaxPriceChange =>");
    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
    console.log(event.target.value, "<= handleSortChange =>");
    setCurrentPage(1);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidAlphabetic(event.target.value)) {
      setSearchError("The provided value to search shulde be in Alphebetic");
      setSearch("");
    } else {
      setSearchError("");
      setSearch(event.target.value);
      console.log(event.target.value, "<= handleSortChange =>");
      setCurrentPage(1);
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setSortOrder("");
    setSearch("");
  };

  useEffect(() => {
    const filteredProducts = coursedata.filter((product: any) => {
      console.log(product.WorkingTitle, "ggg");

      const searchData =
        search === "" ||
        product.WorkingTitle.toLowerCase().includes(search.toLowerCase());
      console.log(searchData, "searchData");
      const matchCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.Category.toLowerCase());
      const matchMinPrice =
        minPriceFilter === "" ||
        product.CoursePrice >= parseFloat(minPriceFilter);
      const matchMaxPrice =
        maxPriceFilter === "" ||
        product.CoursePrice <= parseFloat(maxPriceFilter);
      return matchCategory && matchMinPrice && matchMaxPrice && searchData;
    });
     setFilteringData(filteredProducts);
    let sortedProducts = filteringData;
    if (sortOrder !== undefined) {
      sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.CoursePrice - b.CoursePrice;
        } else {
          return b.CoursePrice - a.CoursePrice;
        }
      });
      setFilteringData(sortedProducts);
    }
    setPriceError("");
    setSearchError("");
  }, [selectedCategory, minPriceFilter, maxPriceFilter, sortOrder, search,currentPage]);
  
  const page = Math.ceil(filteringData.length / recordperPage);
  let paginatedCourses = filteringData.slice(firstIndex, lastIndex);
//  setFilteringData(...paginatedCourses)
console.log(page,'hdsh');
console.log(paginatedCourses,'paginatedCourses');
if(!paginatedCourses){
  paginatedCourses=[]
}
const handlePageChange = (pageNumber:number) =>{
     setCurrentPage(pageNumber)
}
const handlePrev=()=>{
    if(currentPage != 1){
        setCurrentPage((prev)=>prev-1)
    }
}
   
const handleNext = () =>{
  if(page != currentPage){
    setCurrentPage((prev)=> prev+1)
  }
   
}



 const handleAddtocart= async (courseId:string)=>{
 if(userdata._id){
   const requestData = {
     userId: userdata._id,
     cartProductId: courseId,
   };
   try {
     const response = await axiosPrivet.post(Cart_Api,requestData,{headers:{'Content-Type': 'application/json'}});
    console.log(response,'<= handleAddtocart =>');
   if(response.data.created || response.data.updated){
      return UseCommen("Corse added into cart")
   }else if(response.data.ProductPresent){
      UseCommenError("Sorry the Course is already present in the cart");
      return navigate(`/cart/${userdata._id}`)
   }else{
   }
   } catch (error) {
     return console.log(error,'errororor');
   }
 }else{
   navigate("/auth/login")
 }
}

  return (
    <>
     
      <div className="w-[75rem] ml-[6.4rem] pt-7 p-5 pb-8 rounded-lg  shadow-md mr-16 h-auto border border-slate-50 bg-white">
        {/* search by course starts */}

        <span className="p-5">
          {(searcheror.length != 0 && (
            <h1 className="text-red-600">{searcheror}</h1>
          )) ||
            (priceerror.length != 0 && (
              <h1 className="text-red-600">{priceerror}</h1>
            ))}
        </span>
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h1 className="mb-3 ml-2 text-md">Search courses</h1>
            <div className=" max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                id="hs-table-search"
                className="p-3 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder="Search for items"
              />
            </div>
          </div>

          {/* search by course ends */}

          {/* search by price range starts */}
          <div className="ml-3">
            <h1 className="mb-3 ml-2 text-md">Add price range</h1>
            <div className=" max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <div className="flex justify-between gap-4">
                <input
                  type="text"
                  value={minPriceFilter}
                  onChange={handleMinPriceChange}
                  name="hs-table-search"
                  id="hs-table-search"
                  className="p-3  block w-full border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Min"
                />
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  value={maxPriceFilter}
                  onChange={handleMaxPriceChange}
                  className="p-3 block w-full border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Mix"
                />
              </div>
            </div>
          </div>
          {/* search by price range ends */}

          {/* filter by category starts */}
          <div className="ml-10">
            <h1 className="mb-3 ml-2 text-md">Filter by category</h1>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-whit bg-white dark:border-teal-700 dark:text-gray-400"
            >
              {/* Set the "selected" attribute to true for the default option */}
              <option value="" selected>
                Selecte the category
              </option>
              <option value="canada">Canada</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          {/* filter by category ends */}

          {/* sort dropedown starts */}
          <div className="ml-10">
            <h1 className="mb-3 ml-2 text-md">Sort Data</h1>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-white bg-white dark:border-teal-700 dark:text-gray-400"
            >
              {/* Set the "selected" attribute to true for the default option */}
              <option className="bg-white mt-8" value="" selected>
                Sort Data
              </option>
              <option value="asc">Min to Max</option>
              <option value="desc">Max to Min</option>
            </select>
          </div>
          {/* sort dropedown end */}

          {/* card starts */}
        </div>
        {search !== "" ||
        selectedCategory !== "" ||
        minPriceFilter !== "" ||
        maxPriceFilter !== "" ||
        sortOrder !== "" ? (
          <button
            onClick={handleReset}
            type="button"
            className="py-3 px-4 mt-5 w-32 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="w-[100%]   overflow-auto  mt-2 h-[69rem] ">
        <div className="mx-auto  max-w-7xl px-6 lg:px-8">
          <div className="w-[100%]  ">
            <div className="mt-4  ">
              <div className="mx-auto sm:grid-cols-4  grid max-w-2xl grid-cols-1  gap-x-8 gap-y-16 pt-5  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {
                isLoading ? (
                  <Shimmer /> // Show Shimmer while loading 
                ) :paginatedCourses?.length > 0 ? (
                  paginatedCourses?.map((course: any, key: any) => (
                    <>
                    
                      <div   className=" h-[28rem] ml-3 rounded-lg p-5 shadow-lg  shadow-gray-300 border-gray-300 border" key={key}>
                      <Link to={`/singleall/${course._id}`}>
                        <img
                          src={`${course.thumbNailImageS3UrlKey}`}
                          alt=""
                          className="h-[50px] shadow-lg rounded-lg w-full object-cover sm:h-[200px]"
                        />
                        </Link>
                        <div className="mt-3 flex justify-between text-sm">
                          <div>
                            <div className="mt-2">
                              <span className="text-gray-900 text-lg group-hover:underline group-hover:underline-offset-4">
                                {course.WorkingTitle}
                              </span>
                            </div>
                            <div className=" ">
                              <p className="mt-1.5 max-w-[45ch] text-md text-gray-500">
                                {course.ShortDescription}
                              </p>
                              <div className="mt-3">
                                <p className="text-teal-600 text-xl font-medium">
                                  ₹ {course.CoursePrice}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex  justify-between w-full">
                          <div className="w-[100%] mt-5">
                            <button onClick={()=>{
                              console.log(course._id,'iddidididididid');
                              
                              handleAddtocart(course?._id)}
                              } className="hover:shadow-2xl bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 rounded-lg">
                              Add to Cart 
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div className="w-full ml-[26rem] text-center">
                    <h1 className="text-4xl">No data found</h1>
                  </div>
                )}
                {/* card ends */}
              </div>
              {/* paginatio bar starts */}
              <div className="w-[75rem] mt-14 ml-3 rounded-lg  mr-16 h-20">
                  <nav className="flex justify-center  bg-white items-center rounded-lg  space-x-2">
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                         onClick={handlePrev}
                       >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </span>
                  {Array.from({ length: page }, (_, index) => (
                 <span
                key={index + 1}
                 className={`w-10 h-10 ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white"
                  : "text-gray-500 hover:text-teal-600"
                 } p-4 inline-flex items-center text-sm font-medium rounded-full`}
                 onClick={() => handlePageChange(index + 1)}
                  >
                    {index+1 }
                 </span>
                    ))}
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                      onClick={handleNext}
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </span>
                  </nav>
                </div>
                {/* paginatio bar end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
