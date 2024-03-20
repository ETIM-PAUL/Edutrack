import { useEffect, useState } from "react";
import { students } from "../../../utils";
import TopNav from "../../components/TopNav";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress } from "../../constant/address";
import abi from "../../constant/abi.json";

const CourseDetails = () => {
  const [selectedStudent, setSelectedStudent] = useState()
  const [studentModal, setStudentModal] = useState()
  const [data, setData] = useState([]);
  const { address } = useAccount();
  // Function to handle checkbox change
  const handleCheckboxChange = (event, student) => {
    if (selectedStudent === student) {
      // If the clicked checkbox is already checked, uncheck it
      setSelectedStudent(null);
    } else {
      // Otherwise, check the clicked checkbox and uncheck the previously checked checkbox
      setSelectedStudent(student)
      setStudentModal(true)
    }
  };
  
  const currentUrl = window.location.href;

// Split the URL by '/' to get the individual parts
const urlParts = currentUrl.split('/');

// Assuming the course code is the last part of the URL
const courseCode = urlParts[urlParts.length - 1];

// console.log(courseCode)

  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getResgiteredCourseStdt",
    args: [courseCode],
  });

  useEffect(() => {
    if (result && result.data) {
      const transposedData =result?.data[0]?.map((_, colIndex) => result?.data?.map(row => row[colIndex]))
      setData(transposedData);
      console.log(transposedData)
    }
  }, [result]);

  

  return (
    <div className="flex flex-col bg-white">
      <TopNav type="lecturer" />
      <div className="flex flex-col px-20 mt-40 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between my-auto text-3xl font-bold tracking-normal text-black max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96d5312de6de7e2a2c8263e5ace49008832171e4a852a44522cd9738216b6580?"
              className="shrink-0 w-9 aspect-square"
            />
            <div className="flex-auto my-auto max-md:max-w-full">
              {/* Chemical Particles and Metals */}
              {courseCode}
            </div>
          </div>
          <div className="flex gap-5 justify-between pr-3 text-lg font-medium tracking-normal leading-6 text-white whitespace-nowrap">
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="grow justify-center px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5">
              Generate Code
            </button>
            <img
              onClick={() => document.getElementById('my_modal_2').showModal()}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/564b3cd720391cdc471b3ec930d6fd095fa59905d370c9a7de80b0224fc903a4?"
              className="shrink-0 my-auto w-6 aspect-square cursor-pointer"
            />
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
                <div className="flex gap-5 justify-between px-7 py- mt-20 max-w-full text-lg tracking-normal leading-6 bg-white rounded-xl border w-[399px] max-md:px-5 max-md:mt-10">
                  <div className="flex-1 py-2 text-green-600">
                    10 Lectures held
                  </div>
                  <div className="flex-1 py-2 text-neutral-600">
                    15 lectures in total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-9 py-4 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-start">
            <div className="flex-auto text-xl font-bold text-black">
              Students List
            </div>
            <div className="flex gap-5 justify-between my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/95ce47f314d43e2634b77c9bbf804eaf63ed0c168f21a164aea89ad56cf131a4?"
                className="shrink-0 w-4 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39889153ec7c328a419925d2c0a54ff473b022214a6ad9b38e93b2114acaf50f?"
                className="shrink-0 w-4 aspect-square"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table text-black">
              {/* head */}
              <thead>
                <tr className="text-black">
                  <th>
                    <label>
                      {/* <input type="checkbox" className="checkbox" /> */}
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Attendance</th>
                  <th>Assesment Score</th>
                  <th>Level</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((student, i) => (
                  <tr key={i} className="hover:zinc-400 hover:border-zinc-400">
                    <th>
                      <label >
                        <input
                          checked={selectedStudent?.reg_num === student.reg_num}
                          onChange={(e) => handleCheckboxChange(e, student)} type="checkbox" name={i} className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src="https://source.unsplash.com/1600x900/?portrait" alt="Student profile" className="object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{student[0]}</div>
                          {/* <div className="text-sm opacity-50">United States</div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      {student[1]}
                    </td>
                    <td>{Number(student[4])}</td>
                    <td>{Number(student[3])}</td>
                    <td>{student[2]}</td>
                    <td>B</td>
                    <th>
                      <button onClick={() => { document.getElementById('stud_attendance_modal').showModal(); setSelectedStudent(student) }} className="btn btn-ghost btn-xs">details</button>
                    </th>
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

export default CourseDetails