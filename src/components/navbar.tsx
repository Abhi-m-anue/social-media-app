import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to={"/"}> Home </Link>
        {!user ? (
          <Link to={"/login"}> Login </Link>
        ) : (
          <Link to={"/createpost"}> New post </Link>
        )}
      </div>
      {user && (
        <>
          <h4>{user?.displayName}</h4>
          <img src={user?.photoURL || ""} height={"30px"} width={"30px"}></img>
          <h6 onClick={logout}>Log out</h6>
        </>
      )}
    </div>
  );
};

export default Navbar;
