/** @format */
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import abi from "../../constant/abi.json";
import { contractAddress } from "../../constant/address";
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { defaultconfig } from "../../main";
import { Link } from "react-router-dom";

export default function SubDashboard() {
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
      setData(transposedData?.filter((data) => data?.[0] !== undefined && data[2] === address));
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <main>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start px-6 py-4 w-full text-black whitespace-nowrap bg-blue-100 rounded-2xl max-md:px-5 max-md:mt-6 max-md:max-w-full">
            <div className="text-6xl tracking-normal leading-[64px] max-md:text-4xl">
              {data.length}
            </div>
            <div className="text-xl font-bold">Courses</div>
            <Link to="/lecturer/courses">
              <div className="justify-center items-center self-stretch hover:bg-[#1e1e1e] px-6 py-3 mt-12 text-lg font-medium tracking-normal leading-6 text-black hover:text-white bg-white rounded-lg max-md:px-5 max-md:mt-10 max-md:max-w-full cursor-pointer">
                Details
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start px-6 py-4 w-full text-black whitespace-nowrap bg-purple-200 rounded-2xl max-md:px-5 max-md:mt-6 max-md:max-w-full">
            <div className="text-6xl tracking-normal leading-[64px] max-md:text-4xl">
              {data.reduce((acc, obj) => acc + Number(obj["4"]), 0)}
            </div>
            <div className="text-xl font-bold">Student(s)</div>
            <Link to="/lecturer/courses">
              <div className="justify-center items-center self-stretch hover:bg-[#1e1e1e] px-6 py-3 mt-12 text-lg font-medium tracking-normal leading-6 text-black hover:text-white bg-white rounded-lg max-md:px-5 max-md:mt-10 max-md:max-w-full cursor-pointer">
                Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
