/** @format */

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "../../constant/abi.json";
import { contractAddress } from "../../constant/address";

export default function SubDashboard() {
  const [data, setData] = useState([]);
  const { address } = useAccount();
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getMyAssignedCourses",
    args: [address],
  });

  useEffect(() => {
    if (result && result.data) {
      setData(result.data);
    }
  }, [result]);

  return (
    <main>
        
      <div className="w-[40%] h-[500px] bg-[#D0DFFC]"> 
<h2 className="text-bold text-">
        {data.length === 0 ? 0 : Number(result.data[1])}
        </h2>      
      </div>
    </main>
  );
}
