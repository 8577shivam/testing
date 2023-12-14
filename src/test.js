import React, { useState } from "react";
import Login from "./components/Login";
import VerifyOTP from "./components/VerifyOTP.js";
import ResendOTP from "./components/ResendOTP";

const App = () => {
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestId, setRequestId] = useState("");
  const [token, setToken] = useState("");

  return (
    <div>
      {step === "login" && (
        <Login
          setStep={setStep}
          setPhoneNumber={setPhoneNumber}
          setRequestId={setRequestId}
        />
      )}
      {step === "verify" && (
        <VerifyOTP
          phoneNumber={phoneNumber}
          requestId={requestId}
          setToken={setToken}
          setStep={setStep}
        />
      )}
      {step === "success" && (
        <div>
          <h1>Login Successful!</h1>
          <p>Token: {token}</p>
        </div>
      )}
      {step === "resend" && (
        <ResendOTP phoneNumber={phoneNumber} setRequestId={setRequestId} />
      )}
    </div>
  );
};

export default App;
