import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {ToastContainer, toast} from "react-toastify";
import "./StudentDetails.css";

const StudentDetails = ({activeTab, setActiveTab}) => {
  const [student, setStudent] = useState({});
  const {id} = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setActiveTab("none");
    }
    return () => {
      isMounted = false;
    };
  }, [setActiveTab]);

  useEffect(() => {
    let isMounted = true;

    const getStudent = async () => {
      try {
        if (isMounted) {
          const docRef = doc(db, "students", id);
          const docSnap = await getDoc(docRef);
          const student = docSnap.data();

          return student;
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStudent()
      .then((student) => {
        if (student) {
          console.log(student);
          setStudent(student);
        } else {
          toast.error("no such student", {
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [id]);
  return (
    <div className="studentDetails">
      <ToastContainer />
      <h4 className="studentDetails__title">student details</h4>
      <div className="info">
        Full name:
        {`${student.firstName} ${student.middleName} ${student.lastName}`}
      </div>
      <div className="info">
        Class :{`${student.cls}- ${student.division} `}
      </div>
      <div className="info">Roll number :{`${student.rollNumber} `}</div>
      <div className="info">address line 1 :{`${student.addressLine1} `}</div>
      <div className="info">address line 2 :{`${student.addressLine2} `}</div>
      <div className="info">landmark :{`${student.landmark} `}</div>
      <div className="info">city:{`${student.city} `}</div>
      <div className="info">pincode :{`${student.pincode} `}</div>
    </div>
  );
};

export default StudentDetails;
