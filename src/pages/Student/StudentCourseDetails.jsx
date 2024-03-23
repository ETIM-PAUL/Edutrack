import { useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import { contractAddress } from "../../constant/address";
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import abi from "../../constant/abi.json";
import { defaultconfig } from "../../main";
import { toast } from "react-toastify";


const StudentCourseDetails = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [data, setData] = useState([]);
  const [codeModal, setCodeModal] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [courseDet, setCourseDet] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  const { writeContract, writeContractAsync } = useWriteContract();

  const currentUrl = window.location.href;

  // Split the URL by '/' to get the individual parts
  const urlParts = currentUrl.split('/');

  // Assuming the course code is the last part of the URL
  const courseCode = urlParts[urlParts.length - 1];
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getMySingleCourse",
    args: [address, courseCode],
  });

  async function getData() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getMySingleCourse',
      args: [address, courseCode],
    })

    if (result) {
      console.log(result);
      setCourseDet(result);
    }
  }

  useEffect(() => {
    getData();
    console.log(result)
    if (result && result.data) {
      // const transposedData =result?.data[0]?.map((_, colIndex) => result?.data?.map(row => row[colIndex]))
      setData(result.data);

    }
  }, [])

  const signCode = async () => {
    try {
      setCodeLoading(true)
      const signCodeResult = writeContractAsync({
        abi,
        address: contractAddress,
        functionName: 'markAttendance',
        args: [
          courseCode,
          randomNumber,
          address,
        ],
      })

      const result = await waitForTransactionReceipt(defaultconfig, {
        hash: await signCodeResult,
      })

      if (result.status === "success") {
        console.log(result)
        setCodeLoading(false)
        setCodeModal(false)
        // getData();
        toast.success("Attendance Signed Successfully", 5000)
      }

    } catch (error) {
      console.log(error)
      setCodeLoading(false)
    }
  }



  return (
    <div className="flex flex-col bg-white">
      <TopNav type="student" />
      <div className="flex flex-col px-20 mt-40 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between my-auto text-3xl font-bold tracking-normal text-black max-md:flex-wrap">
            <img
              onClick={() => navigate(-1)}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96d5312de6de7e2a2c8263e5ace49008832171e4a852a44522cd9738216b6580?"
              className="shrink-0 w-9 aspect-square cursor-pointer"
            />
            <div className="flex-auto my-auto max-md:max-w-full">
              {courseDet["0"]}
              {/* Chemical Particles and Metals */}
            </div>
          </div>
        </div>
        <div className="mt-6 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="https://source.unsplash.com/1600x900/?portrait"
                className="grow shrink-0 w-60 max-w-full aspect-[1.2] rounded-xl max-md:mt-6 object-cover"
              />
            </div>
            <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between pt-2.5 pr-2.5 max-md:mt-6 max-md:max-w-full">
                <div className="text-xs tracking-normal text-neutral-600 max-md:max-w-full">
                  Chemical Particles and Metals is a comprehensive course
                  designed to provide students with a deep understanding of the
                  properties, behavior, and applications of chemical particles
                  and metals in various scientific and industrial contexts. The
                  course covers fundamental principles of chemistry related to
                  particles and metals, including their atomic structure,
                  bonding, reactivity, and physical properties.
                </div>
                <div className="flex gap-5 justify-between px-7 py- mt-20 max-w-full text-lg tracking-normal leading-6 bg-white rounded-xl border w-fit max-md:px-5 max-md:mt-10">
                  <div className="flex-1 py-2 text-green-600">
                    {courseDet["2"] !== undefined && Number(courseDet["2"])} Lecture(s) Held
                  </div>
                </div>
                <div className="flex gap-5 justify-between px-7 py- mt-2 max-w-full text-lg tracking-normal leading-6 bg-white rounded-xl border w-fit max-md:px-5 max-md:mt-10">
                  <div className="flex-1 py-2">
                    Last Attendance Code -  <span className="text-green-600">{courseDet["3"] !== undefined && Number(courseDet["3"])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center pr-3 text-lg font-medium tracking-normal leading-6 text-white whitespace-nowrap mt-10">
        <button onClick={() => document.getElementById('course_attendance_min').showModal()} className="px-6 py-3 border border-sky-600 bg-white text-sky-600 rounded-lg max-md:px-5">
          View Result
        </button>
        <button onClick={() => setCodeModal(true)} className="px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5"

        >
          Mark Attendance
        </button>
      </div>


      {/* student attendance not achieved */}
      <dialog id="course_attendance_min" className="modal">
        <div className="modal-box bg-white text-black">
          <div className="flex flex-col p-8 text-black bg-white rounded-2xl max-w-[600px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ff05fa46e75facf295aa02809fabbfe879a7c0688546b3017fc7005688f5923?"
              className="self-center w-16 object-cover aspect-square"
            />
            <div className="mt-6 text-2xl font-bold text-center max-md:max-w-full">
              No Result
            </div>
            <div className="mt-4 text-sm tracking-normal text-center text-neutral-600 max-md:max-w-full">
              You have not <span className="text-black font-bold">OR</span> did not meet up the 75% attendance required for your result to be uploaded
            </div>
            <div className="modal-actio block space-y-4 mt-4 sm:mt-10 w-full">
              <button className="btn hover:bg-transparent px-6 py-3 border-sky-600 hover:border-sky-600 bg-white text-sky-600 rounded-lg max-md:px-5 w-full">Contact Admin</button>
              <form method="dialog">
                <button className="btn px-6 py-3 bg-sky-600 hover:bg-sky-800 border-none rounded-lg max-md:px-5 text-white w-full">Go Back</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* student attendance details */}
      <dialog id="course_result" className="modal">
        <div className="modal-box bg-white text-black">
          <div className="flex flex-col p-8 text-black bg-white rounded-2xl max-w-[600px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ff05fa46e75facf295aa02809fabbfe879a7c0688546b3017fc7005688f5923?"
              className="self-center w-16 object-cover aspect-square"
            />
            <div className="mt-6 text-2xl font-bold text-center max-md:max-w-full">
              Course result
            </div>
            <div className="mt-4 text-sm tracking-normal text-center text-neutral-600 max-md:max-w-full">
              This result is for chemical particles and metals
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="table text-black">
                {/* head */}
                <thead>
                  <tr className="text-black">
                    <th>Name</th>
                    <th>Reg No</th>
                    <th>Total Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td>
                      Etim Paul
                    </td>
                    <td>14/0956374</td>
                    <td>55</td>
                    <td>C</td>
                  </tr>
                </tbody>

              </table>
            </div>
            <form method="dialog w-full block flex ">
              <button className="text-center px-16 py-3 mt-12 text-lg font-medium tracking-normal leading-6 text-white bg-sky-600 rounded-lg max-md:px-5 max-md:mt-10 w-full">
                Go Back
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* generate code modal */}
      {codeModal &&
        <>
          <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Attendance Code</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <input type="text" minLength={6} maxLength={6} className="input input-bordered w-full bg-white" placeholder="Enter attendance code" onChange={(e) => setRandomNumber(e.target.value)} />
                </div>
              </div>
              <div className="modal-action flex w-full">
                <form method="dialog">
                  <button disabled={codeLoading} onClick={() => setCodeModal(false)} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white disabled:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80">Cancel</button>
                </form>
                <button onClick={() => signCode()} disabled={codeLoading} className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white disabled:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-80">{codeLoading ? "Processing" : "Mark Attendance"}</button>
              </div>
            </div>
          </div>
        </>
      }

    </div>
  );
}

export default StudentCourseDetails