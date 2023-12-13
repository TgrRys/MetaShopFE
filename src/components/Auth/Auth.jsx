import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Auth = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("login");

  const handleActiveChange = (key) => setIsActive(key);

  const [message] = useState(null);

  const [email, setEmail] = useState("");

  const [activeTab, setActiveTab] = useState("email");

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    setEmail(email.value);
    setActiveTab("otp");

    try {
      const response = axios.post("http://localhost:5000/user/otp/send", {
        email: email.value,
      });
      if (response.status === 201) {
        toast.success("OTP sent successfully, please check your email for OTP");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        toast.error("An error occurred while making the request");
      }
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const { otp, email } = event.target.elements;
    try {
      const response = await axios.post(
        "http://localhost:5000/user/otp/verify",
        { otp: otp.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        if (email) {
          setEmail(email.value);
        }
        localStorage.setItem("token", data.data.token);
        setActiveTab("register");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Wrong OTP");
      } else {
        toast.error("An error occurred while making the request");
      }
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        {
          name: name.value,
          email: email.value,
          password: password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        toast.success("Register successfully");
      }
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        toast.success("Login successfully");
        // Menyimpan token ke localStorage
        localStorage.setItem("token", response.data.data.user.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Wrong email or password");
      } else if (error.response && error.response.status === 500) {
        toast.error("An error occurred while making the request");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen gap-x-5 bg-white">
      {/* left side */}
      <div className="h-full">
        {isActive === "login" ? (
          <div className="relative h-full">
            <motion.div
              layoutId="custom-bg"
              className="absolute inset-0 rounded-r-3xl bg-contain lg:block hidden"
              style={{
                backgroundImage:
                  "url('https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?format=jpg&quality=90&v=1693935729&width=1024')",
              }}
              transition={{ type: "spring", duration: 0.6 }}
            />
          </div>
        ) : (
          <div className="flex min-h-full flex-1 flex-col justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={
                  activeTab === "email"
                    ? handleEmailSubmit
                    : activeTab === "otp"
                    ? handleOtpSubmit
                    : isActive === "register"
                    ? handleRegister
                    : handleLogin
                }
              >
                {activeTab === "email" && (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
                {activeTab === "otp" && (
                  <div>
                    <input
                      id="otp"
                      name="otp"
                      type="number"
                      minLength={6}
                      autoComplete="email"
                      placeholder="input your otp  here"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
                {activeTab === "register" && (
                  <>
                    <div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="input your name here"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="input your password here"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {activeTab === "email"
                      ? "Get OTP"
                      : activeTab === "otp"
                      ? "Verify OTP"
                      : "Sign Up"}
                  </button>
                </div>
              </form>
              {message && <div>{message}</div>}

              <p className="mt-5 text-center text-sm text-gray-500">
                Already have account?{" "}
                <button
                  onClick={() => handleActiveChange("login")}
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
          // <div className="flex min-h-full flex-1 flex-col justify-center items-center">
          //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          //     <img
          //       className="mx-auto h-10 w-auto"
          //       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          //       alt="Your Company"
          //     />
          //     <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          //       Sign Up
          //     </h2>
          //   </div>
          //   <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          //     <form
          //       className="space-y-6"
          //       onSubmit={
          //         isActive === "register" ? handleRegister : handleLogin
          //       }
          //     >
          //       <div>
          //         <label
          //           htmlFor="name"
          //           className="block text-sm font-medium leading-6 text-gray-900"
          //         >
          //           Name
          //         </label>
          //         <div>
          //           <input
          //             id="name"
          //             name="name"
          //             type="text"
          //             placeholder="input your name here"
          //             required
          //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          //           />
          //         </div>
          //       </div>
          //       <div>
          //         <label
          //           htmlFor="email"
          //           className="block text-sm font-medium leading-6 text-gray-900"
          //         >
          //           Email
          //         </label>
          //         <div>
          //           <input
          //             id="email"
          //             name="email"
          //             type="email"
          //             autoComplete="email"
          //             placeholder="input your email  here"
          //             required
          //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          //           />
          //         </div>
          //       </div>

          //       <div>
          //         <div className="flex items-center justify-between">
          //           <label
          //             htmlFor="password"
          //             className="block text-sm font-medium leading-6 text-gray-900"
          //           >
          //             Password
          //           </label>
          //         </div>
          //         <div>
          //           <input
          //             id="password"
          //             name="password"
          //             type="password"
          //             autoComplete="current-password"
          //             placeholder="input your password here"
          //             required
          //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          //           />
          //         </div>
          //       </div>

          //       <div>
          //         <button
          //           type="submit"
          //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          //         >
          //           Sign Up
          //         </button>
          //       </div>
          //     </form>
          //     {message && <div>{message}</div>}

          //     <p className="mt-5 text-center text-sm text-gray-500">
          //       Already have account?{" "}
          //       <button
          //         onClick={() => handleActiveChange("login")}
          //         href="#"
          //         className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          //       >
          //         Sign In
          //       </button>
          //     </p>
          //   </div>
          // </div>
        )}
      </div>

      {/* right side */}
      <div className="h-full">
        {isActive === "login" ? (
          <div className="flex min-h-full flex-1 flex-col justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign In To Your Account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={
                  isActive === "register" ? handleRegister : handleLogin
                }
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Please input your email here"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="input your password here"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm text-gray-500">
                Didn&apos;t have account?{" "}
                <button
                  onClick={() => handleActiveChange("register")}
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            <motion.div
              layoutId="custom-bg"
              className="absolute inset-0 rounded-l-3xl bg-contain lg:block hidden"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/dark-haired-woman-with-red-lipstick-smiles-leans-stand-with-clothes-holds-package-pink-background_197531-17609.jpg   ')",
              }}
              transition={{ type: "spring", duration: 0.6 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
