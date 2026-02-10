import "../styles/Login.css"
import logo from "../assets/muj-logo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Here you can add API call for signup
    navigate("/login");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="logo"
                src={logo}
                className="mx-auto h-20 w-max"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign up for an account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full md:max-w-4xl">
              <form action="#" method="POST" className="" onSubmit={handleSignup}>
                {/* First row: Name and Registration No */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <label htmlFor="name" className="block text-sm/6 font-medium text-black">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="registrationNo" className="block text-sm/6 font-medium text-black">
                      Registration No
                    </label>
                    <div className="mt-2">
                      <input
                        id="registrationNo"
                        name="registrationNo"
                        type="text"
                        required
                        value={formData.registrationNo}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                {/* Second row: Email and Password */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                {/* Third row: Confirm Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-black">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
                <div className="text-sm mt-4">
                  <a href="#" onClick={() => navigate("/")} className="font-semibold text-black hover:text-amber-600">
                    Already have an account? Sign in here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}