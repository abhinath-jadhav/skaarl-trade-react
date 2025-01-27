import React, { useState, useRef } from "react";
import { fivePaisaOtpLogin } from "../../service/Authservice";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Components";
import Swal from "sweetalert2";

const FivePaisaLogin = () => {
  const inputRefs = useRef([]); // References for input fields
  const [otp, setOtp] = useState(new Array(6).fill("")); // Stores OTP values
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the active input field

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]{1}$/.test(value)) {
      setOtp((prev) => {
        const updatedOtp = [...prev];
        updatedOtp[index] = value;
        return updatedOtp;
      });

      // Move focus to the next input field
      if (index < otp.length - 1) {
        setCurrentIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();

      setOtp((prev) => {
        const updatedOtp = [...prev];
        updatedOtp[index] = ""; // Clear the current field
        return updatedOtp;
      });

      // Move focus to the previous input field if backspacing and it's not the first input
      if (index > 0) {
        setCurrentIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(otp.join(""));

    const response = await fivePaisaOtpLogin(otp.join(""));

    if (response.status === 200) {
      console.log(response);
      dispatch(updateAuth(true));
      window.location.href = "http://localhost:5173";
    } else {
      setIsLoading(false);
      setOtp(new Array(6).fill(""));
      Swal.fire({
        icon: "warning",
        title: "Wrong TOTP",
        text: "Please enter correct TOTP",
        titleText: "Wrong TOTP",
        confirmButtonText: "OK",
      });
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col items-center justify-center h-2/3 w-4/5 md:w-full">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your phone
          number.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              className={`w-10 h-10 p-2 md:p-4 md:w-14 md:h-14 md:text-2xl md:font-extrabold text-center text-slate-900 bg-white border "border-indigo-400 focus:ring-indigo-100 border-transparent hover:border-slate-300 appearance-none rounded outline-none`}
              maxLength="1"
              value={otp[index]}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleInput(e, index)}
              //disabled={currentIndex !== index}
              // Disable all inputs except the current one
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-slate-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default FivePaisaLogin;
