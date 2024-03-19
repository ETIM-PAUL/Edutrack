import { useState } from "react";
import { student_result } from "../../../utils";
import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";

const StudentResult = () => {
  const [selectedStudent, setSelectedStudent] = useState()
  const [studentModal, setStudentModal] = useState()
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
          <div className="flex-auto my-auto max-md:max-w-full">My Results </div>
        </div>
        <div className="flex flex-col px-9 py-4 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="overflow-x-auto">
            <table className="table text-black">
              {/* head */}
              <thead>
                <tr className="text-black bg-zinc-300 border-zinc-400">
                  <th>Course Title</th>
                  <th>Course Code</th>
                  <th>CA Score</th>
                  <th>Exam Score</th>
                  <th>Total Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {student_result?.map((course, i) => (
                  <tr key={i} className="hover:bg-zinc-400 hover:border-zinc-400">
                    <td>
                      {course?.name}
                    </td>
                    <td>{course?.course_code}</td>
                    <td>{course?.ca_score}</td>
                    <td>{course.exam_score}</td>
                    <td>{course.ca_score + course.exam_score}</td>
                    <td>B</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

      {/* student attendance details */}
      <dialog id="stud_attendance_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <div className="flex justify-center flex-col px-2 md:px-6 py-8 font-bold bg-white rounded-2xl">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/553c098e58eb507b27191bb4f99f75984d787aa7499fc3af8c660750361884c4?"
              className="self-center w-16 aspect-square"
            />
            <div className="mt-6 text-2xl text-black text-center">Attendance Signed</div>
            <div className="mt-4 text-sm tracking-normal text-center text-neutral-600">
              {selectedStudent?.name} has attended 10/15 Lectures so far
            </div>
            <div className="mt-4 text-xl text-center text-sky-600">78%</div>
            <div className="modal-actio w-full">
              <form method="dialog">
                <button className="justify-center items-center text-center w-full hover:cursor-pointer px-16 py-3 mt-20 text-lg font-medium tracking-normal leading-6 text-white bg-sky-600 rounded-lg">
                  Go Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* edit course modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Course Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Title</label>
              <input type="text" minLength={1} placeholder="Edit course title" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Code</label>
              <input type="text" minLength={6} maxLength={6} placeholder="Edit course code" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Number of Lectures</label>
              <input type="text" minLength={1} placeholder="Edit course title" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Upload Image</label>
              <input type="file" className="file-input file-input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course Description</label>
              <textarea rows={4} placeholder="Enter course description" className="textarea textarea-bordered w-full placeholder:pt-2 bg-white" />
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

      {/* generate code modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Attendance Code</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Number of students in class</label>
              <input type="text" minLength={1} className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Input Code</label>
              <input type="text" minLength={6} maxLength={6} className="input input-bordered w-full bg-white" />
            </div>
          </div>
          <div className="modal-action flex w-full">
            <form method="dialog">
              <button className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
            </form>
            <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Generate Code</button>
          </div>
        </div>
      </dialog>

      {/* edit student modal */}
      {studentModal &&
        <>
          <input type="checkbox" checked={true} id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Edit Student Info</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student name</label>
                  <input type="text" value={selectedStudent?.name} disabled className="input input-bordered w-full text-black disabled:bg-white bg-white" />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student reg no</label>
                  <input type="text" value={selectedStudent?.reg_num} disabled className="input input-bordered w-full text-black disabled:bg-white bg-white" />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">CA Score</label>
                  <input type="text" value={selectedStudent?.ca_score} className="input input-bordered border-black w-full bg-white" />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Exam Score</label>
                  <input type="text" value={selectedStudent?.exam_score} className="input input-bordered border-black w-full bg-white" />
                </div>
              </div>
              <div className="modal-action flex w-full">
                <button onClick={() => { setStudentModal(false); setSelectedStudent(null) }} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white">Cancel</button>
                <button className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white">Save Changes</button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default StudentResult