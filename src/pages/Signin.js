import {async} from "@firebase/util";
import {useEffect, useState} from "react";
import GoogleButton from "react-google-button";
import {UserAuth} from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";

const Signin = () => {
  const {googleSignIn, user} = UserAuth();

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
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <h1>sigin in </h1>
      <GoogleButton onClick={handleGoogleSignin} />
    </div>
  );
};
export default Signin;
