import { useState } from "react";
import toast from "react-hot-toast";

import InputField from "../components/InputField";
import Button from "../components/Button";
import { RegisterUser } from "../services/userService";

function Register() {
  // ----------------------------
  // State
  // ----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Handle Input Change
  // ----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ----------------------------
  // Handle Form Submit
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await RegisterUser(formData);

      toast.success(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "candidate",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          TalentIQ
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create Your Account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          {/* Role */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="candidate">Candidate</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          {/* Register Button */}
          <Button
            text="Register"
            loading={loading}
          />

        </form>

      </div>
    </div>
  );
}

export default Register;