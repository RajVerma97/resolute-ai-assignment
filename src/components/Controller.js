import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import ListAlt from "@mui/icons-material/ListAlt";
import Logout from "@mui/icons-material/Logout";
import "./Controller.css";
import {UserAuth} from "../Context/AuthContext";

export default function Controller({activeTab, setActiveTab}) {
  const navigate = useNavigate();

  const {logOut, user} = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="controller">
      <Button
        className="btn"
        size="large"
        onClick={() => {
          setActiveTab("add");
          navigate("/add");
        }}
        variant={activeTab === "add" ? "contained" : "outlined"}
        startIcon={<PeopleOutline />}
      >
        add student
      </Button>
      <Button
        className="btn"
        size="large"
        onClick={() => {
          setActiveTab("manage");
          navigate("/");
        }}
        variant={activeTab === "manage" ? "contained" : "outlined"}
        startIcon={<ListAlt />}
      >
        manage student
      </Button>
      {user ? (
        <Button
          className="btn"
          size="large"
          onClick={() => {
            setActiveTab("logout");
            handleSignOut();
          }}
          variant={activeTab === "logout" ? "contained" : "outlined"}
          startIcon={<Logout />}
        >
          logout
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
