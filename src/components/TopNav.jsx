import { Link, NavLink } from "react-router-dom"

const TopNav = (type) => {

  return (
    <div className="flex fixed items-center justify-between px-20 py-8 w-full whitespace-nowrap shadow-sm text-[#98A2B3] bg-slate-50 leading-[150%] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="flex gap-10 justify-between text-lg tracking-normal max-md:flex-wrap max-md:max-w-full">
        <Link to="/">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cef0daca25baf3b12b44187e60a312ebb75594659145efc6f899625ae5227931?"
            className="shrink-0 my-auto w-12 shadow-md aspect-square"
          />
        </Link>
        <div className="flex gap-5 justify-between items-center px-2 py-1.5 bg-white rounded-xl shadow-2xl">
          <NavLink to={type?.type === "lecturer" ? "/lecturer/dashboard" : type?.type === "student" ? "/student/dashboard" : "/admin/dashboard"} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "justify-center self-stretch bg-blue-100 rounded-lg cursor-pointer p-2.5" : "p-2.5"
          }>
            Dashboard
          </NavLink>
          {type?.type !== "admin" &&
            <div className="self-stretch my-auto cursor-pointer">
              <NavLink to={type?.type === "lecturer" ? "/lecturer/courses" : "/student/courses"} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "justify-center self-stretch bg-blue-100 rounded-lg cursor-pointer p-2.5" : "p-2.5"
              }>
                Courses
              </NavLink>
            </div>
          }
          {type?.type == "student" &&
            <NavLink to="/student/attendance" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "justify-center self-stretch bg-blue-100 rounded-lg cursor-pointer p-2.5" : "p-2.5"
            }>
              Attendance
            </NavLink>
          }
          {/* <div className="self-stretch my-auto cursor-pointer">Students</div> */}
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center self-start px-3 py-1.5 text-xs font-medium text-sky-600 rounded-lg">
        <img
          loading="lazy"
          srcSet="https://source.unsplash.com/1600x900/?portrait"
          className="shrink-0 self-stretch w-9 rounded-full aspect-square object-cover"
        />
        <div className="flex-auto self-stretch my-auto">
          GHDJJjdjr74848nh...
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1854b7a23ce9574b1afe00e81eb2c20ecebf24f1e6f7c837239bd9d79f230c89?"
          className="shrink-0 self-stretch my-auto w-4 aspect-square"
        />
      </div>
    </div>
  )
}

export default TopNav