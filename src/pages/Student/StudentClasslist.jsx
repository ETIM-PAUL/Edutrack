import { classlist } from "../../../utils";
import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";

const StudentClasslist = () => {
  const navigate = useNavigate();
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
          <div className="flex-auto my-auto max-md:max-w-full">Class List </div>
        </div>
        <div className="flex flex-col px-9 py-4 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="overflow-x-auto">
            <table className="table text-black">
              {/* head */}
              <thead>
                <tr className="text-black bg-zinc-300 border-zinc-400">
                  <th>Name</th>
                  <th>Registration Number</th>
                </tr>
              </thead>
              <tbody>
                {classlist?.map((course, i) => (
                  <tr key={i} className="">
                    <td>
                      {course?.name}
                    </td>
                    <td>{course?.reg_no}</td>
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

export default StudentClasslist