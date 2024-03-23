import { useEffect, useState } from "react";
import { courses, depts, dummy_students, lecturers } from "../../../utils";
import TopNav from "../../components/TopNav";
import abi from "../../constant/abi.json"
import { useAccount, useWriteContract } from "wagmi";
import { contractAddress } from "../../constant/address";
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { defaultconfig } from "../../main";
import { isAddress } from "viem";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [addStudentLoading, setAddStudentLoading] = useState(false)
  const [addCourseLoading, setAddCourseLoading] = useState(false)
  const [addLecturerLoading, setAddLecturerLoading] = useState(false)
  const [assignStudentLoading, setAssignStudentLoading] = useState(false)
  const [addStudentModal, setAddStudentModal] = useState(false)
  const [addCourseModal, setAddCourseModal] = useState(false)
  const [addLecturerModal, setAddLecturerModal] = useState(false)
  const [assignStudentModal, setAssignStudentModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [selectedLecturer, setSelectedLecturer] = useState({})
  const [dept, setDept] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [lecturerAddr, setLecturerAddr] = useState("");
  const [stdntAddr, setStdntAddr] = useState("");
  const [stdLevel, setStdLevel] = useState("");
  const [stdName, setStdName] = useState("");
  const [transposedData, setTransposedData] = useState([]);
  const [allStudenst, setAllStudents] = useState([]);
  const { writeContract, writeContractAsync } = useWriteContract()

  const { address } = useAccount();

  // Transpose the data

  async function getData() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getAllCourses',
    })

    if (result) {
      const transposedData = result?.map((_, colIndex) => result?.map(row => row[colIndex]));
      setTransposedData(transposedData?.filter((data) => data?.[0] !== undefined));
    }
  }
  async function getStudents() {
    const result = await readContract(defaultconfig, {
      abi,
      address: contractAddress,
      functionName: 'getAllstudent',
    })
    if (result) {
      const transposedData = result?.map((_, colIndex) => result?.map(row => row[colIndex]));
      setAllStudents(transposedData?.filter((data) => data?.[0] !== undefined));
    }
  }

  useEffect(() => {
    getData()
    getStudents()
  }, []);

  const assignStudent = async () => {
    //check that passed address is valid
    if (!isAddress(stdntAddr)) {
      toast.error("Wrong Ethereum Address", 5000);
      return;
    }
    try {
      setAssignStudentLoading(true)
      setAssignStudentModal(true)
      const assignStudentResult = writeContractAsync({
        abi,
        address: contractAddress,
        functionName: 'registerStudentToCourse',
        args: [
          stdntAddr,
          courseCode,
          address,
        ],
      })

      const result = await waitForTransactionReceipt(defaultconfig, {
        hash: await assignStudentResult,
      })

      if (result.status === "success") {
        setAssignStudentLoading(false)
        setAssignStudentModal(false)
        getData();
        getStudents();
        toast.success("Student Assigned Successfully", 5000)
      }

    } catch (error) {
      console.log(error)
      setAssignStudentLoading(false)
    }
  }

  const addStudent = async () => {
    //check that passed address is valid
    if (!isAddress(stdntAddr)) {
      toast.error("Wrong Ethereum Address", 5000);
      return;
    }
    try {
      setAddStudentLoading(true)
      const addStudentResult = writeContractAsync({
        abi,
        address: contractAddress,
        functionName: 'registerStudentDetails',
        args: [
          stdntAddr,
          stdName,
          stdLevel,
          dept,
        ],
      })

      const result = await waitForTransactionReceipt(defaultconfig, {
        hash: await addStudentResult,
      })

      if (result.status === "success") {
        setAddStudentLoading(false)
        setAddStudentModal(false)
        getStudents();
        toast.success("Student Added Successfully", 5000)
      }

    } catch (error) {
      console.log(error)
      setAddStudentLoading(false)
    }
  }

  const addCourse = async () => {
    try {
      setAddCourseLoading(true)
      const addCourseResult = writeContractAsync({
        abi,
        address: contractAddress,
        functionName: 'createCourse',
        args: [
          courseCode, courseTitle, address, dept,
        ],
      })

      const result = await waitForTransactionReceipt(defaultconfig, {
        hash: await addCourseResult,
      })

      if (result.status === "success") {
        toast.success("Course Added Successfully", 5000)
        getData();
        setAddCourseModal(false);
        setAddCourseLoading(false)
      }

    } catch (error) {
      console.log(error)
      setAddCourseLoading(false)
    }

  }

  const addLecturer = async () => {
    //check that passed address is valid
    if (!isAddress(lecturerAddr)) {
      toast.error("Wrong Ethereum Address", 5000);
      return;
    }
    try {
      setAddLecturerLoading(true)
      const addLecturerResult = writeContractAsync({
        abi,
        address: contractAddress,
        functionName: 'assignLecturers',
        args: [
          courseCode,
          lecturerName,
          lecturerAddr,
        ],
      })

      const result = await waitForTransactionReceipt(defaultconfig, {
        hash: await addLecturerResult,
      })

      if (result.status === "success") {
        toast.success("Lecturer Added Successfully", 5000)
        getData();
        setAddLecturerModal();
        setAddLecturerLoading(false)
      }

    } catch (error) {
      console.log(error)
      setAddLecturerLoading(false)
    }

  }
  return (
    <div className="flex flex-col pb-20 bg-white">
      <TopNav type="admin" />
      <div className="px-20 mt-40 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-4 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 text-lg font-medium tracking-normal leading-6 text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div>Courses</div>
                <img
                  onClick={() => address ? setAddCourseModal(true) : toast.error("Connect Wallet")}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {transposedData.length > 0 && transposedData.map((course, i) => (
                <div key={i} className="flex justify-between gap-4 px-2 py-2.5 mt-6 text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-7">
                      {course[0]}
                    </div>
                    <div className="mt-2 text-xs tracking-normal">{course[1]}</div>
                    <div className="mt-2 text-xs tracking-normal">{course[5]}</div>
                    <div className="mt-2 text-xs tracking-normal">Total Student: {Number(course[4])}</div>
                  </div>
                  <img
                    onClick={() => { address ? (document.getElementById('edit_course').showModal(), console.log(course), setSelectedCourse(course)) : toast.error("Connect Wallet") }}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dda1ea6fba67f9ac91fcda9d53e5820d332f7dd696e76740d808ed468357838?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-4 text-lg tracking-normal leading-6 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 font-medium text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <div>Lecturers</div>
                <img
                  onClick={() => address ? setAddLecturerModal(true) : toast.error("Connect Wallet")}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {transposedData[0]?.length > 0 && transposedData[0][3]?.length && transposedData?.map((lecturer, i) => (
                <div key={i} className="flex gap-4 justify-between px-2 py-2.5 mt-6 text-xs tracking-normal text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-6">
                      {lecturer[3]}
                    </div>
                    <div className="mt-2">{lecturer[0]}</div>
                    <div className="mt-2">{lecturer[1]}</div>
                  </div>
                  <img
                    onClick={() => { address ? (document.getElementById('edit_lect').showModal(), console.log(lecturer), setSelectedLecturer(lecturer)) : toast.error("Connect Wallet") }}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7b6bc5c1b6546dd5109a402843d7d3d88ed082935193d76d742e22a20af0009?"
                    className="shrink-0 my-auto w-4 aspect-square cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-4 rounded-xl border border-gray-400 border-solid max-md:mt-5">
              <div className="flex gap-5 justify-between px-1 py-2.5 text-lg font-medium tracking-normal leading-6 text-black whitespace-nowrap border-b border-gray-400 border-solid">

                <div>Students</div>
                <img
                  onClick={() => address ? setAddStudentModal(true) : toast.error("Connect Wallet")}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />

              </div>
              <div className="flex gap-5 justify-between px-1 py-2.5 text-lg font-medium tracking-normal leading-6 text-black whitespace-nowrap border-b border-gray-400 border-solid">
                <h2 className="">

                  Assign Student To Course
                </h2>

                <img
                  onClick={() => address ? setAssignStudentModal(true) : toast.error("Connect Wallet")}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/210160469ba9ac542f7b235ae7648ca035563f790bdc2ba38cc3672bcae5a014?"
                  className="shrink-0 self-start w-6 aspect-square cursor-pointer"
                />
              </div>
              {allStudenst[0]?.length > 0 && allStudenst?.map((student, i) => (
                <div key={i} className="flex gap-4 justify-between px-2 py-2.5 mt-6 text-sky-600 bg-blue-100 rounded-lg">
                  <div className="flex flex-col justify-center">
                    <div className="text-lg tracking-normal leading-6">
                      {student[1]}
                    </div>
                    <div className="mt-2 text-xs tracking-normal">
                      {student[2]}
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

      {/* edit course modal */}
      <dialog id="edit_course" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Course Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <input type="text" placeholder="Enter Department" className="input input-bordered w-full bg-white" onChange={(e) => setDept(e.target.value)} />
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
      {addCourseModal &&
        <>
          <input type="checkbox" readOnly checked={true} id="assign_student" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Add Course Details1</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <div className="w-full mb-4">
                    <label className="text-sm pb-2 block">Department</label>
                    <input type="text" placeholder="Enter Department" className="input input-bordered w-full bg-white" onChange={(e) => setDept(e.target.value)} />
                  </div>
                  <label className="text-sm pb-2 block">Course Title</label>
                  <input type="text" placeholder="Enter Course Title" className="input input-bordered w-full bg-white" onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Course Code</label>
                  <input type="text" placeholder="Enter Course Code" className="input input-bordered w-full bg-white" onChange={(e) => setCourseCode(e.target.value)} />
                </div>

              </div>
              <div className="modal-action flex w-full">
                <form method="dialog">
                  <button onClick={() => setAddCourseModal(true)} disabled={addCourseLoading} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white disabled:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80">Cancel</button>
                </form>
                <button disabled={addCourseLoading} className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white disabled:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-80"
                  onClick={() =>
                    addCourse()
                  }
                >{addCourseLoading ? "Processing" : "Create Course"}</button>
              </div>
            </div>
          </div>
        </>
      }

      {/* edit lecturer modal */}
      <dialog id="edit_lect" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Lecturer Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <input type="text" placeholder="Enter Department" className="input input-bordered w-full bg-white" />
            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <input type="text" placeholder="Enter Course Title" className="input input-bordered w-full bg-white" />

            </div>

            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Lecturer Name</label>
              <input type="text" placeholder="Enter lecturer name" className="input input-bordered w-full bg-white" />
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
      {addLecturerModal &&
        <>
          <input type="checkbox" readOnly checked={true} id="add_lect" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Add Lecturer1</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Course Code</label>
                  <input type="text" placeholder="Enter course code" className="input input-bordered w-full bg-white" onChange={(e) => setCourseCode(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Lecturer Name</label>
                  <input type="text" placeholder="Enter lecturer Name" className="input input-bordered w-full bg-white" onChange={(e) => setLecturerName(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Lecturer Wallet Address(ID)</label>
                  <input type="text" placeholder="Enter lecturer address" className="input input-bordered w-full bg-white" onChange={(e) => setLecturerAddr(e.target.value)} />
                </div>
              </div>
              <div className="modal-action flex w-full">
                <form method="dialog">
                  <button onClick={() => setAddLecturerModal(false)} disabled={addLecturerLoading} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white disabled:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80">Cancel</button>
                </form>
                <button disabled={addLecturerLoading} className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white disabled:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-80"
                  onClick={() =>
                    addLecturer()
                  }
                >{addLecturerLoading ? "Processing" : "Add Lecturer"}</button>
              </div>
            </div>
          </div>
        </>
      }

      {/* edit student modal */}
      <dialog id="edit_student" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit Student Details</h3>
          <div className="w-full mt-5">
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Department</label>
              <input type="text" placeholder="Enter Department" className="input input-bordered w-full bg-white" />

            </div>
            <div className="w-full mb-4">
              <label className="text-sm pb-2 block">Course</label>
              <input type="text" placeholder="Enter Course" className="input input-bordered w-full bg-white" />

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
      {addStudentModal &&
        <>
          <input type="checkbox" readOnly checked={true} id="add_student" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Add Student</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student Name</label>
                  <input type="text" placeholder="Enter student name" className="input input-bordered w-full bg-white" onChange={(e) => setStdName(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student Level</label>
                  <input type="text" placeholder="Enter student level" className="input input-bordered w-full bg-white" onChange={(e) => setStdLevel(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student Wallet Address(ID)</label>
                  <input type="text" placeholder="Enter student address" className="input input-bordered w-full bg-white" onChange={(e) => setStdntAddr(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Department</label>
                  <input type="text" placeholder="Enter student department" className="input input-bordered w-full bg-white" onChange={(e) => setDept(e.target.value)} />
                </div>
              </div>
              <div className="modal-action flex w-full">
                <form method="dialog">
                  <button onClick={() => setAddStudentModal(false)} disabled={addStudentLoading} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white disabled:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80">Cancel</button>
                </form>
                <button disabled={addStudentLoading} className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white disabled:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-80"
                  onClick={() =>
                    addStudent()
                  }
                >{addStudentLoading ? "Processing" : "Add Student"}</button>
              </div>
            </div>
          </div>
        </>
      }

      {/* assign student modal */}
      {assignStudentModal &&
        <>
          <input type="checkbox" readOnly checked={true} id="assign_student" className="modal-toggle" />
          <div role="dialog" className="modal">
            <div className="modal-box bg-white text-black">
              <h3 className="font-bold text-lg">Assign Student to Course</h3>
              <div className="w-full mt-5">
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Student Address(ID)</label>
                  <input type="text" placeholder="Enter student address" className="input input-bordered w-full bg-white" onChange={(e) => setStdntAddr(e.target.value)} />
                </div>
                <div className="w-full mb-4">
                  <label className="text-sm pb-2 block">Course Code</label>
                  <input type="text" placeholder="Enter Course Code" className="input input-bordered w-full bg-white" onChange={(e) => setCourseCode(e.target.value)} />
                </div>
              </div>
              <div className="modal-action flex w-full">
                <form method="dialog">
                  <button
                    onClick={() => setAssignStudentModal(false)}
                    disabled={assignStudentLoading} className="btn px-6 py-3 bg-red-500 hover:bg-red-700 border-none rounded-lg max-md:px-5 text-white disabled:bg-red-800 disabled:cursor-not-allowed disabled:opacity-80">Cancel</button>
                </form>
                <button disabled={assignStudentLoading} className="btn px-6 py-3 bg-sky-600 border-none rounded-lg max-md:px-5 text-white disabled:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-80"
                  onClick={() => assignStudent()}
                >{assignStudentLoading ? "Processing" : "Assign Student"}</button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default AdminDashboard



