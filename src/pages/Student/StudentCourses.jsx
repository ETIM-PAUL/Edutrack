import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress } from "../../constant/address";
import abi from '../../constant/abi.json';
import { useEffect, useState } from "react";

const StudentCourses = () => {
  const {address} = useAccount();
  const [data, setData] = useState([]);
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getMyRegisteredCourse",
    args: [address],
  });

  useEffect(()=>{
    if (result && result.data) {
      const transposedData =result?.data[0]?.map((_, colIndex) => result?.data?.map(row => row[colIndex]))
      setData(transposedData);
      
    }
  },[result])


  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="student" />
      <div className="flex flex-col px-20 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto my-auto text-3xl font-bold tracking-normal text-black">
            My Courses
          </div>
          <div className="flex flex-col justify-center px-6 py-1.5 text-lg tracking-normal leading-6 whitespace-nowrap bg-white rounded-xl shadow-2xl text-neutral-600 max-md:px-5">
            <div className="flex gap-2 py-2.5 rounded-lg">
              <div className="grow">All Courses</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b0291867993bc4322543c56e96cd657bb520cca452fedac32d2e59863d7d131?"
                className="shrink-0 self-start w-6 aspect-square"
              />
            </div>
          </div>
        </div>
        {
          data.map((data, index)=>(

        <Link to={`/student/course-details/${data[1]}`} key={index} className="flex flex-col pb-4 mt-6 max-w-full bg-white rounded-xl shadow-2xl w-[360px] cursor-pointer">
          <img
            loading="lazy"
            srcSet="https://source.unsplash.com/1600x900/?portrait"
            className="w-full aspect-[2.56] object-cover"
          />
          <div className="flex flex-col px-4 mt-6 text-xs tracking-normal">
            <div className="text-lg tracking-normal text-black whitespace-nowrap">
              {data[0]}
            </div>
            <div className="mt-2 text-sky-600">{data[1]}</div>
            <div className="mt-2 text-ellipsis text-neutral-600">
              Chemical Particles and Metals is a comprehensive course designed
              to provide students with a deep understanding of the properties,
              behavior, and applications of chemical particles and metals in
              various scientific and industrial contexts. The course covers
              fundamental principles of chemistry related to particles and
              metals, including their atomic structure, bonding, reactivity, and
              physical properties.
            </div>
          </div>
          <div className="flex gap-1 px-4 mt-6 text-base leading-6 text-center text-sky-600 whitespace-nowrap max-md:px-5">
            <img
              loading="lazy"
              srcSet="https://source.unsplash.com/1600x900/?portrait"
              className="shrink-0 rounded-full w-10 h-10 object-cover"
            />
            <div className="my-auto">+25</div>
          </div>
        </Link>
          ))
        }
      </div>
    </div>
  );
}
export default StudentCourses