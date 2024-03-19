import { useState } from "react";
import { courses, depts, dummy_students, lecturers } from "../../../utils";
import TopNav from "../../components/TopNav";

const AdminDashboard = () => {
  const [allCourses, setAllCourses] = useState(courses)
  const [alldept, setAllDept] = useState(depts)
  const [allLecturers, setAllLecturers] = useState(lecturers)
  const [allStudents, setAllStudents] = useState(dummy_students)
  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="admin" />
      <div className="px-20 mt-40 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-4 text-lg tracking-normal leading-6 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 font-medium text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div className="flex-auto">Departments</div>
                <img
                  onClick={() => document.getElementById('add_dept').showModal()}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {alldept.length > 0 && alldept.map((dept, i) => (
                <div key={i} className="flex gap-4 justify-between px-2 py-2.5 mt-6 text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex-auto">{dept.name}</div>
                  <img
                    onClick={() => document.getElementById('edit_dept').showModal()}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e001084c3199bd7531d7619ab301881871ab8b7f4f40e5066c9a861ad1a3d017?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-4 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 text-lg font-medium tracking-normal leading-6 text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div>Courses</div>
                <img
                  onClick={() => document.getElementById('add_course').showModal()}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {allCourses.length > 0 && allCourses.map((course, i) => (
                <div key={i} className="flex justify-between gap-4 px-2 py-2.5 mt-6 text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-7">
                      {course.name}
                    </div>
                    <div className="mt-2 text-xs tracking-normal">{course.code}</div>
                  </div>
                  <img
                    onClick={() => document.getElementById('edit_course').showModal()}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dda1ea6fba67f9ac91fcda9d53e5820d332f7dd696e76740d808ed468357838?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-4 text-lg tracking-normal leading-6 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 font-medium text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div>Lecturers</div>
                <img
                  onClick={() => document.getElementById('add_lect').showModal()}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {allLecturers.length > 0 && allLecturers.map((lecturer, i) => (
                <div key={i} className="flex gap-4 justify-between px-2 py-2.5 mt-6 text-xs tracking-normal text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-6">
                      {lecturer.name}
                    </div>
                    <div className="mt-2">{lecturer.dept}</div>
                    <div className="mt-2">{lecturer.course}</div>
                  </div>
                  <img
                    onClick={() => document.getElementById('edit_lect').showModal()}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7b6bc5c1b6546dd5109a402843d7d3d88ed082935193d76d742e22a20af0009?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-4 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 text-lg font-medium tracking-normal leading-6 text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div>Students</div>
                <img
                  onClick={() => document.getElementById('add_student').showModal()}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {allStudents.length > 0 && allStudents.map((student, i) => (
                <div key={i} className="flex gap-4 justify-between px-2 py-2.5 mt-6 text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-6">
                      {student.name}
                    </div>
                    <div className="mt-2 text-xs tracking-normal">
                      {student.dept}
                    </div>
                  </div>
                  <img
                    onClick={() => document.getElementById('edit_student').showModal()}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c87bfd1a27cdd304a7dbdbc4cf154fa85d19b0cc85df91f4ee6c5f727fc3398?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* edit department modal */}
      <dialog id="edit_dept" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit department info</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department name</label>
              <input type="text" placeholder="Enter Department name" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* add department modal */}
      <dialog id="add_dept" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Create a new department</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department name</label>
              <input type="text" placeholder="Enter Department name" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Create Department</button>
          </div>
        </div>
      </dialog>

      {/* edit course modal */}
      <dialog id="edit_course" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Course Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((dept, i) => (
                  <option key={i}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Title</label>
              <input type="text" placeholder="Enter Course Title" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Code</label>
              <input type="text" placeholder="Enter Course Code" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* add course modal */}
      <dialog id="add_course" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Add Course Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((dept, i) => (
                  <option key={i}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Title</label>
              <input type="text" placeholder="Enter Course Title" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Code</label>
              <input type="text" placeholder="Enter Course Code" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Create Course</button>
          </div>
        </div>
      </dialog>

      {/* edit lecturer modal */}
      <dialog id="edit_lect" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Lecturer Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((item, i) => (
                  <option value={item.name} key={i}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <select className="select select-bordered w-full bg-white">
                {allCourses?.length > 0 && allCourses.map((item, i) => (
                  <option value={item.code} key={i}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Lecturer Name</label>
              <input type="text" placeholder="Enter Course Code" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* add lecturer modal */}
      <dialog id="add_lect" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Add Lecturer</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((item, i) => (
                  <option value={item.name} key={i}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <select className="select select-bordered w-full bg-white">
                {allCourses?.length > 0 && allCourses.map((item, i) => (
                  <option value={item.code} key={i}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Lecturer Name</label>
              <input type="text" placeholder="Enter lecturer Name" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Add Lecturer</button>
          </div>
        </div>
      </dialog>

      {/* edit student modal */}
      <dialog id="edit_student" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Student Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((item, i) => (
                  <option value={item.name} key={i}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <select className="select select-bordered w-full bg-white">
                {allCourses?.length > 0 && allCourses.map((item, i) => (
                  <option value={item.code} key={i}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Student Name</label>
              <input type="text" placeholder="Enter Student name" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* add student modal */}
      <dialog id="add_student" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Add Student</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <select className="select select-bordered w-full bg-white">
                {alldept?.length > 0 && alldept.map((item, i) => (
                  <option value={item.name} key={i}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <select className="select select-bordered w-full bg-white">
                {allCourses?.length > 0 && allCourses.map((item, i) => (
                  <option value={item.code} key={i}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Student Name</label>
              <input type="text" placeholder="Enter student name" className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Add Student</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AdminDashboard



