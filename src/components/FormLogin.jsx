import React, { useRef, useState } from "react";
import { Link } from "react-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./../firebase/firebase.init";

const FormLogin = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("clicked", email, password);

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (!userCredential.user.emailVerified) {
          alert("jao vai email verify koro!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log("clicked forget password", email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset link send your email");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-[300px] max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Login now!</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover" onClick={handleForgetPassword}>
                    Forgot password?
                  </a>
                </div>
                <button className="btn btn-neutral mt-4"> Login </button>
              </fieldset>
            </form>
            {error && <p className="text-red-600">{error}</p>}
            <p>
              Already have an Account?{"  "}
              <Link to="/register" className="text-blue-600 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
