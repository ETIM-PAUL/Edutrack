import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";

const StudentDashboard = () => {

  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="student" />
      <div className="flex-wrap mt-40 content-start px-20 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col justify-between max-md:gap-0">
          <Link to="/student/attendance" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-16 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-blue-200 rounded-2xl shadow h-[122px] w-[122px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a622072bc6a318fd5e7a11f72c13ddb8d17712d9c57a72ad0c13ee83de68111?"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Attendance</div>
            </div>
          </Link>
          <Link to="/student/classlist" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-16 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-pink-300 rounded-2xl shadow h-[122px] w-[122px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9846133a8664c14852e0e92cb55c88efa0081cfa5283af541d5fbe14236b9916?"
                  className="w-20 aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Class List</div>
            </div>
          </Link>
          <Link to="/student/result" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
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
          </Link>
          <Link to="/student/timetable" className="flex shadow-2xl rounded-2xl flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-20 py-10 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-5">
              <div className="flex justify-center items-center cursor-pointer px-5 bg-fuchsia-200 rounded-2xl shadow h-[120px] w-[120px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/766cdb99ec4dae0b4ecb81dea9810cfd742827ee36c22ab7e966869151cf2c55?"
                  className="w-20 aspect-square object-cover"
                />
              </div>
              <div className="mt-3 text-xl font-bold text-black text-center">Timetable</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard



