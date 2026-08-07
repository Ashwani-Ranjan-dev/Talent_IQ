import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import { loginUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Fetching User detail
  const { fetchCurrentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);
      toast.success(response.data.message);

      await fetchCurrentUser();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px]">
        <h1 className="text-3xl font-bold text-center mb-2">TalentIQ</h1>
        <p className="text-center text-gray-500 mb-8">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Button text="Login" loading={loading} />
        </form>
      </div>
    </div>
  );
}

export default Login;
