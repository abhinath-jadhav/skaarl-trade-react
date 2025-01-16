import React, { useState, useRef } from "react";

const OtpForm = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus last input
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted OTP: ${otp.join("")}`);
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">
                Mobile Phone Verification
              </h1>
              <p className="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your phone
                number.
              </p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                  Verify Account
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Didn't receive code?{" "}
              <a
                className="font-medium text-indigo-500 hover:text-indigo-600"
                href="#0"
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OtpForm;
