import React from "react";
import {useState, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import "./AddEditStudent.css";
import "react-toastify/dist/ReactToastify.css";
import {db} from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import {useNavigate, useParams} from "react-router-dom";
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import {UserAuth} from "../Context/AuthContext";

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  cls: 1,
  division: "A",
  rollNumber: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  pincode: "",
};

const AddEditStudent = ({activeTab, setActiveTab}) => {
  const [state, setState] = useState(initialState);
  const [errorStore, setErrorStore] = useState(false);
  const {user} = UserAuth();
  const {id} = useParams();

  const navigate = useNavigate();

  const {
    firstName,
    middleName,
    lastName,
    cls,
    division,
    rollNumber,
    addressLine1,
    addressLine2,
    landmark,
    city,
    pincode,
  } = state;

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setState({...state, [name]: value});
  };

  const editStudent = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("you must login first!!", {
        position: "center",
      });
    } else {
      const docRef = doc(db, "students", id);
      const response = await updateDoc(docRef, {
        firstName,
        middleName,
        lastName,
        cls,
        division,
        rollNumber,
        addressLine1,
        addressLine2,
        landmark,
        city,
        pincode,
      });
      toast.success("student updated successfully");
      setState(initialState);
      setTimeout(() => navigate("/"), 2000);
      setActiveTab("manage");
    }
  };

  useEffect(() => {
    setErrorStore(false);
    if (isNaN(rollNumber)) {
      setErrorStore(true);
    } else if (isNaN(pincode)) {
      setErrorStore(true);
    }
  });

  const addStudent = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("you must login first!!", {
        position: "center",
      });
    } else {
      try {
        const docRef = await addDoc(collection(db, "students"), {
          createdAt: Timestamp.now(),
          firstName,
          middleName,
          lastName,
          cls,
          division,
          rollNumber,
          addressLine1,
          addressLine2,
          landmark,
          city,
          pincode,
        });
        const result = await updateDoc(docRef, {id: docRef.id});
        toast.success("student added successfully");
        setState(initialState);
        setTimeout(() => navigate("/"), 2000);
        setActiveTab("manage");
        setErrorStore(false);
      } catch (e) {
        toast.error(" error adding student: " + e);
      }
    }
  };

  useEffect(() => {
    const getStudent = async () => {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      const student = docSnap.data();

      if (docSnap.exists()) {
        setState({
          firstName: student.firstName,
          middleName: student.middleName,
          lastName: student.lastName,
          cls: student.cls,
          division: student.division,
          rollNumber: student.rollNumber,
          addressLine1: student.addressLine1,
          addressLine2: student.addressLine2,
          landmark: student.landmark,
          city: student.city,
          pincode: student.pincode,
        });
      } else {
        toast.error("no such student");
      }
    };
    if (id) {
      getStudent();
    } else {
      setState(initialState);
    }
  }, [id]);

  return (
    <div>
      <ToastContainer />
      <div class="keeper">
        {id ? (
          <h4 className="title">edit student </h4>
        ) : (
          <h4 className="title">add student </h4>
        )}

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

      <form onSubmit={id ? editStudent : addStudent}>
        <TextField
          variant="outlined"
          label="first name"
          fullWidth
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
          className="input"
          required
        />
        <TextField
          variant="outlined"
          label="middle name"
          fullWidth
          id="middleName"
          name="middleName"
          value={middleName}
          onChange={handleInputChange}
          className="input"
        />
        <TextField
          variant="outlined"
          label="last name"
          fullWidth
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
          className="input"
        />

        <FormControl fullWidth className="select" required>
          <InputLabel id="class">class</InputLabel>
          <Select
            labelId="class"
            id="class"
            value={cls}
            label="class"
            name="cls"
            onChange={handleInputChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="select" required>
          <InputLabel id="division">division</InputLabel>
          <Select
            labelId="division"
            id="division"
            value={division}
            label="division"
            name="division"
            onChange={handleInputChange}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
            <MenuItem value={"E"}>E</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          label="roll number of 2 digits"
          fullWidth
          name="rollNumber"
          value={rollNumber}
          onChange={handleInputChange}
          inputProps={{maxLength: 2}}
          className="input"
          required
          error={isNaN(rollNumber)}
        />

        <TextField
          variant="outlined"
          label="address line 1"
          fullWidth
          id="addressLine1"
          name="addressLine1"
          value={addressLine1}
          onChange={handleInputChange}
          className="input"
          required
        />
        <TextField
          variant="outlined"
          label="address line 2"
          fullWidth
          id="addressLine2"
          name="addressLine2"
          value={addressLine2}
          onChange={handleInputChange}
          className="input"
          required
        />

        <TextField
          variant="outlined"
          label="landmark"
          fullWidth
          id="landmark"
          name="landmark"
          value={landmark}
          onChange={handleInputChange}
          className="input"
          required
        />
        <TextField
          variant="outlined"
          label="city"
          fullWidth
          id="city"
          name="city"
          value={city}
          onChange={handleInputChange}
          className="input"
          required
        />
        <TextField
          variant="outlined"
          label="pincode"
          fullWidth
          id="pincode"
          name="pincode"
          value={pincode}
          onChange={handleInputChange}
          className="input"
          required
          error={isNaN(pincode)}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={errorStore}
          className='inputBtn'
        >
          {id ? "edit" : "add "}
        </Button>
        {/* <Input type="submit" value={id ? "edit" : "add "} /> */}
      </form>
    </div>
  );
};

export default AddEditStudent;
