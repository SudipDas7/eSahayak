import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loginType, setLoginType] = useState("password");
  const [otpStep, setOtpStep] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // ✅ NEW: error for invalid login

  const validateForm = () => {
    const newErrors = {};
    if (!role) newErrors.role = "Please select a role.";
    if (!username.trim()) newErrors.username = "Username or email is required.";
    if (loginType === "password" && !password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (loginType === "otp" && otpStep && !otp.trim()) {
      newErrors.otp = "OTP is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // ✅ Clear any previous error
          setLoginError("");

          // ✅ Save login info
          localStorage.setItem("user", JSON.stringify(data.user));

          // ✅ Redirect to Complaint page directly
          navigate("/civic-complaint");
        } else {
          // ❌ Show inline error
          setLoginError(data.message || "User not found. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setLoginError("⚠️ Server error, please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0f2c46] via-[#3f4e60] to-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center mb-8 px-8 py-6 bg-gradient-to-r from-blue-600 to-sky-400 rounded-xl shadow-lg w-[400px] mx-auto min-h-[130px]">
        <div className="w-20 h-20 rounded-full bg-white border-2 border-white shadow flex items-center justify-center mr-5 overflow-hidden">
          <img src={Logo} alt="eSahayak Portal logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">eSahayak Portal</h1>
          <small className="text-sky-100 italic text-base">We Are Always Here For You</small>
          <a href="/" className="text-sm underline text-white mt-2">Home</a>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row w-[700px] mx-auto p-10 gap-8">
        {/* New User */}
        <div className="flex-1 border-b md:border-b-0 md:border-r pr-0 md:pr-6 pb-6 md:pb-0">
          <h3 className="text-lg font-bold mb-2">NEW USER</h3>
          <div className="h-1 w-10 bg-orange-400 mb-4"></div>
          <p className="mb-4">Don’t have an Account Yet?</p>
          <button
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
          >
            Register
          </button>
        </div>

        {/* Existing User */}
        <div className="flex-1 pl-0 md:pl-6">
          <h3 className="text-lg font-bold mb-2">EXISTING USER</h3>
          <div className="h-1 w-10 bg-orange-400 mb-4"></div>

          {/* Role Select */}
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setOtpStep(false);
              setUsername("");
              setPassword("");
              setOtp("");
              setErrors({});
              setLoginError(""); // ✅ clear error on role change
            }}
            className="w-full border-2 border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="public">Public</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mb-2">{errors.role}</p>}

          {/* Show login fields ONLY when role selected */}
          {role && (
            <>
              {/* Username */}
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginError(""); // ✅ clear error while typing
                }}
                className="w-full border-2 border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-500 text-xs mb-2">{errors.username}</p>}

              {/* Radio Group */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="loginType"
                    value="password"
                    checked={loginType === "password"}
                    onChange={() => {
                      setLoginType("password");
                      setOtpStep(false);
                      setErrors({});
                      setLoginError("");
                    }}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>Password</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="loginType"
                    value="otp"
                    checked={loginType === "otp"}
                    onChange={() => {
                      setLoginType("otp");
                      setOtpStep(false);
                      setErrors({});
                      setLoginError("");
                    }}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>Send OTP in Email</span>
                </label>
              </div>

              {/* Conditional Input */}
              <div className="mb-1">
                {loginType === "password" && (
                  <>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError(""); // ✅ clear error while typing
                      }}
                      className="w-full border-2 border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </>
                )}
                {loginType === "otp" && otpStep && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full border-2 border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                  </>
                )}
              </div>

              {/* Inline login error message */}
              {loginError && (
                <p className="text-red-600 text-sm mb-3">{loginError}</p>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
              >
                {loginType === "password"
                  ? "Login"
                  : otpStep
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500">© eSahayak Portal 2025.</p>
    </div>
  );
}
