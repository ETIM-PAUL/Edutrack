import { useAccount } from "wagmi";
import TopNav from "../../components/TopNav";
import { contractAddress } from "../../constant/address";
import abi from '../../constant/abi.json'
import { useEffect, useState } from "react";
import SubDashboard from "./SubDashboard";
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { defaultconfig } from "../../main";

const LecturerDashboard = () => {
  const [status, setStatus] = useState(false)
  const { address } = useAccount()

  async function getData() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getLecturerStatus',
      args: [address]
    })
    setStatus(result);

  }

  useEffect(() => {
    getData();
  }, [address !== undefined && address])

  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="lecturer" />
      <div className="px-16 mt-12 md:mt-40 w-full text-lg tracking-normal leading-7 text-center text-[#505050] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        {
          !status ?
            <div className="flex justify-center items-center ">
              <div className="flex flex-col max-w-full w-[323px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eea9f93130b5b00bf11e2a03cf9727b23c58c766c6aca264f548cb2e77e7b0fa?"
                  className="self-center max-w-full aspect-square w-[300px]"
                />
                <div className="mt-6">
                  Yo don’t have a lecturer profile created
                  <br />
                  Please contact{" "}
                  <span className="font-medium text-sky-600">Admin</span>
                </div>
              </div>
            </div>
            :
            <div className="">
              <SubDashboard />
            </div>
        }
      </div>
    </div>
  );
}

export default LecturerDashboard



