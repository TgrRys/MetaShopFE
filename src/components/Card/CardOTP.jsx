import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InputField = ({ value, onChange }) => (
  <div className="w-12 h-12 mx-2">
    <input
      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
      type="text"
      maxLength="1"
      value={value || ""} // Jika value adalah null atau undefined, gunakan string kosong
      onChange={onChange}
    />
  </div>
);

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Button = ({ children }) => (
  <button
    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

const CardOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Inisialisasi otp sebagai array dari string kosong
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/otp/send", {
        email,
      });
      if (response.status === 201) {
        toast.success("OTP sent successfully, please check your email");
      }
      setIsEmailSubmitted(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/otp/verify",
        { otp: otp.join("") },
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        // Save the token in the local storage
        localStorage.setItem("token", response.data.data.token);
        navigate("/auth");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while verifying the OTP");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-2xl mb-10">
              <p>Email Verification</p>
            </div>
            {!isEmailSubmitted ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col space-y-1">
                    <div className="flex flex-row items-center justify-between">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Please input your email here"
                        required
                        className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>

                  <Button>Send Code</Button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                  <div className="flex justify-center gap-2 mb-6">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        type="text"
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                        value={value || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button>Verify</Button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
                      href="#"
                    >
                      Resend OTP
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOTP;
