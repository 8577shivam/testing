import React from "react";
import { sendOTP } from "../services/Api";

const ResendOTP = ({ phoneNumber, setRequestId }) => {
  const handleResendOTP = async () => {
    try {
      const response = await sendOTP(phoneNumber);
      setRequestId(response.requestId);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div>
      <h1>Resend OTP</h1>
      <p>Click the button to resend OTP to {phoneNumber}</p>
      <button onClick={handleResendOTP}>Resend OTP</button>
    </div>
  );
};

export default ResendOTP;
