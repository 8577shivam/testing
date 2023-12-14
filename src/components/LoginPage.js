import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
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
  const handleLogin = async () => {
    sendOTP(
      phoneNumber,
      (requestId) => {
        navigate(
          `/verify-otp?requestId=${requestId}&phoneNumber=${phoneNumber}`
        );
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  };

  return (
    <div className="auth-page login-page">
      <h1 className="heading">Sign In</h1>
      {/* <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      <p className="desc">
        Please enter your mobile number to login. We will send an OTP to verify
        <br />
        your number.
      </p>
      <PhoneInput
        className="phoneInput"
        international
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      {console.log(phoneNumber)}
      <button className="signIn-btn" onClick={handleLogin}>
        Send OTP
      </button>
    </div>
  );
};
export default LoginPage;
