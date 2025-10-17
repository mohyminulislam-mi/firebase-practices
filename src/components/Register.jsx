import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase/firebase.init";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
const Register = () => {
  const [error, setError] = useState("");
  const [singIn, setSingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Your email is :- ", email, password);

    // set scusess or Error
    setError("");
    setSingIn(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Yesh login", result.user);
        setSingIn(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="ml-[-20px] z-50"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                  </button>
                </div>
                <div>
                  <label className="label">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />
                    Accept condition
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              {error && <p className="text-red-500">{error}</p>}
              {singIn && (
                <p className="text-green-500">Account create Success</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
