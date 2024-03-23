import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import abi from "../../constant/abi.json";
import { contractAddress } from "../../constant/address";
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { defaultconfig } from "../../main";
import { student_courses } from "../../../utils";
import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { address } = useAccount();

  async function getData() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getMyRegisteredCourse',
      args: [
        address
      ],
    })

    if (result) {
      const transposedData = result?.map((_, colIndex) => result?.map(row => row[colIndex]));
      setData(transposedData?.filter((data) => data?.[0] !== undefined));
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="flex flex-col bg-white">
      <TopNav type="student" />

      <div className="flex flex-col px-20 mt-40 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 text-3xl font-bold tracking-normal text-black max-md:flex-wrap">
          <img
            onClick={() => navigate(-1)}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/96d5312de6de7e2a2c8263e5ace49008832171e4a852a44522cd9738216b6580?"
            className="shrink-0 w-9 aspect-square cursor-pointer"
          />
          <div className="flex-auto my-auto max-md:max-w-full">Attendance </div>
        </div>
        <div className="flex flex-col px-9 py-4 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="overflow-x-auto">
            <table className="table text-black">
              {/* head */}
              <thead>
                <tr className="text-black bg-zinc-300 border-zinc-400">
                  <th>Course Title</th>
                  <th>Course Code</th>
                  <th>Lectures Marked</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 && data?.map((student, i) => (
                  <tr key={i} className="hover:bg-zinc-400 hover:border-zinc-400">
                    <td>
                      {student["0"]}
                    </td>
                    <td>
                      {student["1"]}
                    </td>
                    <td>{Number(student["2"])}</td>
                    <td>{Number(student["3"])}</td>
                    <th>
                      <button onClick={() => navigate(`/student/course-details/${student["1"]}`)} className="justify-center items-center text-center w-full hover:cursor-pointer px-4 py-3 text-lg font-medium tracking-normal leading-6 text-white bg-sky-600 rounded-lg">mark</button>
                    </th>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>
  );
}

export default StudentAttendance