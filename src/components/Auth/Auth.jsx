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

  const [showPassword, setShowPassword] = useState(false);

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
      localStorage.setItem("userId", response.data.data.user._id);
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
        localStorage.setItem("userId", response.data.data.user._id);
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
          <div className="flex min-h-screen lg:min-h-full flex-1 flex-col justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
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
                      placeholder="masukkan email anda disini"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                        placeholder="masukkan email anda disini"
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
                      placeholder="masukkan kode otp anda disini"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
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
                        placeholder="masukkan nama anda disini"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="masukkan password anda disini"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    {activeTab === "email"
                      ? "Kirim OTP"
                      : activeTab === "otp"
                      ? "Verifikasi OTP"
                      : "Daftar"}
                  </button>
                </div>
              </form>
              {message && <div>{message}</div>}

              <p className="mt-5 text-center text-sm text-gray-500">
                Sudah punya akun ?{" "}
                <button
                  onClick={() => handleActiveChange("login")}
                  href="#"
                  className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                >
                  Masuk
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="h-full">
        {isActive === "login" ? (
          <div className="flex lg:min-h-full flex-1 flex-col justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
                alt="MetaPedia"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Masuk ke akun kamu
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
                      placeholder="masukkan email anda disini"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
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
                        className="font-semibold text-emerald-600 hover:text-emerald-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="masukkan password anda disini"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      type="button"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-center" >
                  <button
                    type="submit"
                    className="flex w-48 sm:w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    Masuk
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm text-gray-500">
                Tidak punya akun ?{" "}
                <button
                  onClick={() => handleActiveChange("register")}
                  href="#"
                  className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                >
                  Daftar
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
