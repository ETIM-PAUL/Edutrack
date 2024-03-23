import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { useState } from "react";

const StudentDashboard = () => {
  const [modal, setModal] = useState(false)
  const [fellow, setFellow] = useState(false)

  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="student" />
      <div className="flex-wrap mt-40 content-start px-20 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col justify-between max-md:gap-0">
          <Link to="/student/attendance" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-16 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-blue-200 rounded-2xl shadow h-[222px] w-[300px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a622072bc6a318fd5e7a11f72c13ddb8d17712d9c57a72ad0c13ee83de68111?"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Attendance</div>
            </div>
          </Link>
          <div onClick={() => setFellow(true)} className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-16 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-pink-300 rounded-2xl shadow h-[222px] w-[300px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9846133a8664c14852e0e92cb55c88efa0081cfa5283af541d5fbe14236b9916?"
                  className="w-20 aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Lecturers and Class Mates</div>
            </div>
          </div>
          {/* <Link to="/student/result" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-20 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-red-300 rounded-2xl shadow h-[120px] w-[120px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb79b51360d52b4c044a4b9e609fe2779aa81f71b0eb8348d82d98cecb408549?"
                  className="w-20 aspect-square object-cover"
                />
              </div>
              <div className="self-center mt-3 text-xl font-bold text-black text-center">
                Results
              </div>
            </div>
          </Link> */}
          <div onClick={() => setModal(true)} className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-20 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-fuchsia-200 rounded-2xl shadow h-[222px] w-[300px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/766cdb99ec4dae0b4ecb81dea9810cfd742827ee36c22ab7e966869151cf2c55?"
                  className="w-20 aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Timetable</div>
            </div>
          </div>
        </div>
      </div>

      {modal &&
        <>
          <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <div className="flex flex-col px-16 py-8 text-lg font-medium bg-white rounded-2xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce2179ef020c62174c4367d60eb929a2209a2ed9c15d4b1bc29b4190c56c4ff1?"
                  className="self-center w-16 shadow-md aspect-square"
                />
                <div className="self-center mt-6 text-2xl font-bold text-black">
                  No Timetable
                </div>
                <div className="mt-4 text-sm tracking-normal text-center text-neutral-600">
                  We are currently working on shipping more features. You will be among the first
                  to know when it’s live
                </div>
                <div disabled className="justify-center items-center flex px-6 py-3 mt-20 tracking-normal text-white bg-black rounded-lg leading-[150%] opacity-30 cursor-not-allowed">
                  Coming Soon
                </div>
                <div onClick={() => setModal(false)} className="justify-center items-center flex px-6 py-3 mt-4 tracking-normal text-sky-600 rounded-lg border border-sky-600 border-solid leading-[150%] cursor-pointer">
                  Go Back
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {fellow &&
        <>
          <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <div className="flex flex-col px-16 py-8 text-lg font-medium bg-white rounded-2xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce2179ef020c62174c4367d60eb929a2209a2ed9c15d4b1bc29b4190c56c4ff1?"
                  className="self-center w-16 shadow-md aspect-square"
                />
                <div className="self-center mt-6 text-2xl font-bold text-black">
                  No Data Yet
                </div>
                <div className="mt-4 text-sm tracking-normal text-center text-neutral-600">
                  We are currently working on shipping more features. You will be among the first
                  to know when it’s live
                </div>
                <div disabled className="justify-center items-center flex px-6 py-3 mt-20 tracking-normal text-white bg-black rounded-lg leading-[150%] opacity-30 cursor-not-allowed">
                  Coming Soon
                </div>
                <div onClick={() => setFellow(false)} className="justify-center items-center flex px-6 py-3 mt-4 tracking-normal text-sky-600 rounded-lg border border-sky-600 border-solid leading-[150%] cursor-pointer">
                  Go Back
                </div>
              </div>
            </div>
          </div>
        </>
      }

    </div>
  );
}

export default StudentDashboard



