import React from "react";
import {useEffect} from "react";
import "./Header.css";
import {Button, Avatar} from "@mui/material";
import {UserAuth} from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const {googleSignIn, logOut, user} = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignin = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user != null) {
      console.log(user);
      navigate("/");
    }
  }, [user]);
  return (
    <div className="header">
      <span onClick={() => navigate("/")} className="logo">
        ResoluteAi
      </span>
      <div className="header__right">
        {user ? (
          <Button className="profile" variant="contained">
            <Avatar
              alt="Remy Sharp"
              className="profile__image"
              src={user?.photoURL}
            />
            <h4 className="profile__email">{user?.displayName}</h4>
          </Button>
        ) : (
          <Button
            variant="contained"
            className="loginBtn"
            onClick={handleGoogleSignin}
          >
            log in
          </Button>
        )}
      </div>
    </div>
  );
}
