import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {ToastContainer, toast} from "react-toastify";
import "./StudentDetails.css";

const StudentDetails = ({activeTab, setActiveTab}) => {
  const [student, setStudent] = useState({});
  const {id} = useParams();

  setActiveTab("none");

  useEffect(() => {
    const getStudent = async () => {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStudent(docSnap.data());
      } else {
        toast.error("no such student");
      }
    };
    return () => {
      getStudent();
    };
  }, [id]);
  return (
    <div class="studentDetails">
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
