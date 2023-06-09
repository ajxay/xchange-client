import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LocationInput from "./LocationInput";

import { signin, signup, signinAsAdmin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
};

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [viewPasssword, setViewPassword] = useState(false);
  const [isSigninAsAdmin, setSigninAsAdmin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleCheckboxChange = (event) => {
    setSigninAsAdmin(event.target.checked);
  };

  //handle Visible Password
  const toggleVisiblePassword = () => {
    setViewPassword(!viewPasssword);
  };
  //change signup and sign in
  const handleChange = () => {
    setIsSignup(!isSignup);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      if (isSigninAsAdmin) {
        dispatch(signinAsAdmin(formData, navigate));
      } else {
        dispatch(signin(formData, navigate));
      }
    }
  };
  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(token);

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log("Google Sign In was Unsuccessful", error);
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-slate-800 rounded-md shadow-xl lg:max-w-xl">
        {!isSignup && (
          <>
            <h1 className="text-3xl font-semibold text-center text-slate-400 uppercase">
              Sign in
            </h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700 border rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2 relative">
                <label className="block text-sm font-semibold text-white">
                  Password
                </label>
                <input
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                  type={viewPasssword ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700 rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="text-lg absolute top-10 right-5">
                  {viewPasssword ? (
                    <AiFillEye onClick={toggleVisiblePassword} />
                  ) : (
                    <AiFillEyeInvisible onClick={toggleVisiblePassword} />
                  )}
                </div>
              </div>
              <a href="#" className="text-xs text-slate-400 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-slate-400 transition-colors duration-200 transform bg-slate-900 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-slate-700 text-white">Or</div>
            </div>
            <div className="flex mt-4 gap-x-2">
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg> */}
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                  cookiePolicy="single_host_origin"
                  buttonText="Login"
                />
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                </svg>
              </button>
            </div>

            <div className="flex justify-between px-1">
              <p className="mt-4 text-xs font-light text-center text-slate-400">
                {" "}
                Don't have an account?{" "}
                <button
                  onClick={handleChange}
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
              <p className="mt-4 text-xs font-light text-center text-slate-400">
                <input
                  className=" mr-1"
                  type="checkbox"
                  checked={isSigninAsAdmin}
                  onChange={handleCheckboxChange}
                />
                Sign in as{" "}
                <button className="font-medium text-purple-600 ">Admin?</button>
              </p>
            </div>
          </>
        )}
        {isSignup && (
          <>
            <h1 className="text-3xl font-semibold text-center text-slate-400 uppercase">
              Sign up
            </h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex">
                <div className="mb-2 mr-2 w-2/4">
                  <label className="block text-sm font-semibold text-white">
                    First Name
                  </label>
                  <input
                    onChange={handleInputChange}
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700  rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2 w-2/4">
                  <label className="block text-sm font-semibold text-white">
                    Last Name
                  </label>
                  <input
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700 rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mb-2 mr-2 w-2/4">
                  <label className="block text-sm font-semibold text-white">
                    Email
                  </label>
                  <input
                    onChange={handleInputChange}
                    placeholder="Email"
                    name="email"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700  rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2 w-2/4">
                  <label className="block text-sm font-semibold text-white">
                    Location
                  </label>
                  <LocationInput />
                </div>
              </div>
              <div className="mb-2 ">
                <label className="block text-sm font-semibold text-white">
                  Password
                </label>
                <input
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                  type={viewPasssword ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700 rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="text-lg absolute top-10 right-5">
                  {viewPasssword ? (
                    <AiFillEye onClick={toggleVisiblePassword} />
                  ) : (
                    <AiFillEyeInvisible onClick={toggleVisiblePassword} />
                  )}
                </div>
              </div>
              <div className="mb-2 relative">
                <label className="block text-sm font-semibold text-white">
                  Confirm Password
                </label>
                <input
                  onChange={handleInputChange}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type={viewPasssword ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-slate-400 bg-slate-700 rounded-md focus:border-slate-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="text-lg absolute top-10 right-5">
                  {viewPasssword ? (
                    <AiFillEye onClick={toggleVisiblePassword} />
                  ) : (
                    <AiFillEyeInvisible onClick={toggleVisiblePassword} />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-slate-400 transition-colors duration-200 transform bg-slate-900 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600">
                  Signup
                </button>
              </div>
            </form>
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-slate-700 text-white">Or</div>
            </div>
            <div className="flex mt-4 gap-x-2">
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                </svg>
              </button>
            </div>

            <p className="mt-8 text-xs font-light text-center text-slate-400">
              {" "}
              Already have an account?{" "}
              <button
                onClick={handleChange}
                className="font-medium text-purple-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
