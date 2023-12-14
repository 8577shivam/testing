import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("requestId");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState(
    urlParams.get("phoneNumber") || ""
  );

  const handleVerifyOTP = async () => {
    try {
      const enteredOtp = otp.join("");
      const testingnumber = `+${phoneNumber}`;
      const formattedPhoneNumber = testingnumber.replace(/\s/g, "");
      await fetch("https://dev.api.goongoonalo.com/v1/auth/verify_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `${formattedPhoneNumber}`,
          requestId: requestId,
          otp: enteredOtp,
        }),
      });

      console.log("OTP verified successfully");
      navigate("/song-list-page");
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };
  const sendOTP = async (phoneNumber, onSuccess, onError) => {
    try {
      const response = await fetch(
        "https://dev.api.goongoonalo.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: `${phoneNumber}`,
          }),
        }
      );

      const data = await response.json();
      const requestId = data.requestId;

      onSuccess(requestId);
    } catch (error) {
      onError(error);
    }
  };
  const handleResendOTP = () => {
    sendOTP(
      phoneNumber,
      (newRequestId) => {
        const updatedRequestId = requestId || newRequestId;
        navigate(
          `/verify-otp?requestId=${updatedRequestId}&phoneNumber=${phoneNumber}`
        );
        console.log("OTP resent successfully");
      },
      (error) => {
        console.error("Failed to resend OTP", error);
      }
    );
  };

  const handleChangeOtp = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };
  const handleRedirecttoLogin = () => {
    navigate("/");
  };
  return (
    <div className="auth-page">
      <h1 className="heading">OTP Verification</h1>
      <p className="desc">
        {" "}
        We have sent and OTP to {phoneNumber}. Please enter the code received to
        <br />
        verify.
      </p>
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            className="otp-input"
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChangeOtp(index, e.target.value)}
          />
        ))}
      </div>
      <button className="verify-btn" onClick={handleVerifyOTP}>
        Verify OTP
      </button>
      <div className="resend-container">
        <button className="resend-btn" onClick={handleResendOTP}>
          Resend OTP
        </button>
        <button className="another_number-btn" onClick={handleRedirecttoLogin}>
          Use another number
        </button>
      </div>
    </div>
  );
};
export default VerifyOTPPage;
