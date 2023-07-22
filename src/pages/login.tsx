import React from "react";
import { auth , provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const signInWithGoogle = async ()=>{
        const result = signInWithPopup( auth, provider);
        navigate("/");
    }
    const navigate= useNavigate();
  return (
    <div>
      <h1>Login page</h1>
      <p>Sign in with google</p>
      <button onClick={signInWithGoogle}>sign in</button>
    </div>
  );
};

export default Login;
