import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "./../firebase/firebase.init";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const [singIn, setSingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const checkbox = e.target.checkbox.checked;
    const password = e.target.password.value;
    console.log("Your email is :- ", name, email, password, checkbox, photo);

    // set scusess or Error
    setError("");
    setSingIn(false);

    if (!checkbox) {
      setError("please accept our conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Yesh login", result.user);
        setSingIn(true);
        e.target.reset();

        // Update user profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(result.user, profile)
          .then(() => {})
          .catch((error) => {
            console.log(error.message);
          });
        //   send verifacation email
        sendEmailVerification(result.user).then(() => {
          alert("Please verify your email");
        });
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
        <div className="card bg-base-100 w-[300px]  shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Registration</h1>

            <form onSubmit={handleFormSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Your Name"
                  name="name"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Photo</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your photo URL"
                  name="photo"
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
                      className="checkbox"
                      name="checkbox"
                    />
                    Accept condition
                  </label>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {error && <p className="text-red-500">{error}</p>}
              {singIn && (
                <p className="text-green-500">Account create Success</p>
              )}
            </form>
            <p>
              Already have an Account?{" "}
              <Link to="/formlogin" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
