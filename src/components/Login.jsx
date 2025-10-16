import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const Login = () => {
  const [user, setUser] = useState(null);
  const handleGoogleSingin = () => {
    signInWithPopup(auth, googleProvider)
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
  const handleGithubSing = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-10">
      {user ? (
        <button className="btn" onClick={handleSingOut}>
          Sing Out
        </button>
      ) : (
        <>
          <button className="btn" onClick={handleGoogleSingin}>
            Sing In with Google
          </button>
          <button className="btn" onClick={handleGithubSing}>
            Github
          </button>
        </>
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
