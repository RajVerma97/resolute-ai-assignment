import React from "react";
import {useState, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import {
  query,
  collection,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {db} from "../firebase";
import {UserAuth} from "../Context/AuthContext";

import "./ManageStudent.css";

const ManageStudent = ({activeTab, setActiveTab}) => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = UserAuth();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const getStudents = async () => {
      try {
        if (isMounted) {
          console.log("get students in the db");

          const studentsRef = collection(db, "students");
          const q = query(studentsRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);

          let students = [];

          querySnapshot.forEach((doc) => {
            let student = doc.data();

            students.push(student);
          });
          return students;
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStudents()
      .then((response) => {
        setStudents(response);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteStudent = async (id) => {
    console.log("delte studdent " + id);
    try {
      if (!user) {
        toast.error("you must login first!!", {
          position: "top-center",
          autoClose: 4000,
          pauseOnHover:false
          
        });
      } else {
        const docRef = doc(db, "students", id);
        const docSnap = await deleteDoc(docRef);

        const filteredArray = students.filter((student) => student.id !== id);

        setStudents((prevStudents) => filteredArray);
      }
    } catch (err) {
      toast.error("error " + err, {
          position: "top-center",
          autoClose: 4000,
          pauseOnHover:false
          
        });
    }
  };

  return (
    <div>
      <div className="keeper1">
        <ToastContainer />
        <h4 className="ntitle">Manage student </h4>

        <div className="timeAndDateContainer">
          <span id="date" style={{marginRight: "1em"}}>
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>{" "}
          <span id="time">
            {new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <table cellSpacing="0">
        <thead>
          <tr>
            <th>name</th>
            <th>class</th>
            <th>roll no.</th>
            <th>view/edit/delete</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map(function (student, index) {
              return (
                <tr key={index}>
                  <td>
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </td>
                  <td>{`${student.cls}-${student.division}`}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <Link to={`/student/${student.id}`}>
                      <IconButton>
                        <VisibilityOutlinedIcon className="icon" />
                      </IconButton>
                    </Link>
                    <Link to={`/student/edit/${student.id}`}>
                      <IconButton>
                        <EditOutlinedIcon className="icon" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={openDialog}>
                      <DeleteOutlinedIcon className="icon" />
                    </IconButton>
                    <Dialog
                      open={open}
                      onClose={closeDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={closeDialog}>No</Button>
                        <Button
                          onClick={() => {
                            deleteStudent(student.id);
                            closeDialog();
                          }}
                          autoFocus
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default ManageStudent;
