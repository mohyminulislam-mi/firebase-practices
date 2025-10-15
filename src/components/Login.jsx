import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();
const Login = () => {
  const [user, setUser] = useState(null);
  const handleGoogleSingin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUser(result?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);

  return (
    <div className="mt-10">
      {!user ? (
        <button className="btn" onClick={handleGoogleSingin}>
          Sing In with Google
        </button>
      ) : (
        <button className="btn" onClick={handleSingOut}>
          Sing Out
        </button>
      )}

      {user && (
        <div>
          <h1>Name: {user?.displayName}</h1>
          <h1>Email: {user?.email}</h1>
          <img src={user?.photoURL} alt="photo" />
        </div>
      )}
    </div>
  );
};

export default Login;
