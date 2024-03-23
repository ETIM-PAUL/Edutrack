import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "../../constant/abi.json";
import { contractAddress } from "../../constant/address";
import { readContract } from '@wagmi/core'
import { defaultconfig } from "../../main";

const Courses = () => {
  const [data, setData] = useState([]);
  const { address } = useAccount();

  async function getData() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getAllCourses',
    })

    if (result) {
      const transposedData = result?.map((_, colIndex) => result?.map(row => row[colIndex]));
      console.log(transposedData)
      setData(transposedData?.filter((data) => data?.[0] !== undefined && data[2] === address));
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="lecturer" />
      <div className="flex flex-col px-20 mt-12 md:mt-40 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
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
        <div className="flex gap-4">

          {data?.length > 0 && data?.map((course, index) => (
            <Link to={`/lecturer/course-details/${course["5"]}`} key={index} className="flex flex-col pb-4 mt-6 max-w-full bg-white rounded-xl shadow-2xl w-[360px] cursor-pointer">
              <img
                loading="lazy"
                srcSet="https://source.unsplash.com/1600x900/?portrait"
                className="w-full aspect-[2.56] object-cover"
              />
              <div className="flex flex-col px-4 mt-6 text-xs tracking-normal">
                <div className="text-xs tracking-normal text-black whitespace-nowrap">
                  <span className="font-bold text-lg">{course["1"]}</span> - {course["5"]}
                </div>
              </div>
              <div className="flex gap-1 px-4 mt-2 text-base leading-6 text-center text-sky-600 whitespace-nowrap max-md:px-5">
                {Number(course["4"]) > 0 &&
                  <img
                    loading="lazy"
                    srcSet="https://source.unsplash.com/1600x900/?portrait"
                    className="shrink-0 rounded-full w-10 h-10 object-cover"
                  />
                }
                <div className="my-auto text-green font-bold">{Number(course["4"]) > 0 ? +Number(course["4"]) : "No Students Yet"}</div>
              </div>
            </Link>
          ))
          }
        </div>
      </div>
    </div>
  );
}
export default Courses